"use client";

import { API_BASE_URL } from "@/constants";
import { Issue } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFetch } from "use-http";

export default function IssuePage() {
  const router = useRouter();
  const id = router.query.id as string;

  const [issue, setIssue] = useState<Issue>();
  const { get, response, loading } = useFetch(API_BASE_URL);

  async function fetchIssue(id: string) {
    const initialItems = await get(`/issues/${id}`);
    if (response.ok) setIssue(initialItems);
  }
  useEffect(() => {
    fetchIssue(id);
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!issue) return <div>Could not find that issue!</div>;

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-5xl w-full items-center lg:flex">
        <h1 className="flex w-full justify-center border-b border-gray-300 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          {issue.title}
        </h1>
      </div>
      <div className="text-sm pt-4">{issue.description}</div>
    </main>
  );
}
