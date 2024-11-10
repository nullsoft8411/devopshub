import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { AppError } from '../lib/errors.js';

export async function getLabs(req: Request, res: Response) {
  const { difficulty, category, search } = req.query;

  const where = {
    ...(difficulty ? { difficulty: difficulty as string } : {}),
    ...(category ? { category: category as string } : {}),
    ...(search ? {
      OR: [
        { title: { contains: search as string } },
        { description: { contains: search as string } }
      ]
    } : {})
  };

  const labs = await prisma.lab.findMany({
    where,
    include: {
      _count: {
        select: { progress: true }
      }
    }
  });

  res.json(labs);
}

export async function getLabById(req: Request, res: Response) {
  const { id } = req.params;
  const userId = req.user?.userId;

  const lab = await prisma.lab.findUnique({
    where: { id },
    include: {
      progress: {
        where: { userId }
      }
    }
  });

  if (!lab) {
    throw new AppError('Lab not found', 404);
  }

  res.json({
    ...lab,
    userProgress: lab.progress[0] || null
  });
}

export async function startLab(req: Request, res: Response) {
  const { id } = req.params;
  const userId = req.user?.userId;

  const progress = await prisma.labProgress.create({
    data: {
      completedTasks: [],
      user: { connect: { id: userId } },
      lab: { connect: { id } }
    }
  });

  res.json(progress);
}

export async function submitLabTask(req: Request, res: Response) {
  const { id, taskId } = req.params;
  const userId = req.user?.userId;
  const { command, output } = req.body;

  const progress = await prisma.labProgress.findFirst({
    where: {
      labId: id,
      userId
    }
  });

  if (!progress) {
    throw new AppError('Lab progress not found', 404);
  }

  const completedTasks = progress.completedTasks as string[];
  if (!completedTasks.includes(taskId)) {
    completedTasks.push(taskId);
  }

  await prisma.labProgress.update({
    where: { id: progress.id },
    data: {
      completedTasks,
      ...(completedTasks.length === (await prisma.lab.findUnique({ where: { id } }))?.tasks.length
        ? { completedAt: new Date() }
        : {})
    }
  });

  res.json({ message: 'Task completed' });
}

export async function getLabProgress(req: Request, res: Response) {
  const { id } = req.params;
  const userId = req.user?.userId;

  const progress = await prisma.labProgress.findFirst({
    where: {
      labId: id,
      userId
    }
  });

  res.json(progress || { completedTasks: [] });
}