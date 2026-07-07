import Link from "next/link";
import fs from "fs";
import path from "path";

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Set your exact fallback JSX content (it stays here safe!)
  let title = "How to learn Javascript in 2026";
  let displayContent = (
    <p className="text-lg text-zinc-400 leading-relaxed">
      This is the full article page. The slug for this page is: <span className="text-blue-500">"{slug}"</span>
      <br /><br />
      Here is where you would write the entire 2000-word blog post!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, facilis rerum vel illo delectus dolorum perferendis nobis aut natus non enim autem beatae!
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis numquam odio nisi accusamus laborum architecto blanditiis minus necessitatibus itaque. Ipsa deserunt explicabo, atque veritatis ratione ut ab aperiam soluta repellendus!
    </p>
  );

  // 2. Try to find the real JSON file
  try {
    const filePath = path.join(process.cwd(), "blogdata", `${slug}.json`);
    const data = fs.readFileSync(filePath, "utf8");
    const blogData = JSON.parse(data);

    // If JSON found, update the title
    title = blogData.title;

    // If JSON content exists, OVERRIDE the `displayContent` with the raw HTML
    if (blogData.content) {
      displayContent = (
        <div
          className="text-lg leading-relaxed text-zinc-400" // Applies gray text to HTML elements that don't have a color
          dangerouslySetInnerHTML={{ __html: blogData.content }}
        />
      );
    }
  } catch (error) {
    // If the JSON is NOT found, this block is skipped, and your hardcoded fallback JSX stays perfectly intact!
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-black px-8 py-16 text-white">
      <main className="w-full max-w-3xl">
        
        <h1 className="text-4xl font-bold mb-6">{title}</h1>
        
        {/* 3. Display the active content (JSX fallback OR raw HTML) */}
        <div className="w-full">
          {displayContent}
        </div>

        <Link href="/blogpost" className="mt-8 inline-block text-blue-500 hover:underline font-medium">
          &larr; Back to Blogs
        </Link>
      </main>
    </div>
  );
}