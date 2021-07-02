import {useRouter} from 'next/router'
import { getAllPostsWithSlug, getPostAndMorePosts } from 'src/sanity/api'
export default function Post({ post, morePosts, preview }) {
    const router = useRouter()
    if (!router.isFallback && !post?.slug) {
        return  <p>Error</p>
      }
       
    return (
        <div>
            {post.title}
            <p>{post.date}</p>
        </div>
    )
}

export async function getStaticProps({ params, preview = false }) {
    const data = await getPostAndMorePosts(params.slug, preview)
    return {
      props: {
        preview,
        post: data?.post || null,
        morePosts: data?.morePosts || null,
      },
      revalidate: 1
    }
  }
  
  export async function getStaticPaths() {
    const allPosts = await getAllPostsWithSlug()
    return {
      paths:
        allPosts?.map((post) => ({
          params: {
            slug: post.slug,
          },
        })) || [],
      fallback: true,
    }
  }
  