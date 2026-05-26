export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 text-zinc-950">
      <section className="w-full max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          MVP launch
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          mvp-launch
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600">
          A small starter for testing market demand quickly. Next we will add
          the signup flow and Supabase storage.
        </p>
      </section>
    </main>
  );
}
