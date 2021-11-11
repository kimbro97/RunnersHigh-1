import React, { useEffect, useState } from 'react'
import Comment from '../components/Comment'
import '../stylesheet/detailpost.css'
import Map from '../components/Map'
import CommentInput from '../components/CommentInput'
import axios from 'axios'
import { setPost } from '../redux/action/index'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
function DetailPost ({ post, userinfo , isLogin , OpenModal}) {
  const [comments, setComments] = useState([])
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    window.scrollTo(0, 0)
    getComments()
  }, [])

  const getComments = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/posts/comments/${post.id}`)
      .then((data) => {
        // if (data.data.comments.length !== 0) {
        setComments(data.data.comments)
        console.log(data)
        // }
      })
  }
  const deletePost = () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/posts/${post.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.accessToken}`,
        'Content-Type': 'application/json'

      }
    })
      .then((data) => history.push('/main'))
  }

  return (
    <div className='detail_container'>
        <h1 className='detail_title'>{post.title}</h1>
      <div className='detail_content'>
        <img src={post.thumbnail_url} className='detail_image ' />
        <div className='detail_map'>
          <Map getLatitude={post.latitude} getLongitude={post.longitude} />
        </div>
      <div className='detail_span'>
        <span>{post.user.nickname}</span>
        <span>{post.createdAt}</span>
      </div>
      <div className='button_button'>
        {post.userId === userinfo.id
          ? <div className='btn_btn'><div onClick={() => history.push('/editpost')}>수정</div>
          <div onClick={deletePost}>삭제</div></div>
          : null}
          </div>
        <div className='detail_text'>{post.text}</div>
     
      </div>
      <CommentInput getComments={getComments} post={post} userinfo={userinfo} isLogin={isLogin}  OpenModal={OpenModal} />
      {comments.length === 0
        ? null
        : comments.map((comment) => <Comment comment={comment} key={comment.id} />)}
        
    </div>
  )
}

export default DetailPost
