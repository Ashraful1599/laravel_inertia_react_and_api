import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import loading from '../../../assets/img/loading.gif'

export default function ForgotPassword() {
    const [data, setData ] = useState({
        email: '',
        loading: false,
    });
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


    const onHandleChange = (event) => {
        setData({[event.target.name] : event.target.value});
    };

    const submit = (e) => {
        e.preventDefault();
        setData({loading: true})

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('api/forgot-password', data).then(res=>{

                setData({loading: false})
        //        console.log(res);
                Toast.fire({
                    icon: 'success',
                    title: res.data
                  })

                   //navigate('/admin/dashboard');

                 //  console.log(localStorage.getItem("auth_token"));

            }).catch(error =>{

                //setData({ ...data,errors: error.response.data.errors})
                console.log(error);
            })
        });
        
    };
    useEffect(()=>{

        document.querySelector("body").classList.add("bg-primary");

    }, [])

    useEffect(()=>{


    },[])


    return (

<div id="layoutAuthentication">
<div id="layoutAuthentication_content">
    <main>
        <div className="container-xl px-4">
            <div className="row justify-content-center">
                <div className="col-xl-5 col-lg-6 col-md-8 col-sm-11">

                    <div className="card my-5">
                        <div className="card-body p-5 text-center">
                            <div className="h3 fw-light">Forgot Password</div>
                        </div>
                        <hr className="my-0" />
                        <div className="card-body p-5">
      
                        <form onSubmit={submit}>
       
                                <div className="mb-3">
                                    <label className="text-gray-600 small" htmlFor="emailExample">Email address</label>
                                    <input className="form-control form-control-solid" type="text"  name="email"
                        value={data.email}
                        onChange={onHandleChange} />
                           
                                </div>

     
   
         
                                <div className="d-flex align-items-center justify-content-between mb-0">
                                    <button className="btn btn-primary" type='submit'> Email Password Reset Link</button>
                                </div>

                             {data.loading && <img className='loading' src={loading} alt="" />}   

                            </form>
                        </div>
                        <hr className="my-0" />
                        <div className="card-body px-5 py-4">
                            <div className="small text-center">
                                <Link to={'/login'}> Login</Link>
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
