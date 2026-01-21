
export enum SeverityLevel {
  MILD = 'Mild',
  MODERATE = 'Moderate',
  SEVERE = 'Severe'
}

export interface OrganicTreatment {
  pesticides: string[];
  fertilizers: string[];
  preventiveMeasures: string[];
  dosageInstructions: string;
}

export interface DiagnosisResult {
  id: string;
  timestamp: number;
  imageUrl: string;
  plantName: string;
  diseaseName: string;
  confidence: number;
  severityPercentage: number;
  severityLevel: SeverityLevel;
  treatment: OrganicTreatment;
  isLeaf: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export type AppView = 'landing' | 'upload' | 'dashboard' | 'assistant';
