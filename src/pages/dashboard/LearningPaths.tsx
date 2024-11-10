import React, { useState, useMemo } from 'react';
import { Trophy, Users, Clock, GraduationCap } from 'lucide-react';
import { PathCard } from '@/components/learning-paths/PathCard';
import { PathFilter } from '@/components/learning-paths/PathFilter';
import { useLearningPath } from '@/contexts/LearningPathContext';
import { learningPaths } from '@/data/learning-paths';

const levelFilters = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const categoryFilters = ['All', 'DevOps', 'Cloud', 'Security'];

const pathStats = {
  'devops-engineer': { students: '2.4k', rating: 4.8 },
  'cloud-architect': { students: '1.8k', rating: 4.7 }
};

export default function LearningPaths() {
  const { paths: userProgress } = useLearningPath();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPaths = useMemo(() => {
    return learningPaths.filter(path => {
      const matchesSearch = path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          path.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel = selectedLevel === 'All' || path.level === selectedLevel;
      const matchesCategory = selectedCategory === 'All' || path.category === selectedCategory;
      return matchesSearch && matchesLevel && matchesCategory;
    });
  }, [searchQuery, selectedLevel, selectedCategory]);

  const stats = useMemo(() => ({
    totalPaths: learningPaths.length,
    totalCourses: learningPaths.reduce((acc, path) => acc + path.courses.length, 0),
    totalStudents: Object.values(pathStats).reduce((acc, stat) => acc + parseInt(stat.students), 0),
    avgRating: (Object.values(pathStats).reduce((acc, stat) => acc + stat.rating, 0) / Object.keys(pathStats).length).toFixed(1)
  }), []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Learning Paths</h2>
        <p className="mt-1 text-sm text-gray-500">
          Choose your career path and start learning
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <GraduationCap className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Paths</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalPaths}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Clock className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Courses</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalCourses}</p>
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

      <PathFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        levelFilters={levelFilters}
        categoryFilters={categoryFilters}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPaths.map((path) => (
          <PathCard
            key={path.id}
            path={path}
            progress={userProgress[path.id]}
            stats={pathStats[path.id as keyof typeof pathStats]}
          />
        ))}
      </div>
    </div>
  );
}