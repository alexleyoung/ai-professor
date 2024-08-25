"use client";

import AddProfessorForm from "@/components/professors/AddProfessorForm";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function AddProfessor() {
  return (
    <Suspense fallback={<Skeleton className='h-screen m-12' />}>
      <section className='p-12 flex flex-col gap-8 container'>
        <h1 className='text-4xl font-semibold'>Add Your Professor</h1>
        <Form />
      </section>
    </Suspense>
  );
}

function Form() {
  const schoolId = useSearchParams().get("schoolId");
  return <AddProfessorForm schoolId={schoolId || undefined} />;
}
