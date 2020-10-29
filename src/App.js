import React , { useEffect}from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import {useImmerReducer } from 'use-immer'
import Axios from 'axios'
//my componant
import Header from './component/Header'
import Home from './component/Home'
import HomeGuest from './component/HomeGuest'
import Footer from './component/Footer'
import About from './component/About'
import Terms from './component/Terms'
import CreatePsot from './component/CreatePost' 
import ViewSinglePost from './component/ViewSinglepost'
import FlashMassges from './component/FlashMassages'
import StateContext from "./StateContext"
import DispatchContext from './DispatchContext'
import Profile from './component/Profile'
import NotFound from './component/NotFound'
import EditPost from './component/EditPost'
Axios.defaults.baseURL="http://localhost:8080"

 
function App() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("complexappToken")),
    flashMessages:[],
    user:{
      token: localStorage.getItem("complexappToken"),
      username: localStorage.getItem("complexappUsername"),
      avatar: localStorage.getItem("complexappAvatar")

    }
  }
  function ourReducer(draft , action){
    switch(action.type){
      case "login":
        draft.loggedIn=true
        draft.user=action.data
        return
      case "logout":
        draft.loggedIn=false
        return
      case "flashMessages":
        draft.flashMessages.push(action.value)
        return 
    }
  }

  const[state , dispatch]= useImmerReducer(ourReducer , initialState)
 
  useEffect(() =>{
    if(state.loggedIn){
      localStorage.setItem("complexappToken",state.user.token)
      localStorage.setItem("complexappUsername",state.user.username)
      localStorage.setItem("complexappAvatar",state.user.avatar)

    }else{
      localStorage.removeItem("complexappToken")
      localStorage.removeItem("complexappUsername")
      localStorage.removeItem("complexappAvatar")
    }
  },[state.loggedIn])
  

  return (
    <StateContext.Provider value={ state }>
      <DispatchContext.Provider value={dispatch}>
    <BrowserRouter>
    <FlashMassges messages={state.flashMessages}/>
    <Header />
    <Switch>
      <Route path="/profile/:username">
        <Profile />
      </Route>
      <Route path="/" exact>
        {state.loggedIn ? <Home /> : <HomeGuest />}
      </Route>
      <Route path="/post/:id" exact>
        <ViewSinglePost />
      </Route>
      <Route path="/post/:id/edit" exact>
        <EditPost />
      </Route>
       <Route path="/create-post">
         <CreatePsot />
       </Route>
      <Route path ="/about-us">
        <About/>
      </Route>
      <Route path="/terms">
        <Terms/>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
    <Footer />
    
    </BrowserRouter>
    </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
