import { io, Socket } from 'socket.io-client';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

export interface CollaborationState {
  users: CollaborationUser[];
  activeUser?: string;
  sharedTerminal: {
    command: string;
    output: string[];
  };
}

export interface CollaborationUser {
  id: string;
  name: string;
  avatar?: string;
  isHost: boolean;
  currentTask?: number;
  isActive: boolean;
}

export class CollaborationManager {
  private socket: Socket;
  private doc: Y.Doc;
  private provider: WebsocketProvider;
  private sessionId: string;
  private userId: string;

  constructor(sessionId: string, userId: string) {
    this.sessionId = sessionId;
    this.userId = userId;
    
    // Initialize Socket.IO connection
    this.socket = io(process.env.VITE_WS_URL || 'http://localhost:3000', {
      query: { sessionId, userId }
    });

    // Initialize Yjs document
    this.doc = new Y.Doc();
    this.provider = new WebsocketProvider(
      process.env.VITE_YJS_URL || 'ws://localhost:1234',
      sessionId,
      this.doc
    );

    this.setupEventListeners();
  }

  private setupEventListeners() {
    // Socket.IO events
    this.socket.on('user_joined', this.handleUserJoined.bind(this));
    this.socket.on('user_left', this.handleUserLeft.bind(this));
    this.socket.on('command_executed', this.handleCommandExecuted.bind(this));
    this.socket.on('task_completed', this.handleTaskCompleted.bind(this));

    // Yjs events
    this.doc.on('update', this.handleDocumentUpdate.bind(this));
  }

  async executeCommand(command: string): Promise<void> {
    this.socket.emit('execute_command', {
      command,
      userId: this.userId,
      timestamp: new Date().toISOString()
    });
  }

  async shareTerminalState(state: { command: string; output: string[] }): Promise<void> {
    const sharedState = this.doc.getMap('terminalState');
    sharedState.set('command', state.command);
    sharedState.set('output', state.output);
  }

  async inviteUser(email: string): Promise<void> {
    this.socket.emit('invite_user', { email });
  }

  async leaveSession(): Promise<void> {
    this.socket.emit('leave_session');
    this.provider.disconnect();
    this.socket.disconnect();
  }

  private handleUserJoined(user: CollaborationUser) {
    const users = this.doc.getArray('users');
    users.push([user]);
  }

  private handleUserLeft(userId: string) {
    const users = this.doc.getArray('users');
    const index = users.toArray().findIndex(u => u.id === userId);
    if (index !== -1) {
      users.delete(index, 1);
    }
  }

  private handleCommandExecuted(data: {
    userId: string;
    command: string;
    output: string;
  }) {
    const terminalState = this.doc.getMap('terminalState');
    const outputs = terminalState.get('output') as string[] || [];
    terminalState.set('output', [...outputs, `${data.userId}: ${data.command}`, data.output]);
  }

  private handleTaskCompleted(data: {
    userId: string;
    taskId: number;
  }) {
    const users = this.doc.getArray('users');
    const userIndex = users.toArray().findIndex(u => u.id === data.userId);
    if (userIndex !== -1) {
      users.delete(userIndex, 1);
      users.insert(userIndex, [{
        ...users.get(userIndex),
        currentTask: data.taskId + 1
      }]);
    }
  }

  private handleDocumentUpdate() {
    // Handle Yjs document updates
    const terminalState = this.doc.getMap('terminalState');
    const users = this.doc.getArray('users');
    
    // Emit state change event if needed
    this.socket.emit('state_updated', {
      terminalState: terminalState.toJSON(),
      users: users.toArray()
    });
  }

  destroy() {
    this.socket.disconnect();
    this.provider.disconnect();
    this.doc.destroy();
  }
}