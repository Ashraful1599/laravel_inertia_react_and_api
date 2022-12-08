import React from 'react'
import Profile from "../../assets/img/illustrations/profiles/profile-1.png"
import Swal from 'sweetalert2'
import axios from 'axios' 
import { useState,useEffect} from 'react'
import ProcessCurrentUser from '../Hook/useAuth'
import { Link,useOutletContext } from 'react-router-dom'
import { Formik, Field, Form } from 'formik';
//import * as Yup from 'yup';
import { useFormik } from 'formik'
import ContentLoader from "react-content-loader"
import FileUpload from "../Components/FileUpload"

export default function AccountProfile() {

      const [avatar,setAvatar,setUserName] = useOutletContext();
   // console.log(setAvatar)
 
        // const formik = useFormik({
        //   initialValues: {
        //     file: [],
        //   },
        //   onSubmit: values => {
        
        //     axios.get('/sanctum/csrf-cookie').then(response => {   
        //         console.log(values)
        //         axios.post(`/api/account-image-update`, formik.values).then(res =>{
        //             Toast.fire({
        //                 icon: 'success',
        //                 title: res.data.msg
        //               })   
        //         }).catch(error => {
        //             console.log(error)
        //          })
        //     })
        //   },
        // });


        const {currentUser} = ProcessCurrentUser();



;

    const [file, setFile] = useState();

    const fileHandle = (e) =>{
        e.preventDefault();
        setFile({
            'file' : e.target.files[0]
        })
    }

    const fileHandleSubmit = (e)=>{
        e.preventDefault();


        const data = new FormData() 
        data.append('file', file.file)

     //   console.log(data);

            axios.get('/sanctum/csrf-cookie').then(response => {   
                axios.post(`/api/account-image-update`, data).then(res =>{

                    setAvatar(res.data.image);

                    Toast.fire({
                        icon: 'success',
                        title: res.data.msg
                      })   
                }).catch(error => {
                    console.log(error)
                 })
            })
    }





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
  //  console.log(currentUser.email);
    const [state, setState] = useState({
        name: "",
        lname: "",
        email: "",
    })

const inputHandle = (e)=>{
    setData({
        [e.target.name] : e.target.value
    })
}

const formSubmit = (e)=>{
    e.preventDefault();
    axios.get('/sanctum/csrf-cookie').then(response => {   

        axios.post(`/api/changepassword`, data).then(res =>{
            Toast.fire({
                icon: 'success',
                title: res.data.msg
              })
            
        }).catch(error => {
            console.log(error)
         })

})}

const profileChangeHandle = (e)=>{
    e.preventDefault();
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}

const profileUpdate = (e) =>{
    e.preventDefault();


    axios.get('/sanctum/csrf-cookie').then(response => {   
        axios.post(`/api/account-update`, state).then(res =>{

            setState({
                ...state,
                email: currentUser.email,
                name: res.data.name,
                lname: res.data.lname,
            })
            setUserName(res.data.username);
            Toast.fire({
                icon: 'success',
                title: res.data.msg
              })   
        }).catch(error => {
            console.log(error)
         })
    })

}


useEffect(() => {
    setState({
        ...state,
        email: currentUser.email,
        name: currentUser.name,
        lname: currentUser.lname,
    })

}, [currentUser])

// const SignupSchema = Yup.object().shape({
//     file: Yup.required('Required'),
//   });


  return (
<main>
    <header className="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
        <div className="container-xl px-4">
            <div className="page-header-content">
                <div className="row align-items-center justify-content-between pt-3">
                    <div className="col-auto mb-3">
                        <h1 className="page-header-title">
                            <div className="page-header-icon"><i data-feather="user"></i></div>
                            Account Settings - Profile
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <div className="container-xl px-4 mt-4">

        <nav className="nav nav-borders">
            <Link className="nav-link active ms-0" href="#!">Profile</Link>
            <Link className="nav-link" href="#!">Billing</Link>
            <Link className="nav-link" href="#!">Security</Link>
            <Link className="nav-link" href="#!">Notifications</Link>
        </nav>
        <hr className="mt-0 mb-4" />
        <div className="row">
            <div className="col-xl-4">

                <div className="card mb-4 mb-xl-0">
                    <div className="card-header">Profile Picture</div>



<FileUpload />




                    <div className="card mt-4">
                    <div className="card-header">Change password</div>
                    <div className="card-body">

                        <form onSubmit={formSubmit}>
                            <div className="row gx-3 mb-3">
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor="inputFirstName">New password</label>
                                    <input name='password' className="form-control"  type="password" placeholder="New password" onChange={inputHandle} value={data.password} />
                                </div>

                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor="inputLastName">Confirm password</label>
                                    <input name='password_confirmation' className="form-control" id="inputLastName" type="password" placeholder="Confirm password" onChange={inputHandle} value={data.password_confirmation} />
                                </div>
                            </div>

                            <button className="btn btn-primary" type="submit">Update password</button>
                        </form>
                    </div>
            </div>





                </div>
            </div>
            <div className="col-xl-8">

                <div className="card mb-4">
                    <div className="card-header">Account Details</div>
                    <div className="card-body">
                        <form onSubmit={profileUpdate}>

        
                        <div className="row gx-3 mb-3">
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor="inputFirstName">First name</label>
                                    
                                    <input name='name' className="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" onChange={profileChangeHandle} value={state.name || ""}  />
                                </div>

                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor="inputLastName">Last name</label>
                                    <input name='lname' className="form-control" id="" type="text" placeholder="Enter your last name" onChange={profileChangeHandle} value={state.lname || ""}  />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
                                <input readOnly={true} name='email' className="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" onChange={profileChangeHandle} value={state.email || ""}  />
                            </div>
            
                            <button className="btn btn-primary" type="submit">Save changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
  )
}
