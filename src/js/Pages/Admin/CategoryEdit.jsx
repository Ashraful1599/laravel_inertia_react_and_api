import React from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import { useForm } from '@inertiajs/inertia-react'
import { useState,useEffect } from 'react'

export default function UserEdit() {

    let { id } = useParams();

    const [data, setData] = useState({
        'cat_name': '',
        'cat_des': '',
        'cat_slug': '',
})


    useEffect(() => {
        (async function () {
          await axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
              .get(`/api/admin/category/${id}/edit`)
              .then((res) => {
                setData({
                  'cat_name':  res.data.categories.cat_name,
                  'cat_slug':  res.data.categories.cat_slug,
                  'cat_des':  res.data.categories.cat_des,
                });

              })
              .catch((error) => {
                console.log(error);
              });
          });
        })();
      }, []);



    const navigate = useNavigate();


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
            axios.put(`/api/admin/category/${id}`, data)
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
                    
                    <div className="form-group">
                        <label className="col-sm-2 col-form-label">Category Slug</label>
                        <input onChange={inputHandle} value={data.cat_slug} name='cat_slug' type="name" className="form-control"  />
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
