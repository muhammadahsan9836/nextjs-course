import Link from "next/link";

// This is a Server Component. It fetches data directly without using useEffect!
export default async function Blog() {
  // 1. Fetch your blog data from your API route
  const res = await fetch("http://localhost:3000/api/blogs");
  const blogs = await res.json();

  return (
    <div className="flex min-h-screen flex-col items-center bg-black px-8 py-16 text-white">
      <main className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* 2. Loop through the data and create a card for each blog */}
        {blogs.map((blogItem: any) => (
          
          <div 
            key={blogItem.slug} 
            className="bg-gray-900 border border-gray-700 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:border-gray-400"
          >
            {/* 3. Make the title clickable and link to the single blog page */}
            <Link href={`/blogpost/${blogItem.slug}`}>
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 hover:underline cursor-pointer">
                {blogItem.title}
              </h3>
            </Link>
            
            {/* 4. Show a short description */}
            <p className="text-zinc-400 leading-relaxed text-sm">
              {blogItem.content ? blogItem.content.substring(0, 100) + "..." : "Click to read more"}
            </p>
            
            {/* 5. Read More link */}
            <Link href={`/blogpost/${blogItem.slug}`} className="mt-4 inline-block text-blue-500 font-medium hover:underline">
              Read More &rarr;
            </Link>
          </div>
          
        ))}

      </main>
    </div>
  );
}