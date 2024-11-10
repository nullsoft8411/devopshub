import { Lab } from '@/types/lab';
import { dockerFundamentalsLab } from './docker-fundamentals';
import { kubernetesBasicsLab } from './kubernetes-fundamentals';
import { kubernetesAdvancedLab } from './kubernetes-advanced';

export const labs: Lab[] = [
  dockerFundamentalsLab,
  kubernetesBasicsLab,
  kubernetesAdvancedLab
];

export const getLabById = (id: string): Lab | undefined => {
  return labs.find(lab => lab.id === id);
};

export const getLabsByCategory = (category: string): Lab[] => {
  return labs.filter(lab => lab.category === category);
};

export const getLabsByDifficulty = (difficulty: string): Lab[] => {
  return labs.filter(lab => lab.difficulty === difficulty);
};

export const getPrerequisiteLabs = (lab: Lab): Lab[] => {
  if (!lab.prerequisites) return [];
  return labs.filter(l => lab.prerequisites?.includes(l.id));
};