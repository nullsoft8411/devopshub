import React, { useState, useMemo } from 'react';
import { Search, Filter, BookOpen, Users, Clock, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CourseCard } from '@/components/courses/CourseCard';

const courses = [
  {
    id: 'docker-fundamentals',
    title: 'Docker Fundamentals',
    description: 'Learn the basics of containerization with Docker',
    duration: '6 hours',
    level: 'Beginner',
    category: 'Containers',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&q=80&w=400&h=250',
    stats: { 
      students: '2.1k',
      rating: 4.8
    }
  },
  {
    id: 'kubernetes-essentials',
    title: 'Kubernetes Essentials',
    description: 'Master container orchestration with Kubernetes',
    duration: '8 hours',
    level: 'Intermediate',
    category: 'Orchestration',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=400&h=250',
    stats: {
      students: '1.5k',
      rating: 4.7
    }
  },
  {
    id: 'ci-cd-pipeline',
    title: 'CI/CD Pipeline Development',
    description: 'Build and deploy applications automatically',
    duration: '10 hours',
    level: 'Advanced',
    category: 'CI/CD',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=400&h=250',
    stats: {
      students: '980',
      rating: 4.9
    }
  }
];

const levelFilters = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const categoryFilters = ['All', 'Containers', 'Orchestration', 'CI/CD', 'Security'];

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      return matchesSearch && matchesLevel && matchesCategory;
    });
  }, [searchQuery, selectedLevel, selectedCategory]);

  const stats = useMemo(() => ({
    totalCourses: courses.length,
    totalHours: courses.reduce((acc, course) => acc + parseInt(course.duration), 0),
    totalStudents: courses.reduce((acc, course) => acc + parseInt(course.stats.students), 0),
    avgRating: (courses.reduce((acc, course) => acc + course.stats.rating, 0) / courses.length).toFixed(1)
  }), []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Courses</h2>
        <p className="mt-1 text-sm text-gray-500">
          Master DevOps skills with our comprehensive courses
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <BookOpen className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Courses</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalCourses}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Clock className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Hours</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalHours}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Students</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalStudents}+</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Trophy className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Rating</p>
              <p className="text-2xl font-semibold text-gray-900">⭐️ {stats.avgRating}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Filter Courses</h3>
            {(selectedLevel !== 'All' || selectedCategory !== 'All' || searchQuery) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedLevel('All');
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
              >
                Clear filters
              </Button>
            )}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Level
              </label>
              <div className="flex flex-wrap gap-2">
                {levelFilters.map((level) => (
                  <Button
                    key={level}
                    variant={selectedLevel === level ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedLevel(level)}
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categoryFilters.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </div>
  );
}