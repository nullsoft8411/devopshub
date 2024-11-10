import React, { useState, useMemo } from 'react';
import { Trophy, BookOpen, Users, Clock } from 'lucide-react';
import { LabCard } from '@/components/labs/LabCard';
import { LabFilter } from '@/components/labs/LabFilter';

const difficultyFilters = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const categoryFilters = ['All', 'Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Security'];

const labs = [
  {
    id: 'docker-basics',
    title: 'Docker Basics Lab',
    description: 'Learn basic Docker commands and container management',
    duration: '45 min',
    difficulty: 'Beginner' as const,
    category: 'Docker',
    tasks: 8,
    tasksCompleted: 0,
    image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&q=80&w=400',
    stats: { students: '1.2k', rating: 4.8 }
  },
  {
    id: 'kubernetes-pods',
    title: 'Kubernetes Pods & Deployments',
    description: 'Create and manage Kubernetes pods and deployments',
    duration: '60 min',
    difficulty: 'Intermediate' as const,
    category: 'Kubernetes',
    tasks: 10,
    tasksCompleted: 0,
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=400',
    stats: { students: '856', rating: 4.7 }
  },
  {
    id: 'ci-cd-pipeline',
    title: 'Building CI/CD Pipelines',
    description: 'Set up a complete CI/CD pipeline with GitHub Actions',
    duration: '90 min',
    difficulty: 'Advanced' as const,
    category: 'CI/CD',
    tasks: 12,
    tasksCompleted: 0,
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=400',
    stats: { students: '643', rating: 4.9 }
  }
];

export default function Labs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredLabs = useMemo(() => {
    return labs.filter(lab => {
      const matchesSearch = lab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lab.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = selectedDifficulty === 'All' || lab.difficulty === selectedDifficulty;
      const matchesCategory = selectedCategory === 'All' || lab.category === selectedCategory;
      return matchesSearch && matchesDifficulty && matchesCategory;
    });
  }, [searchQuery, selectedDifficulty, selectedCategory]);

  const stats = useMemo(() => ({
    totalLabs: labs.length,
    totalHours: labs.reduce((acc, lab) => acc + parseInt(lab.duration), 0),
    totalStudents: labs.reduce((acc, lab) => acc + parseInt(lab.stats.students), 0),
    avgRating: (labs.reduce((acc, lab) => acc + lab.stats.rating, 0) / labs.length).toFixed(1)
  }), []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Interactive Labs</h2>
        <p className="mt-1 text-sm text-gray-500">
          Practice your skills with hands-on labs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <BookOpen className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Labs</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalLabs}</p>
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

      <LabFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        difficultyFilters={difficultyFilters}
        categoryFilters={categoryFilters}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLabs.map((lab) => (
          <LabCard key={lab.id} {...lab} />
        ))}
      </div>
    </div>
  );
}