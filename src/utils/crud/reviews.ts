"use server";

import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export async function getReviewsForProfessor(professorId: string) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("professor_id", professorId);
  if (error) {
    throw error;
  }
  return data;
}

export async function createReview(review: Review) {
  const { data, error } = await supabase.from("reviews").insert(review);
  if (error) {
    throw error;
  }
  return data;
}

export async function updateReview(review: Review) {
  const { data, error } = await supabase
    .from("reviews")
    .update(review)
    .eq("id", review.id);
  if (error) {
    throw error;
  }
  return data;
}

export async function deleteReview(id: string) {
  const { data, error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) {
    throw error;
  }
  return data;
}
