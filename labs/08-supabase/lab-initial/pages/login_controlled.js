import {useState} from 'react'
import clsx from 'clsx'
import Head from 'next/head'
import Layout from '../components/Layout.js'

export default function LoginNative() {
  const [data, setData] = useState({})
  const [message, setMessage] = useState(null)
  const onSubmit = function(e){
    e.preventDefault()
    setMessage(
      <div>
        <h2 className="text-center mt-3">Form data</h2>
        <pre><code>{JSON.stringify(data, null, 2)}</code></pre>
      </div>
    )
  }
  return (
    <Layout>
      <Head>
        <title>WebTech - login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1 className='wt-title'>
          Login with native elements
        </h1>
        <form className="[&_span]:block [&_div]:py-3" onSubmit={onSubmit}>
          <div>
            <label>
              <span>Username</span>
              <input
                type="text"
                name="username"
                value={data.username}
                onChange={e => setData({...data, ...{username: e.target.value}})}
              />
            </label>
          </div>
          <div>
            <label>
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={e => setData({...data, ...{password: e.target.value}})}
              />
            </label>
          </div>
          <div>
            <button className="bg-slate-500 hover:bg-blue-500 text-white px-3 py-2 rounded">
              Login
            </button>
          </div>
        </form>
      </div>
      {message &&
        <div
          aria-label="Overlow below the drawer dialog"
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
          onClick={() => setMessage(null)}
          role="dialog"
        >
          <div
            aria-label="Alert pane"
            className={clsx(
              'max-h-[90vh] max-w-[95vw] overflow-auto p-4 prose',
              'bg-white',
            )}
          >
            {message}
          </div>
        </div>
      }
    </Layout>
  )
}
