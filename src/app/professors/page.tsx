// See all professors (for certain school)

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

import Header from "@/components/professors-page/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ProfessorCard from "@/components/professors-page/ProfessorCard";

export default function Professors() {
  const [search, setSearch] = useState("");
  const [professors, setProfessors] = useState<String[]>([]);
  const [professorsData, setProfessorsData] = useState<Professor[]>([]);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  async function chat(content: string) {
    setLoading(true);
    toast({
      title: "Searching for professors...",
      description: "Please wait while we find the best professors for you.",
    });
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: [{ content: search }],
      }),
    });
    const data: chatRes = await res.json();
    if (data) {
      setProfessors(data.professors);
    } else {
      toast({
        title: "Error",
        description: "An error occurred while searching for professors.",
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    if (professors.length !== 0) {
      setLoading(true);
      // get professors data
      const supabase = createClient();
      professors.forEach(async (profId) => {
        const { data, error } = await supabase
          .from("professors")
          .select("*")
          .eq("id", profId)
          .single();
        if (error) {
          toast({
            title: "Error",
            description: "An error occurred while fetching professor data.",
          });
        }
        setProfessorsData((prev) => [...prev, data]);
      });
      setLoading(false);
      toast({
        title: "Success",
        description: "Scroll down to see professors!",
      });
    }
  }, [professors]);

  return (
    <>
      <Header />
      <main>
        <section className='h-screen flex flex-col p-8 items-center justify-center gap-8'>
          <Label
            className='flex flex-col gap-4 items-center'
            htmlFor='find-professor'>
            <h1 className='text-4xl font-semibold'>
              Find your next professor!
            </h1>
            <h2 className='text-xl'>
              Use natural language and let our algorithm do the rest.
            </h2>
          </Label>

          <div className='w-3/5 flex items-center gap-1'>
            <Input
              id='find-professor'
              placeholder='Find a professor that explains complex topics well'
              disabled={loading}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={async (e) => {
                if (!loading && e.key === "Enter") {
                  await chat(search);
                  setSearch("");
                }
              }}
            />
            <Button
              variant={"secondary"}
              disabled={loading}
              onClick={async () => {
                // search for professors
                await chat(search);
                setSearch("");
              }}>
              <Search size={24} />
            </Button>
          </div>
        </section>
        {/* top 3 professors with explanation after search is done */}
        {professorsData.length !== 0 && (
          <section className='h-screen'>
            {professorsData.map((prof) => {
              // get professor data
              return <ProfessorCard key={Number(prof.id)} prof={prof} />;
            })}
          </section>
        )}
      </main>
    </>
  );
}

type chatRes = {
  message: string;
  professors: string[];
};
