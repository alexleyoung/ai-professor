"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/ui/multiselect";
import { createReview } from "@/utils/crud/reviews";
import { useToast } from "@/components/ui/use-toast";
import { moderateText } from "@/utils/openai/openai";

const formSchema = z.object({
  professor_id: z.string().min(1).max(10),
  professor_name: z.string().min(1).max(100),
  course_code: z.string().min(1).max(10),
  rating: z.number().min(1).max(5),
  difficulty: z.number().min(1).max(5),
  comment: z.string().min(1).max(500),
  would_take_again: z.boolean().optional(),
  grade: z.string().optional().optional(),
  for_credit: z.boolean().optional(),
  mandatory_attendance: z.boolean().optional(),
  textbook: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

const TAGS = [
  { label: "Tough Grader", value: "tough_grader" },
  { label: "Extra Credit", value: "extra_credit" },
  { label: "Homework Heavy", value: "homework_heavy" },
  { label: "Test Heavy", value: "test_heavy" },
  { label: "Project Heavy", value: "project_heavy" },
  { label: "Group Projects", value: "group_projects" },
  {
    label: "Clear Grading Criteria",
    value: "clear_grading_criteria",
  },
  {
    label: "Participation Matters",
    value: "participation_matters",
  },
  {
    label: "Skip Class? You won't pass.",
    value: "skip_class",
  },
  { label: "Fun", value: "fun" },
];

export default function ReviewForm({
  prof,
  setOpen,
}: {
  prof: Professor;
  setOpen: (open: boolean) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      professor_id: String(prof.id), // automatic
      professor_name: prof.name, // automatic
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Submitting review...",
    });
    const flag = await moderateText(values.comment);
    if (flag) {
      toast({
        title: "Comment flagged",
        description: "Please remove inappropriate or hateful content.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createReview(values);
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
      });
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  }

  const { toast } = useToast();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 max-h-[36rem] px-2 overflow-y-auto'>
        <FormField
          control={form.control}
          name='course_code'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Course Code *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a course' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {prof.courses.map((course) => {
                    return (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='rating'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) =>
                    field.onChange(Number(e.target.value + ".0"))
                  }
                  type='number'
                  step={1}
                  min={1}
                  max={5}
                />
              </FormControl>
              <FormDescription>
                Rate this professor overall from 1-5.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='difficulty'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Difficulty *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) =>
                    field.onChange(Number(e.target.value + ".0"))
                  }
                  type='number'
                  min={1}
                  max={5}
                />
              </FormControl>
              <FormDescription>
                Rate your class' overall difficulty from 1-5.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='would_take_again'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel>Would you choose this professor again?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => field.onChange(value === "true")}
                  defaultValue={String(field.value)}
                  className='flex flex-col space-y-1'>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='true' />
                    </FormControl>
                    <FormLabel className='font-normal'>Yes</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='false' />
                    </FormControl>
                    <FormLabel className='font-normal'>No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='for_credit'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel>Was this class for credit?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => field.onChange(value === "true")}
                  defaultValue={String(field.value)}
                  className='flex flex-col space-y-1'>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='true' />
                    </FormControl>
                    <FormLabel className='font-normal'>Yes</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='false' />
                    </FormControl>
                    <FormLabel className='font-normal'>No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='textbook'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel>Did this professor use textbook(s)?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => field.onChange(value === "true")}
                  defaultValue={String(field.value)}
                  className='flex flex-col space-y-1'>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='true' />
                    </FormControl>
                    <FormLabel className='font-normal'>Yes</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='false' />
                    </FormControl>
                    <FormLabel className='font-normal'>No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='mandatory_attendance'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel>Was lecture attendance mandatory?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => field.onChange(value === "true")}
                  defaultValue={String(field.value)}
                  className='flex flex-col space-y-1'>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='true' />
                    </FormControl>
                    <FormLabel className='font-normal'>Yes</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='false' />
                    </FormControl>
                    <FormLabel className='font-normal'>No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='grade'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select grade received</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select grade' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Grades</SelectLabel>
                    <SelectItem value='A+'>A+</SelectItem>
                    <SelectItem value='A'>A</SelectItem>
                    <SelectItem value='A-'>A-</SelectItem>
                    <SelectItem value='B+'>B+</SelectItem>
                    <SelectItem value='B'>B</SelectItem>
                    <SelectItem value='B-'>B-</SelectItem>
                    <SelectItem value='C+'>C+</SelectItem>
                    <SelectItem value='C'>C</SelectItem>
                    <SelectItem value='C-'>C-</SelectItem>
                    <SelectItem value='D+'>D+</SelectItem>
                    <SelectItem value='D'>D</SelectItem>
                    <SelectItem value='D-'>D-</SelectItem>
                    <SelectItem value='F'>F</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Other</SelectLabel>
                    <SelectItem value='pass'>Pass</SelectItem>
                    <SelectItem value='drop'>Drop/Withdraw</SelectItem>
                    <SelectItem value='incomplete'>Incomplete</SelectItem>
                    <SelectItem value='audit'>Audit</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <MultiSelect
                  options={TAGS}
                  defaultValue={field.value || []}
                  onValueChange={(e) => field.onChange(e)}
                  placeholder='Select tags'
                  maxCount={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='comment'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment *</FormLabel>
              <FormControl>
                <Textarea {...field} className='resize-non h-40' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}
