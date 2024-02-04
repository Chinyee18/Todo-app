
import React, { useState } from "react";
import './App.css';

import Todo from "./Components/Todo"
import Sun from './Assets/images/icon-sun.svg';
import Moon from './Assets/images/icon-moon.svg';
// import bgDesktopDark from "./Assets/images/bg-desktop-dark.jpg"
// import bgDesktopLight from "./Assets/images/bg-desktop-light.jpg"
// import bgMobileDark from "./Assets/images/bg-mobile-dark.jpg"
// import bgMobileLight from "./Assets/images/bg-mobile-light.jpg"

function App() {
  
  // state to manage the dark mode
  const [darkMode, setDarkMode] = useState(true);

  // function to toggle the dark mode as true or false
  const toggleDarkTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode? 'dark':'light'}`}>
      <div className='container'>
        {/* header */}
        <div className='header'>
          <h1>TODO</h1>
          <div onClick={toggleDarkTheme}>{darkMode ? <img src={Sun} className='icon point'/> : <img src={Moon} className='icon point'/>}</div>
        </div>
        <Todo mode={darkMode}/>
        <div className="attribution">
          Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
          Coded by <a href="https://github.com/Chinyee18">Chin Yee</a>.
        </div>
      </div>
    </div>
  );
}

export default App;
