import React, {useState, createContext, useContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// context
//  1. createContext [provider,consumer] => ชื่อ Context

const ThemeContext =  createContext();
// console.log(ThemeContext);

// A1  create HOC : higher order component (provider)
//  HOC คือ function ที่รับ componentเข้าไป และ return componentใหม่ออกมา 
// function ThemeContextProvider (props) {
//   console.log(props);
//   return <div> Hello {props.children} </div>;
// }
/*
#### A2. Share Data & Logic ผ่าร arttribute value
==> Data (state,boolean,string,object,array etc.)
==> Logic (Fn ที่ใช้ handle ต่างๆ)
*/

// Data : isDarkMode,stylesOBj
// Logic : setIsDarkMode,handleToggleTheme
function ThemeContextProvider (props) {
    const[isDarkMode,setIsDarkMode] = useState(true);

  const style0bj = {
    backgroundColor: isDarkMode?  "black" : "white",
    color: isDarkMode ?  "white": "black",
  }; 

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }
  const share0bj = {style0bj , handleToggleTheme}
  return <ThemeContext.Provider value={share0bj} > {props.children} </ThemeContext.Provider>
}


//  A3 นำ provider ไปครอบ children
//  <ThemeContextProvider>  
{/* <App/> */}
// </ThemeContextProvider>

/*
 B1 : @Chidren component ดึงค่า shared object ผ่านตัว useContext 
 syntax : useContext(ContextName)
 ex.
 const sjared0bj = useContext(ThemeContext)

*/

// UI : component
function App() {
  const s = useContext(ThemeContext);
  console.log(s);


  return <div className='App' style={s.style0bj}>
    <h1> Theme App</h1>
     <button onClick={s.handleToggleTheme}> Toggle Theme </button>  
     </div>
}



ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeContextProvider>
    <App/>

  </ThemeContextProvider>
  
)
