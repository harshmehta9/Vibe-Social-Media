import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from 'scenes/homePage';
import LoginPage from 'scenes/loginPage';
import ProfilePage from 'scenes/profilePage';
import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from 'theme';
// import Navbar from 'scenes/navbar';


function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(()=> createTheme(themeSettings(mode), [mode]));


  return (
    <div className='app'>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        {/* <Navbar/> */}
      <Routes>
        <Route path='/' element={<LoginPage/>}/> 
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/profile/:userid' element={<ProfilePage/>}/>
      </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App