import Link from "next/link";
import fs from "fs";
import path from "path";

export const dynamic = 'force-dynamic';

export default async function BlogPost() {
  // 1. Read the folder path correctly
  const folderPath = path.join(process.cwd(), "public", "blogdata");
  const filenames = fs.readdirSync(folderPath);

  // 2. Map the files cleanly - NO EXTRA PARENTHESIS at the end
  const blogs = filenames.map((filename) => {
    const filePath = path.join(folderPath, filename);
    const data = fs.readFileSync(filePath, "utf8");
    const blogData = JSON.parse(data);
    return {
      ...blogData,
      slug: filename.replace('.json', '')
    };
  });

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