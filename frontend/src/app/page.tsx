"use client";

import { API_BASE_URL } from "@/constants";
import { Issue } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFetch } from "use-http";

export default function Home() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const { get, response, loading } = useFetch(API_BASE_URL);

  async function fetchIssues() {
    const initialItems = await get("/issues");
    if (response.ok) setIssues(initialItems);
  }
  useEffect(() => {
    fetchIssues();
  }, []);

  console.log({ issues });

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-5xl w-full items-center  lg:flex">
        <h1 className="flex w-full justify-center border-b border-gray-300 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Issue Tracker (Sitemate Code Challenge)
        </h1>
      </div>
      <div className="text-sm pt-4">
        <h2 className="tx-xl">Your issues:</h2>

        <div className="">
          {loading ? "Loading..." : null}

          {issues.length > 0 &&
            issues.map((issue) => (
              <div key={issue.id}>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
