import PostItem from "./components/PostItem";
import StickyLogo from "./components/StickyLogo";

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
  const displayedPosts = posts.slice(-7).reverse();

  const postProps: {
    bgColor: string;
    marginTop: number;
    rotation: number;
    zIndex: number;
    animationDirection: "left" | "right";
  }[] = [
    { bgColor: "#F872DB", marginTop: 200, rotation: -10, zIndex: 2, animationDirection: "left" },
    { bgColor: "#71f77f", marginTop: -50, rotation: 5, zIndex: 0, animationDirection: "right" },
    { bgColor: "#71c8f7", marginTop: 150, rotation: 6, zIndex: 1, animationDirection: "left" },
    { bgColor: "#ea8f78", marginTop: 175, rotation: -3, zIndex: 0, animationDirection: "right" },
    { bgColor: "#7ba0f2", marginTop: 400, rotation: -10, zIndex: 1, animationDirection: "left" },
    { bgColor: "#f7f886", marginTop: -350, rotation: 10, zIndex: 0, animationDirection: "right" },
    { bgColor: "#96f5cb", marginTop: 475, rotation: -2, zIndex: 1, animationDirection: "left" },
  ];

  return (
      <main className="w-full flex flex-col items-center">
        <div className="max-w-[1440px] overflow-hidden pb-50">
          <StickyLogo />
          {displayedPosts.map((post, index) => {
            const config = postProps[index];
            return (
              <PostItem
                key={post.id}
                id={post.id}
                title={post.title.rendered}
                bgColor={config.bgColor}
                marginTop={config.marginTop}
                rotation={config.rotation}
                zIndex={config.zIndex}
                animationDirection={config.animationDirection}
              />
            );
          })}
        </div>
      </main>
  );
}
