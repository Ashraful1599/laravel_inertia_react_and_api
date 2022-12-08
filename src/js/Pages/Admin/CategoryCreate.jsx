import React from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useForm } from '@inertiajs/inertia-react'
import { useState } from 'react'

export default function UserEdit() {

    const navigate = useNavigate();

    const [data, setData] = useState({
            'cat_name': '',
            'cat_des': '',
    })
    const inputHandle = (e) =>{
        e.preventDefault();
        setData({
            ...data,
                [e.target.name]: e.target.value
            })
    }
    const submitHandle = (e) =>{
        e.preventDefault();

        axios.get("/sanctum/csrf-cookie").then((res) => {
            axios.post(`/api/admin/category/create`, data)
            .then((res) => {
                navigate("/admin/category");
              })
              .catch((error) => {
                console.log(error);
              });
          });

        
    }

  // console.log(data);
  // console.log(errors);

  return (

        
        <div className="container-xl px-4">
            <div className="card mb-4">
                <div className="card-header">Category Information</div>
                <div className="card-body">
                <form onSubmit={submitHandle}>
                    <div className="form-group">
                    <label className="col-sm-2 col-form-label">Category name</label>
                        <input onChange={inputHandle} value={data.cat_name} name='cat_name' type="name" className="form-control"  />
                    </div>                    
                    <div className="form-group mb-3">
                    <label className="col-sm-2 col-form-label">Category description</label>
                        <input onChange={inputHandle} value={data.cat_des} name='cat_des' type="lname" className="form-control"  />
                    </div>                    

                    <button  type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>

  
  ) 
}
