export interface ICriteria {
  id: string;
  code: string;
  name: string;
  evaluation: string;
  grades: ICriteriaGrade[];
  questions: ICriteriaQuestion[];
}

export interface ICriteriaGrade {
  id?: string;
  criteriaId?: string;
  level: string;
  minPoint: number;
  maxPoint: number;
  description: string;
}

export interface ICriteriaQuestion {
  id: string;
  description: string;
  priority: string;
  criteriaId: string;
  subCriteria: string;
}
