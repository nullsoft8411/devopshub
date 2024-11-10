import React, { useState } from 'react';
import { Book, ChevronDown, ChevronRight, Code, ExternalLink, Info, Lightbulb } from 'lucide-react';
import { Button } from '../ui/Button';

interface Step {
  title: string;
  description: string;
  code?: string;
  tips?: string[];
  warning?: string;
  links?: Array<{
    title: string;
    url: string;
  }>;
}

interface TaskGuideProps {
  title: string;
  description: string;
  steps: Step[];
  currentStep: number;
  onStepComplete?: () => void;
  className?: string;
}

export function TaskGuide({
  title,
  description,
  steps,
  currentStep,
  onStepComplete,
  className = ''
}: TaskGuideProps) {
  const [expandedStep, setExpandedStep] = useState(currentStep);

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <Book className="h-5 w-5 text-blue-600" />
          <h3 className="font-medium text-gray-900">{title}</h3>
        </div>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>

      <div className="divide-y divide-gray-100">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isExpanded = expandedStep === index;

          return (
            <div
              key={index}
              className={`${
                isActive ? 'bg-blue-50' : isCompleted ? 'bg-gray-50' : ''
              }`}
            >
              <button
                className="w-full px-4 py-3 flex items-center justify-between text-left"
                onClick={() => setExpandedStep(isExpanded ? -1 : index)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? 'bg-green-100 text-green-600'
                      : isActive
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {index + 1}
                  </div>
                  <span className={`font-medium ${
                    isActive ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                )}
              </button>

              {isExpanded && (
                <div className="px-4 pb-4">
                  <div className="ml-9 space-y-4">
                    <p className="text-sm text-gray-600">{step.description}</p>

                    {step.code && (
                      <div className="bg-gray-900 rounded-lg p-4">
                        <div className="flex items-center justify-between text-gray-400 text-sm mb-2">
                          <Code className="h-4 w-4" />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-white"
                            onClick={() => navigator.clipboard.writeText(step.code!)}
                          >
                            Copy
                          </Button>
                        </div>
                        <pre className="text-sm text-gray-100 overflow-x-auto">
                          <code>{step.code}</code>
                        </pre>
                      </div>
                    )}

                    {step.tips && step.tips.length > 0 && (
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 text-blue-900 mb-2">
                          <Lightbulb className="h-4 w-4" />
                          <span className="font-medium">Helpful Tips</span>
                        </div>
                        <ul className="space-y-2">
                          {step.tips.map((tip, tipIndex) => (
                            <li
                              key={tipIndex}
                              className="flex items-start space-x-2 text-sm text-blue-800"
                            >
                              <span className="select-none">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {step.warning && (
                      <div className="bg-yellow-50 rounded-lg p-4">
                        <div className="flex items-start space-x-2">
                          <Info className="h-4 w-4 text-yellow-600 mt-0.5" />
                          <p className="text-sm text-yellow-800">{step.warning}</p>
                        </div>
                      </div>
                    )}

                    {step.links && step.links.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-900">
                          Additional Resources
                        </p>
                        {step.links.map((link, linkIndex) => (
                          <a
                            key={linkIndex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700"
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span>{link.title}</span>
                          </a>
                        ))}
                      </div>
                    )}

                    {isActive && (
                      <Button
                        className="w-full mt-4"
                        onClick={onStepComplete}
                      >
                        Mark Step as Complete
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}