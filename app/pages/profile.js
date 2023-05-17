import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout.js'
import UserContext from '../components/UserContext'

export default function Contact() {
  const { user, logout, loading } = useContext(UserContext)
  const router = useRouter()
  useEffect(() => {
    if (!(user || loading)) {
      router.push('/login')
    }
  }, [user, loading, router])
  const onClickLogout = function() {
    logout()
  }
  return (
    <Layout>
      <Head>
        <title>WebTech - user signedin</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      { !(user || loading) ?
        <p>Redirecting...</p>
        :
        <>
          <pre><code>{JSON.stringify(user, null, 2)}</code></pre>
        </>
      }
    </Layout>
  )
}