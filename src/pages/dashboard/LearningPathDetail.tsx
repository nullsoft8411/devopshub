import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Server, Cloud, Shield, Clock, BookOpen, Trophy, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CourseList } from '@/components/courses/CourseList';

const paths = {
  'devops-engineer': {
    title: 'DevOps Engineer',
    description: 'Master the tools and practices for modern software delivery',
    icon: Cloud,
    duration: '6 months',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=1200',
    overview: 'This comprehensive path will teach you the essential skills needed to become a DevOps Engineer. You\'ll learn about continuous integration, deployment, infrastructure automation, and monitoring.',
    courses: [
      {
        id: 'docker-fundamentals',
        title: 'Docker Fundamentals',
        duration: '2 weeks',
        lessons: 12,
        progress: 0,
        image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&q=80&w=400'
      },
      {
        id: 'kubernetes-essentials',
        title: 'Kubernetes Essentials',
        duration: '4 weeks',
        lessons: 16,
        progress: 0,
        image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=400'
      },
      {
        id: 'ci-cd-pipeline',
        title: 'CI/CD Pipeline Mastery',
        duration: '3 weeks',
        lessons: 14,
        progress: 0,
        image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=400'
      }
    ],
    skills: ['Container Orchestration', 'Infrastructure as Code', 'CI/CD Pipelines', 'Cloud Platforms', 'Monitoring & Logging']
  },
  // Add other paths here...
};

export default function LearningPathDetail() {
  const { pathId } = useParams<{ pathId: string }>();
  const path = pathId ? paths[pathId as keyof typeof paths] : null;

  if (!path) {
    return <div>Path not found</div>;
  }

  const Icon = path.icon;

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Link to="/paths">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Paths
          </Button>
        </Link>
      </div>

      <div className="relative h-64 rounded-xl overflow-hidden">
        <img
          src={path.image}
          alt={path.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg">
              <Icon className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-white/90">
              {path.level}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white">{path.title}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-600">{path.overview}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Content</h2>
            <CourseList courses={path.courses} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Path Details</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Duration</p>
                  <p className="text-sm text-gray-500">{path.duration}</p>
                </div>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Courses</p>
                  <p className="text-sm text-gray-500">{path.courses.length} courses</p>
                </div>
              </div>
              <div className="flex items-center">
                <Trophy className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Certificate</p>
                  <p className="text-sm text-gray-500">Upon completion</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills You'll Gain</h3>
            <div className="flex flex-wrap gap-2">
              {path.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <Button className="w-full">
            Start Learning Path
          </Button>
        </div>
      </div>
    </div>
  );
}