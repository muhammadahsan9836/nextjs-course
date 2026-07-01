// 1. IMPORT LINK AT THE TOP!
import Link from "next/link"; 

export default function BlogPost() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-black px-8 py-16">
      <main className="w-full max-w-3xl">
        
        <div className="group bg-gray-900 border border-gray-700 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:border-gray-400">
          
          {/* 2. WRAP THE TITLE WITH LINK */}
          <Link href="/blogpost/how-to-learn-javascript-in-2026">
            <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors cursor-pointer hover:underline">
              How to learn Javascript in 2026
            </h2>
          </Link>
          
          <p className="text-zinc-400 leading-relaxed">
            Javascript is a programming language that is used to make web pages
            interactive. It is a client-side scripting language, which means that it
            runs on the user's computer rather than on the server.
          </p>

          <div className="mt-4 text-blue-500 font-medium group-hover:underline cursor-pointer">
            Read More &rarr;
          </div>
        </div>

      </main>
    </div>
  );
}