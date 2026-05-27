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

const supportAreas = [
  {
    title: "반복 업무 자동화",
    body: "엑셀 정리, 복붙, 자료 취합처럼 매번 시간을 잡아먹는 일을 줄입니다.",
  },
  {
    title: "문서와 보고서",
    body: "기획안, 회의록, 제안서, 안내문을 더 빠르게 만드는 흐름을 잡습니다.",
  },
  {
    title: "사업 운영 정리",
    body: "매장 운영, 고객 응대, 콘텐츠 발행처럼 혼자 챙기기 어려운 일을 정리합니다.",
  },
];

const audience = ["직장인", "학생", "주부", "매장 사장님", "1인 사업자"];

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
      setMessage("Supabase 설정이 아직 연결되지 않았습니다.");
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
      setMessage(error?.message ?? "제출에 실패했습니다. 다시 시도해주세요.");
      return;
    }

    setForm(initialFormState);
    setStatus("success");
    setMessage("곧 만나뵙겠습니다.");
  }

  return (
    <main className="min-h-screen bg-[#f7f8f5] text-[#171814]">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-5 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-[#d9ddd2] pb-4">
          <span className="text-base font-semibold">
            AI 업무 효율 상담소
          </span>
          <span className="rounded-md border border-[#cfd5c4] bg-white px-3 py-1 text-sm text-[#565f4a]">
            무료 문제 진단
          </span>
        </header>

        <section className="grid flex-1 gap-8 py-10 lg:grid-cols-[1fr_440px] lg:items-center lg:py-14">
          <div>
            <p className="inline-flex rounded-md bg-[#e6efe5] px-3 py-1 text-sm font-semibold text-[#245c39]">
              AI로 줄일 수 있는 업무를 같이 찾습니다.
            </p>

            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
              AI로 업무를 더 효율적으로 하고 싶으신가요?
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4e5648]">
              직장인, 학생, 주부, 매장을 운영하는 사장님까지, 연락처와
              가지고 있는 문제를 알려주세요. 제가 곧 피드백 드리겠습니다.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {audience.map((item) => (
                <span
                  className="rounded-md border border-[#d9ddd2] bg-white px-3 py-2 text-sm text-[#565f4a]"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {supportAreas.map((area) => (
                <article
                  className="rounded-lg border border-[#d9ddd2] bg-white p-4"
                  key={area.title}
                >
                  <h2 className="text-base font-semibold">{area.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-[#5e6658]">
                    {area.body}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-lg border border-[#cfd5c4] bg-white p-5 shadow-[0_18px_50px_rgba(32,40,28,0.10)] sm:p-6"
          >
            <div className="border-b border-[#e2e6dc] pb-5">
              <p className="text-sm font-semibold text-[#245c39]">상담 신청</p>
              <h2 className="mt-2 text-2xl font-semibold">
                지금 막히는 업무를 남겨주세요.
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#66705f]">
                거창하게 적지 않아도 됩니다. 지금 귀찮거나 오래 걸리는 일을
                그대로 남겨주세요.
              </p>
            </div>

            <label className="mt-5 block text-sm font-medium text-[#2d3129]">
              이름
              <input
                className="mt-2 h-11 w-full rounded-md border border-[#cfd5c4] bg-[#fbfcfa] px-3 outline-none transition focus:border-[#245c39] focus:bg-white"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                placeholder="선택 입력"
              />
            </label>

            <label className="mt-5 block text-sm font-medium text-[#2d3129]">
              연락처
              <input
                className="mt-2 h-11 w-full rounded-md border border-[#cfd5c4] bg-[#fbfcfa] px-3 outline-none transition focus:border-[#245c39] focus:bg-white"
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

            <label className="mt-5 block text-sm font-medium text-[#2d3129]">
              가지고 있는 문제
              <textarea
                className="mt-2 min-h-36 w-full resize-y rounded-md border border-[#cfd5c4] bg-[#fbfcfa] px-3 py-3 outline-none transition focus:border-[#245c39] focus:bg-white"
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
              className="mt-6 h-12 w-full rounded-md bg-[#171814] px-4 text-sm font-semibold text-white transition hover:bg-[#2d3328] disabled:cursor-not-allowed disabled:bg-[#9aa394]"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "제출 중..." : "피드백 요청하기"}
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-[#6f7768]">
              제출된 내용은 상담 피드백을 위해서만 확인합니다.
            </p>

            {message ? (
              <p
                aria-live="polite"
                className={`mt-4 rounded-md px-3 py-2 text-sm ${
                  status === "error"
                    ? "bg-[#fff1f0] text-[#b42318]"
                    : "bg-[#edf8ef] text-[#1d6b35]"
                }`}
              >
                {message}
              </p>
            ) : null}
          </form>
        </section>
      </div>
    </main>
  );
}
