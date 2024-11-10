import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { AppError } from '../lib/errors';

export async function getStats(req: Request, res: Response) {
  const [
    totalUsers,
    lastMonthUsers,
    activeLabs,
    lastMonthLabs,
    courseCompletions,
    lastMonthCompletions,
    certificatesIssued,
    lastMonthCertificates
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        }
      }
    }),
    prisma.lab.count({
      where: { progress: { some: {} } }
    }),
    prisma.lab.count({
      where: {
        progress: {
          some: {
            startedAt: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            }
          }
        }
      }
    }),
    prisma.course.count({
      where: { enrolledUsers: { some: {} } }
    }),
    prisma.course.count({
      where: {
        enrolledUsers: {
          some: {
            createdAt: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            }
          }
        }
      }
    }),
    prisma.certificate.count(),
    prisma.certificate.count({
      where: {
        issuedAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        }
      }
    })
  ]);

  res.json({
    totalUsers,
    userGrowth: calculateGrowth(totalUsers, lastMonthUsers),
    activeLabs,
    labGrowth: calculateGrowth(activeLabs, lastMonthLabs),
    courseCompletions,
    completionGrowth: calculateGrowth(courseCompletions, lastMonthCompletions),
    certificatesIssued,
    certificateGrowth: calculateGrowth(certificatesIssued, lastMonthCertificates)
  });
}

export async function getActivities(req: Request, res: Response) {
  const activities = await prisma.activity.findMany({
    take: 50,
    orderBy: { timestamp: 'desc' },
    include: { user: true }
  });

  res.json(activities);
}

export async function getSystemStatus(req: Request, res: Response) {
  const startTime = process.hrtime();
  
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    const dbQueryTime = process.hrtime(startTime)[1] / 1000000; // Convert to ms

    const dbConnections = await prisma.$queryRaw`SHOW STATUS LIKE 'Threads_connected'`;

    res.json({
      api: 'healthy',
      apiResponseTime: process.hrtime(startTime)[1] / 1000000,
      apiUptime: process.uptime(),
      database: 'healthy',
      dbConnections: dbConnections[0].Value,
      dbQueryTime
    });
  } catch (error) {
    res.json({
      api: 'healthy',
      apiResponseTime: process.hrtime(startTime)[1] / 1000000,
      apiUptime: process.uptime(),
      database: 'error',
      dbConnections: 0,
      dbQueryTime: 0
    });
  }
}

// Helper function to calculate growth percentage
function calculateGrowth(current: number, previous: number): number {
  if (previous === 0) return 100;
  return Math.round(((current - previous) / previous) * 100);
}

// User management controllers
export const manageUsers = {
  async list(req: Request, res: Response) {
    const users = await prisma.user.findMany({
      include: {
        _count: {
          select: {
            completedLessons: true,
            certificates: true
          }
        }
      }
    });
    res.json(users);
  },

  async create(req: Request, res: Response) {
    const user = await prisma.user.create({
      data: req.body
    });
    res.status(201).json(user);
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const user = await prisma.user.update({
      where: { id },
      data: req.body
    });
    res.json(user);
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id }
    });
    res.status(204).send();
  }
};

// Course management controllers
export const manageCourses = {
  async list(req: Request, res: Response) {
    const courses = await prisma.course.findMany({
      include: {
        _count: {
          select: {
            enrolledUsers: true,
            lessons: true
          }
        }
      }
    });
    res.json(courses);
  },

  async create(req: Request, res: Response) {
    const course = await prisma.course.create({
      data: req.body
    });
    res.status(201).json(course);
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const course = await prisma.course.update({
      where: { id },
      data: req.body
    });
    res.json(course);
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await prisma.course.delete({
      where: { id }
    });
    res.status(204).send();
  }
};

// Lab management controllers
export const manageLabs = {
  async list(req: Request, res: Response) {
    const labs = await prisma.lab.findMany({
      include: {
        _count: {
          select: {
            progress: true
          }
        }
      }
    });
    res.json(labs);
  },

  async create(req: Request, res: Response) {
    const lab = await prisma.lab.create({
      data: req.body
    });
    res.status(201).json(lab);
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const lab = await prisma.lab.update({
      where: { id },
      data: req.body
    });
    res.json(lab);
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await prisma.lab.delete({
      where: { id }
    });
    res.status(204).send();
  }
};