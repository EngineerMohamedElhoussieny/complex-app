import React, { useState , useContext} from "react"
import Page from './Page'
import Axios from 'axios'
import {withRouter} from 'react-router-dom'
import DispatchContext from '../DispatchContext'
import StateContext from '../StateContext'
 

function CreatePost(props) {
    const [title,setTilte]=useState()
    const [body,setBody]=useState()
    const appDispatch= useContext(DispatchContext)
    const appstate= useContext(StateContext)

     async function handleSubmit(e){
        e.preventDefault()
        try {
           const response = await Axios.post('/create-post',{title,body,token:appstate.user.token})
            // redirect t onew post url
            appDispatch({type:"flashMessages" , value:"congates , you create post" })
            props.history.push(`/post/${response.data}`)
            console.log("new post ");
        } catch (e) {
            console.log("there was  a problem");
        }
    }
  return (
    <Page title="create new post page">
<form onSubmit={handleSubmit}>
        <div className ="form-group">
          <label htmlFor="post-title" className ="text-muted mb-1">
            <small>Title</small>
          </label>
          <input onChange={e => setTilte(e.target.value)} autoFocus name="title" id="post-title" className ="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
        </div>

        <div className ="form-group">
          <label htmlFor="post-body" className ="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea onChange={e => setBody(e.target.value)} name="body" id="post-body" className ="body-content tall-textarea form-control" type="text"></textarea>
        </div>

        <button className ="btn btn-primary">Save New Post</button>
      </form>
    </Page>
  )
}

export default  withRouter(CreatePost)