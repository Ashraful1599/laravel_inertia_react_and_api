import React, { useEffect,Suspense } from 'react';
import useSWR from 'swr'
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { Head, useForm } from '@inertiajs/inertia-react';
import { useState } from 'react';
import Swal from 'sweetalert2'
import { useNavigate, Link } from 'react-router-dom';
// import withReactContent from 'sweetalert2-react-content'




export default function Register() {

    const navigate = useNavigate()

    const {mailToken} = useParams();
    // const MySwal = withReactContent(Swal)
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })



    const [data, setData] = useState({
        password: '12345678',
        password_confirmation: '12345678',
    })

    useEffect(() => {

    }, []);

    const onHandleChange = (event) => {
        setData({
            ...data,
            [event.target.name] : event.target.type === 'checkbox' ? event.target.checked :event.target.value
        });
    };

   
    const Submit = (e) => {
        e.preventDefault();

        // post(route('register'));

        // const fetcher = async (url) => {
        //     return await axios.post(url, data).then( res => res.data);
        // }
        // const {res, error} = useSWR('http://127.0.0.1:8000/register',fetcher, { suspense: true})


            
            axios.get('/sanctum/csrf-cookie').then(response => {   

                    axios.post(`api/reset-password/${mailToken}`, data).then(res =>{
                      
                     //   console.log(res);
                        if(res.data.error){
                            Toast.fire({
                                icon: 'error',
                                title: res.data.error
                              })
                        }else{
                            Toast.fire({
                                icon: 'success',
                                title: res.data.message
                              })
                              navigate('/login');
                        }
                        

                        
                        
                    }).catch(error => {
                        console.log(error)
                     })
     
            });


       

    };

    useEffect(()=>{

        document.querySelector("body").classList.add("bg-primary");

    }, [])



    return (


 
            <div id="layoutAuthentication">
<div id="layoutAuthentication_content">
    <main>
        <div className="container-xl px-4">
            <div className="row justify-content-center">
                <div className="col-xl-8 col-lg-9">
           
                    <div className="card my-5">
                        <div className="card-body p-5">
     
               
                            <form onSubmit={Submit}>
             
                         
                
         
        
                                <div className="row gx-3">
                                    <div className="col-md-6">
  
                                        <div className="mb-3">
                                            <label className="text-gray-600 small" htmlFor="passwordExample">Password</label>
                                            <input className="form-control form-control-solid" type="password" name="password"
                        value={data.password}
                        onChange={onHandleChange}
                         />
                          
                                    {data.errors &&<div className="invalid-feedback d-block"> {data.errors.password} </div>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
         
                                        <div className="mb-3">
                                            <label className="text-gray-600 small" htmlFor="confirmPasswordExample">Confirm Password</label>
                                            <input className="form-control form-control-solid" type="password" name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={onHandleChange}
                         />
                       
                                    {data.errors &&<div className="invalid-feedback d-block"> {data.errors.password_confirmation} </div>}
                                        </div>
                                    </div>
                                </div>
            
                                <div className="d-flex align-items-center justify-content-between">
                                    <button className="btn btn-primary" type='submit'>Reset password</button>
                                </div>
                            </form>
                        </div>
                        <hr className="my-0" />
                        <div className="card-body px-5 py-4">
                            <div className="small text-center">
                               <Link to={'/login'}> Sign in!</Link> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>
<div id="layoutAuthentication_footer">
    <footer className="footer-admin mt-auto footer-dark">
        <div className="container-xl px-4">
            <div className="row">
                <div className="col-md-6 small">Copyright &copy; Your Website 2021</div>
                <div className="col-md-6 text-md-end small">
                    <a href="#!">Privacy Policy</a>
                    &middot;
                    <a href="#!">Terms &amp; Conditions</a>
                </div>
            </div>
        </div>
    </footer>
</div>
</div>

      
    );
}

