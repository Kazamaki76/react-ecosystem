import React, {useState, createContext, useContext} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import axios from 'axios';
// AuthContext 

const AuthContext = createContext(); 

function AuthContextProvider(props){
  const [isAuth, setIsAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({name: "Guest"});

  const handleAuth = async () => {
    // login =< logout
    if(isAuth) {
      setIsAuth(false);
      setUser({name: "Guest"});
      return;
    }
    // logout => login
    try {
      setIsLoading(false);
      const response = await axios.get("https://jsonplaceholder.typicode.com/users")
      console.log(response.data);
      setUser(response.data)
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }

  return <AuthContext.Provider value={{ isAuth,handleAuth, isLoading, user}}> {props.children} </AuthContext.Provider>

}

//  const [isAuth, setIsAuth] = useState(false);
//  const handleAuth = () => setIsAuth(!isAuth);
function App () {
  const { isAuth, handleAuth, isLoading, user} = useContext(AuthContext);
  return ( 
  <div className='App'> 
    {isLoading ?<h1> Loading... </h1> :<h1> Welcome.. {!isAuth ? "Guest" : user?.name}  </h1>  }
    <button onClick={handleAuth} disabled={isLoading}>
        {!isAuth ? "login" : "logout"}
       </button>

    <h1>Abandon all hope there, who enter here</h1> 
    <button onClick={handleAuth}> {!isAuth ? "Login" : "Log out"} </button>
  </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
 <AuthContextProvider>  <App/> </AuthContextProvider>
 
)

/*
import React, { useState, createContext, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// สร้าง <AuthContext/> สำหรับ Provide isAuth,handleAuth ให้ <App/>

const AuthContext = createContext();

// function AuthContextProvider(props) {
//   return <AuthContext.Provider>{props.children}</AuthContext.Provider>;
// }

function AuthContextProvider({ children }) {
  const [isAuth, setIsAuth] = useState(true);
  const handleAuth = () => setIsAuth(!isAuth);

  // const shareObj = { isAuth, handleAuth };
  return <AuthContext.Provider value={{ isAuth, handleAuth }}>{children}</AuthContext.Provider>;
}

function App() {
  const { isAuth, handleAuth } = useContext(AuthContext);
  return (
    <div className='App'>
      <h1>Welcome.. {!isAuth ? 'Guest' : 'User'} </h1>
      <button onClick={handleAuth}>{!isAuth ? 'Login' : 'Logout'}</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
); 
*/
