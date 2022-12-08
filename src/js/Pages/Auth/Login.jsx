import React, { useEffect } from 'react';
import { Head, useForm } from '@inertiajs/inertia-react';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {

    const navigate  = useNavigate();


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



    const [data, setData ] = useState({
        email: 'smashrafulcse@gmail.com',
        password: '12345678',
        remember: '',
        errors: [],
        processing: false
    });


    const onHandleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.type === 'checkbox' ? [event.target.checked] : event.target.value
        });
    };

    const submit = (e) => {
        e.preventDefault();

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('api/login', data).then(res=>{

        //        console.log(res);
                Toast.fire({
                    icon: 'success',
                    title: res.data.msg
                  })


                  localStorage.setItem('auth_token', res.data.token);
                  localStorage.setItem('auth_username', res.data.username);
                  localStorage.setItem('auth_email', res.data.email);
                  localStorage.setItem('role', res.data.role);
                  localStorage.setItem('image', res.data.image);

                   navigate('/admin/dashboard');

                 //  console.log(localStorage.getItem("auth_token"));

            }).catch(error =>{

                setData({ ...data,errors: error.response.data.errors})
            })
        });
    };

    useEffect(()=>{

        document.querySelector("body").classList.add("bg-primary");

    }, [])


    useEffect(()=>{

        return () =>{
            document.querySelector("body").classList.remove("bg-primary");
        }
        

    }, [])

    return (






            <div id="layoutAuthentication">
<div id="layoutAuthentication_content">
    <main>
        <div className="container-xl px-4">
            <div className="row justify-content-center">
                <div className="col-xl-5 col-lg-6 col-md-8 col-sm-11">

                    <div className="card my-5">
                        <div className="card-body p-5 text-center">
                            <div className="h3 fw-light mb-3">Sign In</div>
          
                            <a className="btn btn-icon btn-facebook mx-1" href="#!"><i className="fab fa-facebook-f fa-fw fa-sm"></i></a>
                            <a className="btn btn-icon btn-github mx-1" href="#!"><i className="fab fa-github fa-fw fa-sm"></i></a>
                            <a className="btn btn-icon btn-google mx-1" href="#!"><i className="fab fa-google fa-fw fa-sm"></i></a>
                            <a className="btn btn-icon btn-twitter mx-1" href="#!"><i className="fab fa-twitter fa-fw fa-sm text-white"></i></a>
                        </div>
                        <hr className="my-0" />
                        <div className="card-body p-5">
      
                        <form onSubmit={submit}>
       
                                <div className="mb-3">
                                    <label className="text-gray-600 small" htmlFor="emailExample">Email address</label>
                                    <input className="form-control form-control-solid" type="text"                      name="email"
                        value={data.email}
                        autoComplete="username"
                        onChange={onHandleChange} />
                                   {data.errors &&<div className="invalid-feedback d-block">{data.errors.email} </div>}
                                </div>

                                <div className="mb-3">
                                    <label className="text-gray-600 small" htmlFor="passwordExample">Password</label>
                                    <input className="form-control form-control-solid"                         type="password"
                        name="password"
                        value={data.password}
                        autoComplete="current-password" 
                        onChange={onHandleChange} />
                             
                             {data.errors &&<div className="invalid-feedback d-block">{data.errors.password} </div>}
                                </div>
     
                               <div className="mb-3"><Link to={"/forgot-password"}>Forgot your password?</Link></div> 
         
                                <div className="d-flex align-items-center justify-content-between mb-0">
                                    <div className="form-check">
                                        <input className="form-check-input" id="checkRememberPassword" type="checkbox" name="remember" value={data.remember} onChange={onHandleChange} />
                                        <label className="form-check-label" htmlFor="checkRememberPassword">Remember password</label>
                                    </div>
                                    <button className="btn btn-primary" type='submit' disabled={data.processing}>Login</button>
                                </div>
                            </form>
                        </div>
                        <hr className="my-0" />
                        <div className="card-body px-5 py-4">
                            <div className="small text-center">
                                New user?
                                 <Link to="/register"> Create an account!</Link> 
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
