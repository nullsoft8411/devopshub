import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface PathFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedLevel: string;
  onLevelChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  levelFilters: string[];
  categoryFilters: string[];
}

export function PathFilter({
  searchQuery,
  onSearchChange,
  selectedLevel,
  onLevelChange,
  selectedCategory,
  onCategoryChange,
  levelFilters,
  categoryFilters,
}: PathFilterProps) {
  const hasActiveFilters = selectedLevel !== 'All' || selectedCategory !== 'All' || searchQuery;

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'text-green-600 bg-green-50 hover:bg-green-100';
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-50 hover:bg-yellow-100';
      case 'advanced':
        return 'text-red-600 bg-red-50 hover:bg-red-100';
      default:
        return 'text-gray-600 bg-gray-50 hover:bg-gray-100';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'devops':
        return 'text-blue-600 bg-blue-50 hover:bg-blue-100';
      case 'cloud':
        return 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100';
      case 'security':
        return 'text-red-600 bg-red-50 hover:bg-red-100';
      default:
        return 'text-gray-600 bg-gray-50 hover:bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Filter Paths</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onLevelChange('All');
              onCategoryChange('All');
              onSearchChange('');
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4 mr-1" />
            Clear filters
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search paths..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Level
            </label>
            <div className="flex flex-wrap gap-2">
              {levelFilters.map((filter) => (
                <Button
                  key={filter}
                  variant={selectedLevel === filter ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => onLevelChange(filter)}
                  className={getLevelColor(filter)}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categoryFilters.map((filter) => (
                <Button
                  key={filter}
                  variant={selectedCategory === filter ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => onCategoryChange(filter)}
                  className={getCategoryColor(filter)}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}