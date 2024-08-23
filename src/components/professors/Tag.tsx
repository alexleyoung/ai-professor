import { cn } from "@/lib/utils";

export default function Tag({
  text,
  bad,
  good,
  grade,
}: {
  text: string;
  bad?: boolean;
  good?: boolean;
  grade?: boolean;
}) {
  return (
    <span
      className={cn(
        "bg-zinc-300 px-2 py-1 rounded-full",
        grade && "font-bold"
      )}>
      {text}
    </span>
  );
}
