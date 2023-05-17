import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout.js'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>WebTech</title>
        <meta name="description" content="Mama No Bento blogging application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className='wt-title'>
        Welcome to Mama No Bento blogging application ! 
      </h1>
      <ul>
        <li>
          <Link href="/articles">
            View our dishes
          </Link>
        </li>
        <li>
          <Link href="/posts">
            View user posts
          </Link>
        </li>
        <li>
          <Link href="/about">
            About the mama 
          </Link>
        </li>
        <li>
          <Link href="/contact">
            Contact us
          </Link>
        </li>
      </ul>
    </Layout>
  )
}
