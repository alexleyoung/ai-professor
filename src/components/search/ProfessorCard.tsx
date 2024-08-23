import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ProfessorCard({
  prof,
  message,
}: {
  prof: Professor;
  message?: string;
}) {
  return (
    <Link
      href={`/professors/${prof.id}`}
      className='bg-muted hover:scale-[1.015] transition-transform duration-300 p-4 flex gap-4'>
      <div className='flex flex-col gap-2'>
        <h2 className='font-semibold'>Overall</h2>
        <div
          className={cn(
            "p-3 text-xl font-bold",
            prof.overall_rating > 4
              ? "bg-green-300"
              : prof.overall_rating > 2.5
              ? "bg-yellow-300"
              : "bg-rose-500"
          )}>
          {prof.overall_rating === 1
            ? prof.overall_rating + ".0"
            : prof.overall_rating === 2
            ? prof.overall_rating + ".0"
            : prof.overall_rating === 3
            ? prof.overall_rating + ".0"
            : prof.overall_rating === 4
            ? prof.overall_rating + ".0"
            : prof.overall_rating === 5
            ? prof.overall_rating + ".0"
            : prof.overall_rating}
        </div>
        <h2 className='text-nowrap'>
          {prof.review_count
            ? prof.review_count === 1
              ? `${prof.review_count} rating`
              : `${prof.review_count} ratings`
            : "No ratings"}
        </h2>
      </div>
      <div className='flex flex-col gap-2'>
        <h1 className='text-xl flex flex-col sm:flex-row gap-2'>
          <span className='font-semibold'>{prof.name}</span>
          <em>{prof.department}</em>
        </h1>
        <p>{message}</p>
      </div>
    </Link>
  );
}
