import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Dashboard from './js/Layouts/admin/Dashboard';
import Register from './js/Pages/Auth/Register';
import Login from './js/Pages/Auth/Login';
import axios from 'axios';
import PrivateOutlet from './js/Components/admin/auth/PrivateOutlet';
import AuthCheckPrivateOutlet from './js/Components/admin/auth/AuthCheckPrivateOutlet';
import ForgotPassword from './js/Pages/Auth/ForgotPassword';
import ResetPasswordToken from './js/Pages/Auth/ResetPasswordToken.jsx';
import Error from "./js/Pages/Auth/Error.jsx";
import AccountProfile from './js/Pages/AccountProfile.jsx';
import Main from "./js/Layouts/admin/Main.jsx"
import Welcome from './js/Pages/Welcome';

import FileCreate from './js/Pages/Admin/FileCreate'
import FileIndex from './js/Pages/Admin/FileIndex'
import FileEdit from './js/Pages/Admin/FileEdit'

import CategoryEdit from './js/Pages/Admin/CategoryEdit'
import CategoryIndex from './js/Pages/Admin/CategoryIndex'
import CategoryCreate from './js/Pages/Admin/CategoryCreate'

import TagEdit from './js/Pages/Admin/TagEdit'
import TagIndex from './js/Pages/Admin/TagIndex'
import TagCreate from './js/Pages/Admin/TagCreate'

import ProductEdit from './js/Pages/Admin/ProductEdit'
import ProductIndex from './js/Pages/Admin/ProductIndex'
import ProductCreate from './js/Pages/Admin/ProductCreate'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
axios.defaults.headers.post['Accept'] = "application/json";
axios.defaults.headers.post['Content-Type'] = "application/json";
axios.interceptors.request.use(function(config){
  const authToken = localStorage.getItem('auth_token');
  config.headers.Authorization = authToken? `Bearer ${authToken}`: '';
  return config;
});



function App() {

  const authToken = localStorage.getItem('auth_token');


  return (
    <div className="App">
        <Router>
            <Routes>


                <Route index element={ <Welcome />} />

                 <Route path='/*' element={<PrivateOutlet />}>
                  <Route path='admin' element={<Dashboard />}>
                    <Route index element={ <Navigate to="dashboard" replace /> } />
                    <Route path='dashboard' element={<Main />} />
                    <Route path='account-profile' element={<AccountProfile />} />
                    <Route path='file' element={<FileIndex />} />
                    <Route path='file/create' element={<FileCreate />} />
                    <Route path='file/:id/edit' element={<FileEdit />} />                    
                    
                    <Route path='category' element={<CategoryIndex />} />
                    <Route path='category/create' element={<CategoryCreate />} />
                    <Route path='category/:id/edit' element={<CategoryEdit />} />                    
                    
                    <Route path='tag' element={<TagIndex />} />
                    <Route path='tag/create' element={<TagCreate />} />
                    <Route path='tag/:id/edit' element={<TagEdit />} />     
                                   
                    <Route path='product' element={<ProductIndex />} />
                    <Route path='product/create' element={<ProductCreate />} />
                    <Route path='product/:id/edit' element={<ProductEdit />} />

                  </Route>
                </Route> 
                <Route path='/*' element={<AuthCheckPrivateOutlet />}>
                  <Route path='login' element={ <Login />} />
                  <Route path='forgot-password' element={ <ForgotPassword />} />
                  <Route path="forgot-password/reset/:mailToken" element={<ResetPasswordToken />} />
                  <Route path='register' element={ <Register />} />
                </Route>
                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
