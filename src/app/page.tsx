"use client";

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  contact: string;
  problem: string;
};

const initialFormState: FormState = {
  name: "",
  contact: "",
  problem: "",
};

export default function Home() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anonKey) {
      setStatus("error");
      setMessage("Supabase is not configured yet.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    const supabaseUrl = url.replace(/\/rest\/v1\/?$/, "");
    const response = await fetch(`${supabaseUrl}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name: form.name.trim() || null,
        contact: form.contact.trim(),
        problem: form.problem.trim(),
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      setStatus("error");
      setMessage(error?.message ?? "Submission failed. Please try again.");
      return;
    }

    setForm(initialFormState);
    setStatus("success");
    setMessage("곧 만나뵙겠습니다.");
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-10 lg:flex-row lg:items-start">
        <div className="flex-1 pt-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            MVP launch
          </p>
          <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
            AI로 업무를 더 효율적으로 하고 싶으신가요?
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600">
            직장인, 학생, 주부, 매장을 운영하는 사장님까지, 연락처와
            가지고 있는 문제를 알려주세요. 제가 곧 피드백 드리겠습니다.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-6 shadow-sm"
        >
          <label className="block text-sm font-medium text-zinc-800">
            이름
            <input
              className="mt-2 h-11 w-full rounded-md border border-zinc-300 px-3 outline-none transition focus:border-zinc-950"
              value={form.name}
              onChange={(event) =>
                setForm((current) => ({ ...current, name: event.target.value }))
              }
              placeholder="선택 입력"
            />
          </label>

          <label className="mt-5 block text-sm font-medium text-zinc-800">
            연락처
            <input
              className="mt-2 h-11 w-full rounded-md border border-zinc-300 px-3 outline-none transition focus:border-zinc-950"
              value={form.contact}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  contact: event.target.value,
                }))
              }
              placeholder="이메일, 전화번호, 카카오톡 ID"
              required
            />
          </label>

          <label className="mt-5 block text-sm font-medium text-zinc-800">
            가지고 있는 문제
            <textarea
              className="mt-2 min-h-32 w-full resize-y rounded-md border border-zinc-300 px-3 py-3 outline-none transition focus:border-zinc-950"
              value={form.problem}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  problem: event.target.value,
                }))
              }
              placeholder="AI로 더 효율적으로 만들고 싶은 업무나 고민을 적어주세요."
              required
            />
          </label>

          <button
            className="mt-6 h-11 w-full rounded-md bg-zinc-950 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "제출 중..." : "제출하기"}
          </button>

          {message ? (
            <p
              className={`mt-4 text-sm ${
                status === "error" ? "text-red-600" : "text-emerald-700"
              }`}
            >
              {message}
            </p>
          ) : null}
        </form>
      </section>
    </main>
  );
}
