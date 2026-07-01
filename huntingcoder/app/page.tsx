import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center pt-24 sm:pt-32 bg-zinc-50 dark:bg-black px-8">
      <main className="flex w-full max-w-3xl flex-col items-center gap-10 text-center">
        
        {/* 1. Blog Title & Subtitle */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white sm:text-5xl">
            Hunting Coder
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            A blog for hunting coders by hunting Coder
          </p>
        </div>

        {/* 2. Responsive Image - Updated to fit any screen */}
        <div className="w-full max-w-md">
          <Image
            src="/homeimg.jpg" 
            alt="Home image"
            width={600}
            height={400}
            className="h-auto w-full rounded-xl object-cover shadow-lg"
            priority
          />
        </div>

        {/* 3. Blog Post Content */}
        <div className="w-full text-left">
          <h2 className="mb-2 text-2xl font-bold text-black dark:text-white">
            How to learn Javascript in 2026
          </h2>
          <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Javascript is a programming language that is used to make web pages
            interactive. It is a client-side scripting language, which means that it
            runs on the user's computer rather than on the server.
          </p>
        </div>

      </main>
    </div>
  );
}