import Head from 'next/head'
import Layout from '../components/Layout.js'

export default function About() {
  return (
    <Layout>
      <Head>
        <title>WebTech - about us</title>
        <meta name="description" content="WebTech about us page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className='wt-title'>
        About the mama
      </h1>
      <p>
        This is a family restaurant that wants to share its mother's cooking! You will find the best dishes that a mother makes for her children and all her cooking secrets. 
        From fried chicken to vegan dishes, everything is there for you to have a good time. 
        Because after all what is better than a dish prepared by love of a loving mother!  
      </p>
    </Layout>
  )
}
