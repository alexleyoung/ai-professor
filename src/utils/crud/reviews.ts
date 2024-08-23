"use server";

import { createClient } from "@/utils/supabase/server";

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

export async function createReview(review: Review) {
  const supabase = createClient();
  const { error } = await supabase.from("reviews").insert(review);
  if (error) {
    throw error;
  }
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
