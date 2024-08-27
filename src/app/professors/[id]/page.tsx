import { getProfessor } from "@/utils/crud/professors";
import { getReviewsForProfessor } from "@/utils/crud/reviews";

import { cn } from "@/lib/utils";
import ReviewCard from "@/components/professors/ReviewCard";
import ReviewFormWrapper from "@/components/professors/ReviewFormWrapper";

export default async function Professor({
  params,
}: {
  params: { id: string };
}) {
  const prof = await getProfessor(params.id);
  const reviews = await getReviewsForProfessor(params.id);

  return (
    <>
      <section className='px-12 py-10 space-y-8'>
        <div className='font-bold gap-2 flex max-w-fit bg-muted'>
          <h1
            className={cn(
              "text-6xl",
              prof.overall_rating > 4
                ? "text-green-300"
                : prof.overall_rating > 2.5
                ? "text-yellow-300"
                : "text-rose-500"
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
          </h1>
          <h2 className='text-2xl text-zinc-400'> / 5</h2>
        </div>
        <h1 className='text-4xl font-bold'>{prof.name}</h1>
        <h2 className='text-2xl italic'>{prof.department}</h2>
        <h2>Difficulty: {prof.difficulty_level}</h2>
        <h2>Courses: {prof.courses}</h2>
        <h2>Reviews: {prof.review_count}</h2>
      </section>
      <section className='px-12 py-10 space-y-8'>
        <h1 className='text-4xl font-semibold'>Student Ratings</h1>
        <ReviewFormWrapper prof={prof} />
        <div className='flex flex-col gap-2'>
          {reviews.map((review) => {
            return <ReviewCard key={review.id} review={review} prof={prof} />;
          })}
        </div>
      </section>
    </>
  );
}
