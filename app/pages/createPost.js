// createPost.js
import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from './api/supabase'
import Layout from '../components/Layout.js'

export default function CreatePost() {
  const [slug, setSlug] = useState('')
  const [title, setTitle] = useState('')
  const [message, setContent] = useState('')
  const router = useRouter()

  async function submitPost(e) {
    e.preventDefault()
    const { data, error } = await supabase
      .from('posts')
      .insert([
        { slug: slug, title: title, message: message }
      ])
    if (error) console.error('Error creating post:', error)
    else {
        // Reset form fields
        setSlug('')
        setTitle('')
        setContent('')
        // Redirect to posts page
        router.push('/posts')
      }
  }

  return (
    <Layout>
      <h1>Create a New Post</h1>
      <form onSubmit={submitPost}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Slug:
          <input type="text" value={slug} onChange={e => setSlug(e.target.value)} required />
        </label>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Title:
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </label>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Content:
          <textarea value={message} onChange={e => setContent(e.target.value)} required />
        </label>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button type="submit">Post</button>
          <button type="button" onClick={() => router.push('/posts')}>Cancel</button>
        </div>
      </form>
    </Layout>
  )
}
