"use server";

import { createClient } from "@/utils/supabase/server";

export async function getProfessors(schoolId: string, filter?: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("professors")
    .select()
    .eq("school_id", schoolId)
    .ilike("name", `%${filter}%`);

  console.log(filter);

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

export async function createProfessor(professor: ProfessorFormData) {
  const prof = {
    school_id: professor.school_id,
    first_name: professor.first_name,
    last_name: professor.last_name,
    middle_name: professor.middle_name,
    name: `${professor.first_name} ${
      professor.middle_name === undefined ? "" : professor.middle_name
    } ${professor.last_name}`,
    department: professor.department,
    courses: professor.courses,
    overall_rating: 0,
    difficulty_level: 0,
    review_count: 0,
  };

  const supabase = createClient();
  const { error } = await supabase.from("professors").insert(prof);
  if (error) {
    throw error;
  }
  return true;
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

type ProfessorFormData = {
  school_id: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  department: string;
  courses: string[];
};
