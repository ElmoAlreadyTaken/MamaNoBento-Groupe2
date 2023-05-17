import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout.js'
import { supabase } from '../api/supabase'
import { useContext } from 'react'
import UserContext from '../../components/UserContext'

export default function Post({ post }) {
    const router = useRouter()
    const { user } = useContext(UserContext)
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingCommentText, setEditingCommentText] = useState('');
    const [postContent, setPostContent] = useState(post.message);
    const [isEditingPost, setIsEditingPost] = useState(false);
    const [editingPostText, setEditingPostText] = useState(post.message);
  
    // Fetch comments when component mounts
    useEffect(() => {
      fetchComments()
    }, [])
    function returnPost()
    {
         router.push('/posts')
    }
    async function editPost() {
        const { error } = await supabase
          .from('posts')
          .update({ message: editingPostText })
          .eq('id', post.id)
    
        if (error) {
          console.error('Error updating post:', error);
        } else {
          setPostContent(editingPostText);  // Update the post content
          setIsEditingPost(false);
        }
      }
    
    
      async function deletePost(id) {
        // First, delete all comments associated with the post
        const { error: deleteCommentsError } = await supabase
            .from('comments')
            .delete()
            .eq('post_id', id)
    
        if (deleteCommentsError) {
            console.error('Error deleting comments:', deleteCommentsError)
            return
        }
    
        // Then, delete the post itself
        const { error: deletePostError } = await supabase
            .from('posts')
            .delete()
            .eq('id', id)
    
        if (deletePostError) {
            console.error('Error deleting post:', deletePostError)
        } else {
            // Redirect to posts page after deleting
            router.push('/posts')
        }
    }
    
      
    async function fetchComments() {
      let { data, error } = await supabase
        .from('comments')
        .select()
        .eq('post_id', post.id)
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
        post_id: post.id
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
      <title>WebTech - {post.title}</title>
      <meta name="description" content="Mama No bento  dishes page" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <h1 className='wt-title'>
      {post.title}
    </h1>
    {isEditingPost ? (
      <div>
        <textarea value={editingPostText} onChange={e => setEditingPostText(e.target.value)} />
        <button style={{ marginRight: '10px' }}onClick={editPost}>Save</button>
        <button onClick={() => setIsEditingPost(false)}>Cancel</button>
      </div>
    ) : (
      <p>
        {postContent}
      </p>
    )}
    <div>
        {!isEditingPost && <button style={{ marginRight: '10px' }}onClick={() => setIsEditingPost(true)}>Edit Post</button>}
        <button onClick={() => deletePost(post.id)}>Delete Post</button>
    </div>
    <div>
    <button onClick={() => returnPost()}>return</button>
    </div>
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
              <p>{new Date(comment.created_at).toLocaleString()}</p>
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
    let post = {}
    let { data, error, status } = await supabase
      .from('posts')
      .select(`id, slug, message, title, created_at`)
      .eq('slug', ctx.params.slug)
      .single()
    if (!error) post = data // handle errors
    return {
      props: {
        post: post
      }
    };
  }
  
  export async function getStaticPaths(ctx) {
    let posts = []
    let { data, error, status } = await supabase
      .from('posts')
      .select(`slug`)
    if (!error) posts = data // handle errors
    return {
      paths: posts.map( post => `/posts/${post.slug}`),
      fallback: false
    };
  }