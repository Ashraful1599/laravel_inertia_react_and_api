import React, { useEffect,Suspense } from 'react';
import useSWR from 'swr'
import axios from 'axios';

import { Head, useForm } from '@inertiajs/inertia-react';
import { useState } from 'react';
import Swal from 'sweetalert2'
import { useNavigate, Link } from 'react-router-dom';
// import withReactContent from 'sweetalert2-react-content'




export default function Register() {

    const navigate = useNavigate()


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
        name: '',
        lname: '',
        email: '',
        password: '12345678',
        password_confirmation: '12345678',
        termsCondition: '',
        errors: [],
        processing: false
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

                    axios.post(`/api/register`, data).then(res =>{
                      
                     //   console.log(res);
                        
                        if(res.data.status ===200){
                         //  console.log(res);
    
                        //  Swal.fire({
                        //         title: 'Success!',
                        //         text: res.data,
                        //         icon: 'success',
                        //         confirmButtonText: 'Ok'
                        //     })
                        Toast.fire({
                            icon: 'success',
                            title: res.data.msg
                          })


                          localStorage.setItem('auth_token', res.data.token);
                          localStorage.setItem('auth_username', res.data.username);
                          localStorage.setItem('auth_email', res.data.email);
                        //   localStorage.setItem('role', res.data.role);
                          localStorage.setItem('image', res.data.image);

                           navigate('/admin/dashboard');

                        }
                        
                    }).catch(error => {
                       // console.log(error.response.data.errors)
                        setData({ ...data,errors: error.response.data.errors})
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
                        <div className="card-body p-5 text-center">
                            <div className="h3 fw-light mb-3">Create an Account</div>
                            <div className="small text-muted mb-2">Sign in using...</div>
              
                            <a className="btn btn-icon btn-facebook mx-1" href="#!"><i className="fab fa-facebook-f fa-fw fa-sm"></i></a>
                            <a className="btn btn-icon btn-github mx-1" href="#!"><i className="fab fa-github fa-fw fa-sm"></i></a>
                            <a className="btn btn-icon btn-google mx-1" href="#!"><i className="fab fa-google fa-fw fa-sm"></i></a>
                            <a className="btn btn-icon btn-twitter mx-1" href="#!"><i className="fab fa-twitter fa-fw fa-sm text-white"></i></a>
                        </div>
                        <hr className="my-0" />
                        <div className="card-body p-5">
                            <div className="text-center small text-muted mb-4">...or enter your information below.</div>
               
                            <form onSubmit={Submit}>
             
                                <div className="row gx-3">
                                    <div className="col-md-6">
             
                                        <div className="mb-3">
                                            <label className="text-gray-600 small" htmlFor="name">First name</label>
                                            <input className="form-control form-control-solid" type="text" name="name"
                        value={data.name}
                        onChange={onHandleChange}
                         />

                         

                                    {data.errors && <div className="invalid-feedback d-block">{data.errors.name}</div>} 
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                    
                                        <div className="mb-3">
                                            <label className="text-gray-600 small" htmlFor="lname">Last name</label>
                                            <input className="form-control form-control-solid" type="text" name="lname"
                        value={data.lname}
                        onChange={onHandleChange}
                         />
                                   {data.errors && <div className="invalid-feedback d-block">{data.errors.lname}</div>} 
                                        </div>
                                    </div>
                                </div>
                
                                <div className="mb-3">
                                    <label className="text-gray-600 small" htmlFor="email">Email address</label>
                                    <input className="form-control form-control-solid" type="text" name="email"
                        value={data.email}
                        onChange={onHandleChange}
                         />
                                    {data.errors &&<div className="invalid-feedback d-block"> {data.errors.email} </div>}
                                </div>
        
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
                                    <div className="form-check">
                                        <input className="form-check-input" id="checkTerms" type="checkbox" name='termsCondition'   value={data.termsCondition}
                        onChange={onHandleChange} />
                                        <label className="form-check-label" htmlFor="checkTerms">
                                            I accept the
                                            <a href="#!"> terms &amp; conditions</a>
                                            .
                                        </label>
                                        {data.errors && <div className="invalid-feedback d-block">{data.errors.termsCondition}</div>} 
                                    </div>
                                    <button className="btn btn-primary" type='submit' disabled={data.processing}>Create Account</button>
                                </div>
                            </form>
                        </div>
                        <hr className="my-0" />
                        <div className="card-body px-5 py-4">
                            <div className="small text-center">
                                Have an account?
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
