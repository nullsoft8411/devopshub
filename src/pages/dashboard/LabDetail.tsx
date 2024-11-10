import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Terminal, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { LabTerminal } from '@/components/labs/LabTerminal';
import { LabProgress } from '@/components/labs/LabProgress';
import { TaskList } from '@/components/labs/TaskList';
import { LabFeedback } from '@/components/labs/LabFeedback';
import { FeedbackSummary } from '@/components/labs/FeedbackSummary';
import { useLabValidation } from '@/hooks/useLabValidation';
import { useLabCompletion } from '@/hooks/useLabCompletion';
import { useLabFeedback } from '@/hooks/useLabFeedback';
import { useAuth } from '@/contexts/AuthContext';
import { labs } from '@/data/labs';

export default function LabDetail() {
  const { labId } = useParams<{ labId: string }>();
  const { user } = useAuth();
  const lab = labs.find(l => l.id === labId);
  const [showFeedback, setShowFeedback] = useState(false);

  const {
    currentTask,
    currentTaskIndex,
    completedTasks,
    validateCommand,
    selectTask
  } = useLabValidation({
    lab: lab!,
    onLabComplete: () => {
      if (startTime) {
        completeLab(startTime, completedTasks);
        setShowFeedback(true);
      }
    }
  });

  const {
    certificate,
    completeLab,
    downloadCertificate,
    shareCertificate
  } = useLabCompletion({
    lab: lab!,
    user: user!
  });

  const { submitFeedback, isSubmitting } = useLabFeedback(labId!);
  const [startTime] = useState(new Date());

  if (!lab) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Lab Not Found</h2>
        <p className="text-gray-600 mb-4">The lab you're looking for doesn't exist.</p>
        <Link to="/dashboard/labs">
          <Button>Return to Labs</Button>
        </Link>
      </div>
    );
  }

  if (showFeedback) {
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <LabFeedback
          labId={lab.id}
          onSubmit={async (feedback) => {
            await submitFeedback(feedback);
            setShowFeedback(false);
          }}
        />
        <FeedbackSummary
          averageRating={4.5}
          totalRatings={128}
          difficultyDistribution={{
            too_easy: 15,
            just_right: 70,
            too_hard: 15
          }}
          helpfulPercentage={85}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Rest of the component remains the same */}
    </div>
  );
}