import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout.js'
import { supabase } from './api/supabase'

export default function Posts({
  posts
}) {
  return (
    <Layout>
      <Head>
        <title>WebTech - articles</title>
        <meta name="description" content="WebTech posts page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className='wt-title'>
        All the posts about the mama
      </h1>
      <Link href="/createPost">
        <button className="mb-5">Create a Post</button>
      </Link>
      <p className="italic my-5">Below are the users's posts :</p>
      <ul>
        {posts.map( post => (
          <li key={post.slug} className="my-5">
            <h2 className="font-bold mb-1"><Link href={`/posts/${post.slug}`}>{post.title}</Link></h2>
            <p>{post.message}</p>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export async function getStaticProps(ctx) {
  let posts = []
  let { data, error, status } = await supabase
    .from('posts')
    .select(`id, slug, title`)
  if (!error) posts = data // handle errors
  return {
    props: {
        posts: posts
    }
  };
}
