import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout.js'
import { supabase } from '../api/supabase'
import { useContext } from 'react'
import UserContext from '../../components/UserContext'

export default function Article({
  article
}) {
  const { user } = useContext(UserContext)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState('');

  // Fetch comments when component mounts
  useEffect(() => {
    fetchComments()
  }, [])

  async function fetchComments() {
    let { data, error } = await supabase
      .from('comments')
      .select()
      .eq('article_id', article.id)
    if (error) console.error('Error fetching comments:', error)
    else setComments(data)
  }

  async function submitComment() {
    if (newComment === '') {
      console.log('Cannot submit empty comment')
      return
    }
    const { data, error } = await supabase
      .from('comments')
      .insert({
        message: newComment,
        user_id: user.id,
        article_id: article.id
      })

    if (error) console.error('Error submitting comment:', error)
    else {
      fetchComments()
      // Clear the new comment field
      setNewComment('')
    }
  }

  async function saveComment(id) {
    const { error } = await supabase
      .from('comments')
      .update({
        message: editingCommentText,
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating comment:', error);
    } else {
      fetchComments();
      setEditingCommentId(null);
      setEditingCommentText('');
    }
  }

  function editComment(id, text) {
    setEditingCommentId(id);
    setEditingCommentText(text);
  }

  function cancelEdit() {
    setEditingCommentId(null);
    setEditingCommentText('');
  }
  async function deleteComment(id) {
    const { data, error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id)
    if (error) console.error('Error deleting comment:', error)
    else {
      // Remove deleted comment from local state
      setComments(oldComments => oldComments.filter(comment => comment.id !== id))
    }
  }
  

  return (
  <Layout>
    <Head>
      <title>WebTech - {article.title}</title>
      <meta name="description" content="Mama No bento  dishes page" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <h1 className='wt-title'>
      {article.title}
    </h1>
    <img src={article.image_url} alt={article.title} className="my-5" />
    <p>
      {article.message}
    </p>
    <div className='comments-section'>
      { user && 
      <div>
        <h2>Add a comment:</h2>
        <textarea value={newComment} onChange={e => setNewComment(e.target.value)} />
        <button onClick={submitComment}>Submit</button>
      </div>}
      {comments.map(comment => (
        <div key={comment.id} className='comment'>
          <h3>{comment.user_id}</h3>
          {editingCommentId === comment.id ? (
            <div>
              <textarea value={editingCommentText} onChange={e => setEditingCommentText(e.target.value)} />
              <button onClick={() => saveComment(comment.id)}>Save</button>
              <button onClick={cancelEdit}>Cancel</button>
            </div>
          ) : (
            <div>
              <p>{comment.message}</p>
              
              {user && user.id ===              comment.user_id && (
                 <div>
                 <button style={{ marginRight: '10px' }} onClick={() => editComment(comment.id, comment.message)}>Edit</button>
                 <button onClick={() => deleteComment(comment.id)}>Delete</button>
               </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  </Layout>
)
}

export async function getStaticProps(ctx) {
  let article = {}
  let { data, error, status } = await supabase
    .from('articles')
    .select(`id, slug, message, title, image_url`)
    .eq('slug', ctx.params.slug)
    .single()
  if (!error) article = data // handle errors
  return {
    props: {
      article: article
    }
  };
}

export async function getStaticPaths(ctx) {
  let articles = []
  let { data, error, status } = await supabase
    .from('articles')
    .select(`slug`)
  if (!error) articles = data // handle errors
  return {
    paths: articles.map( article => `/articles/${article.slug}`),
    fallback: false
  };
}
