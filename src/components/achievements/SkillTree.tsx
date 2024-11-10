import React from 'react';
import { Lock, Check } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  description: string;
  level: number;
  maxLevel: number;
  unlocked: boolean;
  prerequisites: string[];
  xpRequired: number;
}

interface SkillTreeProps {
  skills: Skill[];
  userXp: number;
  onUnlockSkill: (skillId: string) => void;
  className?: string;
}

export function SkillTree({
  skills,
  userXp,
  onUnlockSkill,
  className = ''
}: SkillTreeProps) {
  const canUnlockSkill = (skill: Skill): boolean => {
    if (skill.unlocked) return false;
    if (userXp < skill.xpRequired) return false;
    return skill.prerequisites.every(preId => 
      skills.find(s => s.id === preId)?.unlocked
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {skills.map((skill) => (
        <div
          key={skill.id}
          className={`bg-white rounded-lg shadow-sm p-6 ${
            skill.unlocked
              ? 'border-2 border-green-200'
              : canUnlockSkill(skill)
              ? 'border-2 border-blue-200 cursor-pointer'
              : 'opacity-75'
          }`}
          onClick={() => canUnlockSkill(skill) && onUnlockSkill(skill.id)}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">{skill.name}</h3>
            <div className="flex items-center space-x-2">
              {skill.unlocked ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <Lock className="h-5 w-5 text-gray-400" />
              )}
              <span className="text-sm text-gray-500">
                Level {skill.level}/{skill.maxLevel}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-4">{skill.description}</p>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Progress</span>
              <span className="text-gray-900">
                {Math.round((skill.level / skill.maxLevel) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  skill.unlocked ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{ width: `${(skill.level / skill.maxLevel) * 100}%` }}
              />
            </div>
            {!skill.unlocked && (
              <p className="text-sm text-gray-500">
                Requires {skill.xpRequired} XP
              </p>
            )}
          </div>

          {skill.prerequisites.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">Prerequisites:</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {skill.prerequisites.map((preId) => {
                  const prereq = skills.find(s => s.id === preId);
                  return (
                    <span
                      key={preId}
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        prereq?.unlocked
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {prereq?.name || preId}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}