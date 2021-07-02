import { getAllPostsForHome } from "src/sanity/api";
import Link from "next/link";

export default function Home({ allPosts, preview }) {
  return (
    <div>
      {allPosts.map((post) => (
        <Post post={post} key={post.slug} />
      ))}
    </div>
  );
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview);
  return {
    props: { allPosts, preview },
    revalidate: 1,
  };
}

const Post = ({ post }) => {
  return (
    <div>
      <Link href={`/posts/${post.slug}`}>
        <a>{post.title}</a>
      </Link>
    </div>
  );
};
