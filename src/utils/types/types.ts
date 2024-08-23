export type Professor = {
  id: number;
  name: string;
  department: string;
  courses: string[];
  overall_rating: number;
  difficulty_level: number;
  review_count: number;
  created_at: string;
};

export type Review = {
  id: number;
  created_at: string;
  professor_id: number;
  professor_name: string;
  rating: number;
  course_code: string;
  difficulty: number;
  comment: string;
  would_take_again?: boolean;
  grade?: string;
  for_credit?: boolean;
  mandatory_attendance?: boolean;
  textbook?: boolean;
  tags?: string[];
};
