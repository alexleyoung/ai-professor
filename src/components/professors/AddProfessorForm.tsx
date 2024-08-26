"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { debounce, set } from "lodash";
import { createClient } from "@/utils/supabase/client";
import { cn } from "@/lib/utils";

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
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProfessor } from "@/utils/crud/professors";

const formSchema = z.object({
  school_id: z.string(),
  first_name: z.string().min(1).max(50),
  last_name: z.string().min(1).max(50),
  middle_name: z.string().min(1).max(50).optional(),
  department: z.string().min(1),
  courses: z.string().min(1),
});

type AddProfessorFormProps = {
  schoolId?: string;
};

export default function AddProfessorForm({ schoolId }: AddProfessorFormProps) {
  const [schools, setSchools] = useState<School[] | null>(null);
  const [schoolSearch, setSchoolSearch] = useState("");
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [departments, setDepartments] = useState<
    { label: string; value: string }[]
  >([]);
  const [isListVisible, setIsListVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      school_id: schoolId || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    toast({
      title: "Creating professor...",
      description: "Please wait while we create the professor.",
    });
    const res = await createProfessor({
      ...values,
      courses: values.courses.trim().split(" "),
    });
    if (res) {
      toast({
        title: "Professor created",
        description: "The professor has been successfully created.",
      });
    } else {
      toast({
        title: "Error",
        description: "An error occurred while creating the professor.",
      });
    }
    setLoading(false);
  }

  const { toast } = useToast();

  // debounce school search
  const debouncedSetSchoolSearch = debounce((value) => {
    setSchoolSearch(value);
  }, 500);

  // initial school load
  useEffect(() => {
    if (schoolId && schoolId.length > 0) {
      (async () => {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("schools")
          .select()
          .eq("id", schoolId)
          .single();

        if (error) {
          toast({
            title: "Error",
            description: "An error occurred while searching for schools.",
          });
        }
        setSelectedSchool(data || null);
      })();
    }
  }, []);

  // fetch departments
  useEffect(() => {
    let temp: { label: string; value: string }[] = [];
    selectedSchool?.departments?.forEach((department) => {
      temp.push({ label: department, value: department });
    });
    setDepartments([...temp, { label: "Other", value: "Other" }]);
  }, [selectedSchool]);

  // search for school
  useEffect(() => {
    (async () => {
      setLoading(true);

      const supabase = createClient();
      const { data, error } = await supabase
        .from("schools")
        .select()
        .ilike("name", `%${schoolSearch}%`);

      if (error) {
        toast({
          title: "Error",
          description: "An error occurred while searching for schools.",
        });

        setLoading(false);
        return;
      }

      setSchools(data || []);
      setLoading(false);
    })();
  }, [schoolSearch]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='school_id'
          render={({ field }) => (
            <FormItem>
              <FormLabel>School *</FormLabel>
              <FormControl className='w-full relative'>
                <div className='absolute w-full rounded-md border border-primary/30'>
                  <Input
                    placeholder={
                      selectedSchool
                        ? selectedSchool.name
                        : "Type the name of your school to search..."
                    }
                    className={cn(
                      "border-none focus-visible:ring-0",
                      selectedSchool && "placeholder:text-primary"
                    )}
                    onChange={(e) => debouncedSetSchoolSearch(e.target.value)}
                    onFocus={() => setIsListVisible(true)}
                    onBlur={() =>
                      setTimeout(() => setIsListVisible(false), 400)
                    }
                  />
                  {isListVisible && (
                    <div className='flex flex-col text primary/60'>
                      {loading ? (
                        <></>
                      ) : schools ? (
                        <>
                          {schools.map((school, i) => (
                            <Button
                              key={school.id}
                              variant='ghost'
                              className={cn(
                                "justify-start",
                                i === schools.length - 1 && "rounded-b-md"
                              )}
                              onClick={() => {
                                field.value = String(school.id);
                                setSelectedSchool(school);
                                setIsListVisible(false);
                              }}>
                              {`${school.name}, ${school.city}, ${school.state}`}
                            </Button>
                          ))}
                        </>
                      ) : (
                        <div className='bg-muted px-2 py-1'>
                          No schools found
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                The school your professor teaches at.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='first_name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name *</FormLabel>
              <FormControl>
                <Input placeholder='Alex' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='last_name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name *</FormLabel>
              <FormControl>
                <Input placeholder='Young' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='middle_name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Middle Name</FormLabel>
              <FormControl>
                <Input placeholder='' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='department'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department *</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder='Department' />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((department) => (
                      <SelectItem
                        key={department.value}
                        value={department.value}>
                        {department.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='courses'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Courses *</FormLabel>
              <FormControl>
                <Input {...field} placeholder='MATH165' />
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
