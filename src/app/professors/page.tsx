"use client";

import { getProfessors } from "@/utils/crud/professors";
import { useState, useEffect } from "react";
import { debounce } from "lodash";

import ProfessorCard from "@/components/search/ProfessorCard";
import { Input } from "@/components/ui/input";

export default function Professors() {
  const [profs, setProfs] = useState<Professor[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setLoading(true);

    (async function () {
      const data = await getProfessors(filter);
      setProfs(data);
    })();

    setLoading(false);
  }, [filter]);

  const debouncedOnChange = debounce((value) => {
    setFilter(value);
  }, 300);

  return (
    <section className='space-y-8 p-8'>
      <div className='flex gap-8 justify-between items-end'>
        <h1 className='text-4xl font-semibold'>Professors</h1>
        <Input
          placeholder='Search by name'
          onChange={(e) => debouncedOnChange(e.target.value)}
        />
      </div>
      <div className='flex flex-col gap-4'>
        {loading ? (
          <></>
        ) : (
          profs.map((prof) => {
            return <ProfessorCard key={prof.id} prof={prof} />;
          })
        )}
      </div>
    </section>
  );
}
