import React from 'react';
import { useParams } from 'react-router-dom';
import { LabReplay } from '@/components/labs/LabReplay';
import { ReplayShare } from '@/components/labs/ReplayShare';

export default function LabReplayView() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [showShare, setShowShare] = useState(false);

  if (!sessionId) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No session ID provided</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <LabReplay
        sessionId={sessionId}
        onShare={() => setShowShare(true)}
      />

      {showShare && (
        <ReplayShare
          sessionId={sessionId}
          onClose={() => setShowShare(false)}
        />
      )}
    </div>
  );
}