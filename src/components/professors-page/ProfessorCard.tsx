import { cn } from "@/lib/utils";

export default function ProfessorCard({
  prof,
  message,
}: {
  prof: Professor;
  message: string;
}) {
  return (
    <div className='bg-muted p-4 flex gap-4'>
      <div className='flex flex-col gap-2'>
        <h2 className='font-semibold'>Overall</h2>
        <div
          className={cn(
            "p-3 text-xl font-bold",
            prof.overall_rating > 4
              ? "bg-green-500"
              : prof.overall_rating > 2.5
              ? "bg-amber-500"
              : "bg-rose-500"
          )}>
          {prof.overall_rating}
        </div>
        <h2># ratings</h2>
      </div>
      <div className='flex flex-col gap-2'>
        <h1 className='text-xl flex flex-col sm:flex-row gap-2'>
          <span className='font-semibold'>{prof.name}</span>
          <em>{prof.department}</em>
        </h1>
        <p>{message}</p>
      </div>
    </div>
  );
}
