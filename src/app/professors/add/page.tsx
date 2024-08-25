"use client";

import AddProfessorForm from "@/components/professors/AddProfessorForm";
import { useSearchParams } from "next/navigation";

export default function AddProfessor() {
  const schoolId = useSearchParams().get("schoolId");

  return (
    <section className='p-12 flex flex-col gap-8 container'>
      <h1 className='text-4xl font-semibold'>Add Your Professor</h1>
      <AddProfessorForm schoolId={schoolId || undefined} />
    </section>
  );
}
