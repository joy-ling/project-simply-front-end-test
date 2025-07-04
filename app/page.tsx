import { decode } from "html-entities";
import PostItem from "./components/PostItem";

interface Post {
  id: number;
  title: {
    rendered: string;
  };
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch(
    "https://frontendtest.pleasecheck.me/wp-json/wp/v2/posts/",
    {
      next: { revalidate: 3600 }, // revalidate every hour
    }
  );

  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export default async function Home() {
  const posts = await getPosts();
  const postProps = [
    { bgColor: "#F872DB", yPosition: 130, rotation: -10, zIndex: 2 },
    { bgColor: "#71f77f", yPosition: 150, rotation: 5, zIndex: 0 },
    { bgColor: "#71c8f7", yPosition: 175, rotation: 6, zIndex: 1 },
    { bgColor: "#ea8f78", yPosition: 100, rotation: -3, zIndex: 0},
    { bgColor: "#7ba0f2", yPosition: 200, rotation: -6, zIndex: 1 },
    { bgColor: "#f7f886", yPosition: 0, rotation: 5, zIndex: 0},
    { bgColor: "#96f5cb", yPosition: 200, rotation: -1, zIndex: 1 },
  ];

  return (
      <main className="flex flex-col">
        {posts.slice(0, postProps.length).map((post, index) => {
          const config = postProps[index];
          return (
            <PostItem
              key={post.id}
              id={post.id}
              title={post.title.rendered}
              bgColor={config.bgColor}
              yPosition={config.yPosition}
              rotation={config.rotation}
              zIndex={config.zIndex}
            />
          );
        })}
      </main>
  );
}
