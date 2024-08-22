"use server";

import { getProfessors } from "@/utils/crud/professors";

import ProfessorCard from "@/components/search/ProfessorCard";

export default async function page() {
  const data = await getProfessors();

  return (
    <section className='space-y-8 p-8'>
      <div>
        <h1 className='text-4xl font-semibold'>Professors</h1>
      </div>
      <div className='flex flex-col gap-4'>
        {data.map((prof) => {
          return <ProfessorCard key={prof.id} prof={prof} />;
        })}
      </div>
    </section>
  );
}
