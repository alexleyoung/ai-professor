"use server";

import { createClient } from "@/utils/supabase/server";
import { embedReview } from "../pinecone/pinecone";

export async function getReviewsForProfessor(professorId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("reviews")
    .select()
    .eq("professor_id", professorId);
  if (error) {
    throw error;
  }
  return data as Review[];
}

export async function createReview(review: ReviewFormValues) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("reviews")
    .insert(review)
    .select()
    .single();
  if (error) {
    throw error;
  }
  embedReview(data as Review);
  return data as Review;
}

export async function updateReview(review: Review) {
  const supabase = createClient();
  const { error } = await supabase
    .from("reviews")
    .update(review)
    .eq("id", review.id);
  if (error) {
    throw error;
  }
}

export async function deleteReview(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) {
    throw error;
  }
}

type ReviewFormValues = {
  professor_id: string;
  course_code: string;
  rating: number;
  difficulty: number;
  comment: string;
  would_take_again?: boolean;
  grade?: string;
  for_credit?: boolean;
  mandatory_attendance?: boolean;
  textbook?: boolean;
  tags?: string[];
};
