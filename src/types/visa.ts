export type VisaCategory = 'student_masters' | 'skilled_worker' | 'job_seeker';

export interface Country {
  id: string;
  name: string;
  flag: string;
  currency: string;
  region: string;
}

export interface VisaProgram {
  id: string;
  countryId: string;
  category: VisaCategory;
  
  // Spouse information
  spouseCanAccompany: boolean;
  spouseJoinDelay: string;
  spouseWorkRights: string;
  
  // PR pathway
  prPathway: boolean;
  timeToPr: string;
  
  // Work permit
  workPermitHours: string;
  postStudyWorkVisa: string;
  
  // Financial requirements
  financialProofType: string;
  financialProofAmount: string;
  
  // Tuition (for students)
  tuitionFeeMin: number;
  tuitionFeeMax: number;
  tuitionCurrency: string;
  
  // Other requirements
  processingTime: string;
  languageRequirement: string;
  costOfLivingIndex: number;
  
  // Meta
  lastUpdated: string;
  sourceLink: string;
}

export interface CountryWithPrograms extends Country {
  programs: VisaProgram[];
}
