import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './routes';
import GlobalStyle from './styles/global';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
    <GlobalStyle/>
    <ToastContainer autoclose={3000}/>
    <Routes/>
    </>
  );
}

export default App;
