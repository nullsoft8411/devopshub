import React, { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, ThumbsDown, Clock, Brain } from 'lucide-react';
import { Button } from '../ui/Button';

interface FeedbackFormProps {
  labId: string;
  timeSpent: string;
  onSubmit: (feedback: LabFeedback) => Promise<void>;
  className?: string;
}

export interface LabFeedback {
  rating: number;
  difficulty: 'too_easy' | 'just_right' | 'too_hard';
  timeSpent: string;
  helpful: boolean;
  comment: string;
  improvements?: string[];
  concepts: string[];
}

export function FeedbackForm({ labId, timeSpent, onSubmit, className = '' }: FeedbackFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [difficulty, setDifficulty] = useState<LabFeedback['difficulty']>('just_right');
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [comment, setComment] = useState('');
  const [concepts, setConcepts] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        rating,
        difficulty,
        timeSpent,
        helpful: helpful || false,
        comment,
        concepts
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const commonConcepts = [
    'Docker',
    'Kubernetes',
    'CI/CD',
    'Git',
    'Linux',
    'Cloud',
    'Security'
  ];

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Share Your Learning Experience
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Star Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How would you rate this lab?
          </label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onMouseEnter={() => setHoveredRating(value)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(value)}
                className="p-1 focus:outline-none"
              >
                <Star
                  className={`h-8 w-8 ${
                    value <= (hoveredRating || rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How was the difficulty level?
          </label>
          <div className="flex space-x-4">
            {[
              { value: 'too_easy', label: 'Too Easy', icon: Brain },
              { value: 'just_right', label: 'Just Right', icon: Brain },
              { value: 'too_hard', label: 'Too Hard', icon: Brain }
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setDifficulty(option.value as LabFeedback['difficulty'])}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                  difficulty === option.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <option.icon className="h-4 w-4" />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Concepts Learned */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Which concepts did you learn? (Select all that apply)
          </label>
          <div className="flex flex-wrap gap-2">
            {commonConcepts.map((concept) => (
              <button
                key={concept}
                type="button"
                onClick={() => {
                  if (concepts.includes(concept)) {
                    setConcepts(concepts.filter(c => c !== concept));
                  } else {
                    setConcepts([...concepts, concept]);
                  }
                }}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  concepts.includes(concept)
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {concept}
              </button>
            ))}
          </div>
        </div>

        {/* Helpful Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Was this lab helpful for your learning?
          </label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setHelpful(true)}
              className={`flex items-center px-4 py-2 rounded-lg border ${
                helpful === true
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <ThumbsUp className="h-5 w-5 mr-2" />
              Yes
            </button>
            <button
              type="button"
              onClick={() => setHelpful(false)}
              className={`flex items-center px-4 py-2 rounded-lg border ${
                helpful === false
                  ? 'border-red-500 bg-red-50 text-red-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <ThumbsDown className="h-5 w-5 mr-2" />
              No
            </button>
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional comments or suggestions (optional)
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Share your thoughts about this lab..."
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={rating === 0 || isSubmitting}
          className="w-full"
        >
          Submit Feedback
        </Button>
      </form>
    </div>
  );
}