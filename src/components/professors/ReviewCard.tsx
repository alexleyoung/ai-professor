"use client";

import { cn } from "@/lib/utils";
import Tag from "@/components/professors/Tag";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { deleteReview } from "@/utils/crud/reviews";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className='bg-muted p-6 flex flex-col sm:flex-row gap-4 md:gap-8'>
      {/* scores */}
      <div className='flex sm:flex-col items-center gap-8 sm:gap-4'>
        <div className='text-center'>
          <h1>Quality</h1>
          <h1
            className={cn(
              "text-4xl p-3 font-bold",
              review.rating > 4
                ? "bg-green-300"
                : review.rating > 2.5
                ? "bg-yellow-300"
                : "bg-rose-500"
            )}>
            {review.rating}
          </h1>
        </div>
        <div className='text-center'>
          <h1 className='text-center mb-1'>Difficulty</h1>
          <h1
            className={cn(
              "text-4xl p-3 font-bold",
              review.difficulty < 2.5
                ? "bg-green-300"
                : review.difficulty < 4
                ? "bg-yellow-300"
                : "bg-rose-500"
            )}>
            {review.difficulty}
          </h1>
        </div>
      </div>
      {/* content */}
      <div className='bg-muted flex flex-col gap-4'>
        <h2 className='text-lg font-bold'>{review.course_code}</h2>
        <p className='flex gap-4'>
          {review.grade && <Tag text={`Grade: ${review.grade}`} grade />}
          {review.for_credit && <Tag text='For Credit' />}
          {review.would_take_again && <Tag text='Would Take Again' good />}
          {review.mandatory_attendance && (
            <Tag text='Mandatory Attendance' bad />
          )}
          {review.textbook && <Tag text='Textbook' />}
        </p>
        <p className='flex gap-4'>
          {review.tags?.map((tag) => {
            return <Tag key={tag} text={tag} />;
          })}
        </p>
        <p>{review.comment}</p>
      </div>
      <Button
        variant='ghost'
        onClick={async () => {
          await deleteReview(String(review.id));
          window.location.reload();
        }}>
        <X />
      </Button>
    </div>
  );
}
