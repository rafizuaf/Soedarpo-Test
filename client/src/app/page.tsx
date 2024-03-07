'use client'
import { Input, Button } from "antd";

import { useState } from "react";

export default function Home() {
  const [results, setResults] = useState("");
  const [pages, setPages] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!results || !pages) {
      alert("Please enter both the number of results and pages.");
      return;
    }

    const href = `/${results}/${pages}`;

    window.location.href = href;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Number of Results:
            <Input
              type="text"
              value={results}
              onChange={(e) => setResults(e.target.value)}
              className="mt-1"
            />
          </label>
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Number of Pages:
            <Input
              type="text"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              className="mt-1"
            />
          </label>
        </div>

        <div className="text-center">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </form>
    </main>
  );
}
