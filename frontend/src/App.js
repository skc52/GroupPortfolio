
import './App.css';
import Header from "./component/layout/Header.js"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./component/Home/Home"
import Portfolio from './component/Portfolio/Portfolio';
import Signin from './component/Authentication/Signin';
import Profile from './component/Profile/Profile';
import Chat from './component/Chat/Chat.js'
import Notification from './component/Notification/Notification.js'
function App() {
  return (
   <div>
     
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route exact path = '/home' element = {<Home/>}/>
        <Route exact path = '/portfolio/me' element = {<Portfolio/>}/>
        <Route exact path = '/signin' element = {<Signin/>}/>
        <Route exact path = '/profile/me' element = {<Profile/>}/>
        <Route exact path = '/chat' element = {<Chat/>}/>
        <Route exact path = '/notification' element = {<Notification/>}/>
      </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App;
