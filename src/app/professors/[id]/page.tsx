import { getProfessor } from "@/utils/crud/professors";

import { cn } from "@/lib/utils";

export default async function Professor({
  params,
}: {
  params: { id: string };
}) {
  const prof = await getProfessor(params.id);

  return (
    <section className='p-8 space-y-8'>
      <div className='px-4 font-bold py-2 gap-2 flex max-w-fit bg-muted'>
        <h1
          className={cn(
            "text-6xl",
            prof.overall_rating > 4
              ? "text-green-500"
              : prof.overall_rating > 2.5
              ? "text-amber-500"
              : "text-rose-500"
          )}>
          {prof.overall_rating}
        </h1>
        <h2 className='text-2xl text-zinc-400'> / 5</h2>
      </div>
      <h1 className='text-4xl font-semibold'>{prof.name}</h1>
      <h2>{prof.department}</h2>
      <h2>{prof.difficulty_level}</h2>
      <h2>{prof.courses}</h2>
      <h2>{prof.review_count}</h2>
    </section>
  );
}
