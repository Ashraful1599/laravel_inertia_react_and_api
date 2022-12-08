import React from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import { useForm } from '@inertiajs/inertia-react'
import { useState,useEffect } from 'react'

export default function TagEdit() {

    let { id } = useParams();

    const [data, setData] = useState({
        'tag_name': '',
        'tag_des': '',
        'tag_slug': '',
})


    useEffect(() => {
        (async function () {
          await axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
              .get(`/api/admin/tag/${id}/edit`)
              .then((res) => {
                setData({
                  'tag_name':  res.data.tags.tag_name,
                  'tag_slug':  res.data.tags.tag_slug,
                  'tag_des':  res.data.tags.tag_des,
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
            axios.put(`/api/admin/tag/${id}`, data)
            .then((res) => {
                navigate("/admin/tag");
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
                <div className="card-header">Tag Information</div>
                <div className="card-body">
                <form onSubmit={submitHandle}>
                    <div className="form-group">
                        <label className="col-sm-2 col-form-label">Tag name</label>
                        <input onChange={inputHandle} value={data.tag_name} name='tag_name' type="name" className="form-control"  />
                    </div>                  
                    
                    <div className="form-group">
                        <label className="col-sm-2 col-form-label">Tag Slug</label>
                        <input onChange={inputHandle} value={data.tag_slug} name='tag_slug' type="name" className="form-control"  />
                    </div>  

                    <div className="form-group mb-3">
                    <label className="col-sm-2 col-form-label">Tag description</label>
                        <input onChange={inputHandle} value={data.tag_des} name='tag_des' type="lname" className="form-control"  />
                    </div>                    

                    <button  type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>

  
  ) 
}
