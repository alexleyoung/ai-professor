// See all professors (for certain school)

"use client";

import { useState } from "react";

import Header from "@/components/professors-page/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ProfessorCard from "@/components/professors-page/ProfessorCard";
import { createClient } from "@/utils/supabase/client";

export default function Professors() {
  const [search, setSearch] = useState("");
  const [professors, setProfessors] = useState<String[]>([]);
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (!loading && e.key === "Enter") {
                  chat(search);
                  setSearch("");
                }
              }}
            />
            <Button
              variant={"secondary"}
              disabled={loading}
              onClick={() => {
                // search for professors
                chat(search);
                setSearch("");
              }}>
              <Search size={24} />
            </Button>
          </div>
        </section>
        {/* top 3 professors with explanation after search is done */}
        {professors.length !== 0 && (
          <section className='h-screen'>
            {professors.map(async (prof) => {
              const supabase = createClient();
              const { data, error } = await supabase
                .from("professors")
                .select()
                .eq("id", prof);
              return <ProfessorCard key={Number(prof)} prof={data} />;
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
