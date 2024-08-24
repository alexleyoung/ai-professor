import { createClient } from "@/utils/supabase/server";
import { createClient as clientCreateClient } from "@/utils/supabase/client";

export async function getSchools(filter = "") {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("schools")
    .select()
    .ilike("name", `%${filter}%`);
  if (error) {
    throw error;
  }
  return data as School[];
}

export async function clientGetSchools(filter = "") {
  const supabase = clientCreateClient();
  const { data, error } = await supabase
    .from("schools")
    .select()
    .ilike("name", `%${filter}%`);
  if (error) {
    throw error;
  }
  return data as School[];
}

export async function getSchool(id: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("schools")
    .select()
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  }
  return data as School;
}

export async function createSchool(school: SchoolFormData) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("schools")
    .insert(school)
    .select()
    .single();
  if (error) {
    throw error;
  }
  return data as School;
}

export async function updateSchool(id: number, school: SchoolFormData) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("schools")
    .update(school)
    .eq("id", id)
    .select()
    .single();
  if (error) {
    throw error;
  }
  return data as School;
}

export async function deleteSchool(id: number) {
  const supabase = createClient();
  const { error } = await supabase.from("schools").delete().eq("id", id);
  if (error) {
    throw error;
  }
}

type SchoolFormData = {
  name: string;
  city: string;
  state: string;
  country: string;
};
