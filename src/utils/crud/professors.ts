"use server";

import { createClient } from "@/utils/supabase/server";

export async function getProfessors(filter?: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("professors")
    .select("*")
    .ilike("name", `%${filter}%`);

  if (error) {
    throw error;
  }
  return data as Professor[];
}

export async function getProfessor(id: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("professors")
    .select()
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  }
  return data as Professor;
}

export async function createProfessor(professor: Professor) {
  const supabase = createClient();
  const { error } = await supabase.from("professors").insert(professor);
  if (error) {
    throw error;
  }
}

export async function updateProfessor(professor: Professor) {
  const supabase = createClient();
  const { error } = await supabase
    .from("professors")
    .update(professor)
    .eq("id", professor.id);
  if (error) {
    throw error;
  }
}

export async function deleteProfessor(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("professors").delete().eq("id", id);
  if (error) {
    throw error;
  }
}
