"use client";

import { getProfessors } from "@/utils/crud/professors";
import { useState, useEffect } from "react";
import { debounce } from "lodash";
import { createClient } from "@/utils/supabase/client";

import { cn } from "@/lib/utils";
import ProfessorCard from "@/components/search/ProfessorCard";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

export default function Professors() {
  const [profs, setProfs] = useState<Professor[]>([]);
  const [schoolSearch, setSchoolSearch] = useState("");
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [isListVisible, setIsListVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const { toast } = useToast();

  // debounce school search
  const debouncedSetSchoolSearch = debounce((value) => {
    setSchoolSearch(value);
  }, 500);

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

  useEffect(() => {
    setLoading(true);

    (async function () {
      const data = await getProfessors(filter);
      setProfs(data);
    })();

    setLoading(false);
  }, [filter]);

  return (
    <>
      {selectedSchool ? (
        <section className='space-y-8 p-8'>
          <div className='flex flex-col gap-8'>
            <h1 className='text-4xl font-semibold'>
              Professors at{" "}
              <span
                className='underline'
                onClick={() => setSelectedSchool(null)}>
                {selectedSchool.name}
              </span>
            </h1>
            <Input
              placeholder='Search by name'
              onChange={(e) => debouncedSetSchoolSearch(e.target.value)}
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
      ) : (
        <section className='-my-20 pb-20 h-screen flex flex-col p-8 items-center justify-center gap-8'>
          <Label
            className='flex flex-col gap-4 items-center'
            htmlFor='find-school'>
            <h1 className='text-4xl font-semibold'>
              What school do you go to?
            </h1>
            <h2 className='text-xl'>
              Type in the search box to filter through our database of schools.
            </h2>
          </Label>
          <div className='md:w-3/5 w-full relative'>
            <div className='absolute w-full rounded-md border border-primary/30'>
              <Input
                placeholder='Type the name of your school to search...'
                className='border-none focus-visible:ring-0'
                onChange={(e) => debouncedSetSchoolSearch(e.target.value)}
                onFocus={() => setIsListVisible(true)}
                onBlur={() => setTimeout(() => setIsListVisible(false), 400)}
              />
              {isListVisible && (
                <div className='flex flex-col text primary/60'>
                  {loading ? (
                    <></>
                  ) : schools ? (
                    <>
                      {schools.map((school, i) => (
                        <div
                          className={cn(
                            "px-2 py-1 cursor-pointer hover:bg-muted transition-colors",
                            i === schools.length - 1 && "rounded-b-md"
                          )}
                          onClick={() => {
                            setSelectedSchool(school);
                            setIsListVisible(false);
                          }}>
                          {`${school.name}, ${school.city}, ${school.state}`}
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className='bg-muted px-2 py-1'>No schools found</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
