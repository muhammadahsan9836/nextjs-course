import Link from "next/link";

export default async function BlogPost() {
  const res = await fetch("http://localhost:3000/api/blogs");
  const blogs = await res.json();

  // 👇 SAFETY CHECK: If blogs is NOT an array, stop the crash and show a message.
  if (!Array.isArray(blogs)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black px-8 py-16 text-white">
        <h1 className="text-3xl font-bold">No blogs found</h1>
        <p className="text-zinc-400 mt-2">The API returned a single object instead of an array.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-black px-8 py-16 text-white">
      <main className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {blogs.map((blogItem: any) => (
          <div key={blogItem.slug} className="bg-gray-900 border border-gray-700 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:border-gray-400">
            
            <Link href={`/blogpost/${blogItem.slug}`}>
              <h3 className="text-xl font-bold mb-2 hover:text-blue-400 hover:underline cursor-pointer">
                {blogItem.title}
              </h3>
            </Link>
            
            <p className="text-zinc-400 leading-relaxed text-sm">
              {blogItem.content ? blogItem.content.substring(0, 100) + "..." : "Click to read more"}
            </p>
            
            <Link href={`/blogpost/${blogItem.slug}`} className="mt-4 inline-block text-blue-500 font-medium hover:underline">
              Read More &rarr;
            </Link>
          </div>
        ))}

      </main>
    </div>
  );
}