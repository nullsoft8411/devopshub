import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { AppError } from '../lib/errors.js';

export async function getCourses(req: Request, res: Response) {
  const { category, level, search } = req.query;

  const where = {
    ...(category ? { category: category as string } : {}),
    ...(level ? { level: level as string } : {}),
    ...(search ? {
      OR: [
        { title: { contains: search as string } },
        { description: { contains: search as string } }
      ]
    } : {})
  };

  const courses = await prisma.course.findMany({
    where,
    include: {
      _count: {
        select: { enrolledUsers: true }
      }
    }
  });

  res.json(courses);
}

export async function getCourseById(req: Request, res: Response) {
  const { id } = req.params;
  const userId = req.user?.userId;

  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      lessons: {
        orderBy: { order: 'asc' }
      },
      _count: {
        select: { enrolledUsers: true }
      },
      enrolledUsers: {
        where: { id: userId },
        select: { id: true }
      }
    }
  });

  if (!course) {
    throw new AppError('Course not found', 404);
  }

  res.json({
    ...course,
    isEnrolled: course.enrolledUsers.length > 0
  });
}

export async function enrollInCourse(req: Request, res: Response) {
  const { id } = req.params;
  const userId = req.user?.userId;

  await prisma.course.update({
    where: { id },
    data: {
      enrolledUsers: {
        connect: { id: userId }
      }
    }
  });

  res.json({ message: 'Enrolled successfully' });
}

export async function updateCourseProgress(req: Request, res: Response) {
  const { id } = req.params;
  const { lessonId } = req.body;
  const userId = req.user?.userId;

  await prisma.user.update({
    where: { id: userId },
    data: {
      completedLessons: {
        connect: { id: lessonId }
      }
    }
  });

  res.json({ message: 'Progress updated' });
}

export async function getEnrolledCourses(req: Request, res: Response) {
  const userId = req.user?.userId;

  const courses = await prisma.course.findMany({
    where: {
      enrolledUsers: {
        some: { id: userId }
      }
    },
    include: {
      lessons: true,
      _count: {
        select: { enrolledUsers: true }
      }
    }
  });

  res.json(courses);
}