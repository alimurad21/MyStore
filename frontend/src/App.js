import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegistrationForm/RegisterForm';
import Home from './Pages/Home';
import PrivateRoute from './utils/PrivateRoute';
import AlertComponent from './components/AlertComponent/AlertComponet.js';  
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Pages/Layout.js';
import Contact from './Pages/Contact.js';
import NoPage from './Pages/NoPage.js';
import Blog from './Pages/Blog.js';
import About from './Pages/About.js';
import Product from './components/Product/Product.js';
import AddProduct from './components/Product/AddProduct.js';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState('');
  const [errorMessage, updateErrorMessage] = useState(null);

  return (
    <BrowserRouter>
      <div className="App m-0 p-0 ">
        <Header userLoggedIn={userLoggedIn} />
        
        <div className="container d-flex align-items-center flex-column">
          <Routes>
            {!userLoggedIn  ? '' : '' }
            <Route index element={<RegisterForm showError={updateErrorMessage}  />} />
            <Route path="/register" element={<RegisterForm showError={updateErrorMessage} setUserLoggedIn={setUserLoggedIn} />} />
            <Route path="/login" element={<LoginForm showError={updateErrorMessage} setUserLoggedIn={setUserLoggedIn} />} />
            
            <Route path='/' element={<Layout/>}>
            <Route  path="home" element={<PrivateRoute element={<Home />} />} />
            <Route path='product' element={<Product/>} />
            <Route path='product/add' element ={<AddProduct/>} />
            
            <Route path='contact' element={<PrivateRoute element={<Contact/>} />} />
            <Route path='blog' element={<Blog/>} />
            <Route path='about' element={<About/>} />
            </Route>
            <Route path='*' element={<NoPage/>} />
          </Routes>
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage} />
        </div>
        

      </div>
    </BrowserRouter>
    
  );
}

export default App;
