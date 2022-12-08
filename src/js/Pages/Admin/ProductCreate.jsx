import React, {useEffect, useRef, useState} from 'react'
import axios from 'axios';
import { useForm } from '@inertiajs/inertia-react'
//import ReactRichEditor from 'react-rich-text-editor'
//import { Editor } from "react-draft-wysiwyg";
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from 'react-router-dom';


export default function ProductCreate() {

const navigate = useNavigate();

    useEffect(() => {
        (async function () {
          await axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
              .get(`/api/admin/product/create`)
              .then((res) => {
                setCategories(res.data.categories)
                setTags(res.data.tags)
                console.log(res.data.products)
              })
              .catch((error) => {
                console.log(error);
              });
          });
        })();
      }, []);


    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

  

    const [data, setData] = useState({
            'name': '',
            'price': '',
            'cat_id': '',
            'tag_id': '',
            'image': null,
            'status': '1',
            'fetured': '0',
            'description': '',
    });
    const inputHandle = (e) =>{
        e.preventDefault();
        setData({
            ...data,
            [e.target.name]: e.target.value 
        })
    }
    const inputFileHandle = (e) =>{
        e.preventDefault();
          setData({...data,'image': e.target.files[0] });
      }

    //   if (editorRef.current) {
    //     setData('description', editorRef.current.getContent())
    //   }

    const textareaHandle = (content) =>{
        setData({...data,'description': content })
      // console.log(content)
    }


    const formData = new FormData();
    formData.append('name',data.name);
   // formData.append('slug',data.slug);
    formData.append('description',data.description);
    formData.append('cat_id',data.cat_id);
    formData.append('tag_id',data.tag_id);
    formData.append('status',data.status);
    formData.append('fetured',data.fetured);
    formData.append('price',data.price);
    formData.append('image',data.image);


    const submitHandle = (e) =>{
        e.preventDefault();

        axios.get("/sanctum/csrf-cookie").then((res) => {
            axios.post(`/api/admin/product/create`, formData)
            .then((res) => {
                navigate("/admin/product");
              })
              .catch((error) => {
                console.log(error);
              });
          });

     //   post(route('product.store'));
    }

 //  console.log(data);
  // console.log(errors);

  return (

        
        <div className="container-xl px-4">
            <div className="card mb-4">
                <div className="card-header">Product Information</div>
                <div className="card-body">
                <form onSubmit={submitHandle}>
                    <div className="form-group">
                    <label className="col-sm-2 col-form-label">Name</label>
                        <input onChange={inputHandle} value={data.name} name='name' type="text" className="form-control"  />
                   
                    </div>                     
                    {/* <div className="form-group">
                    <label className="col-sm-2 col-form-label">Slug</label>
                        <input onChange={inputHandle} value={data.slug} name='slug' type="text" className="form-control"  />
                    </div>                   */}
                    
                    <div className="form-group">
                    <label className="col-sm-2 col-form-label">Price</label>
                        <input onChange={inputHandle} value={data.price} name='price' type="number" className="form-control"  />
                   
                    </div>                    
                    <div className="form-group mb-3">
                    <label className="col-sm-2 col-form-label">Description</label>

                    <Editor
                        apiKey='nkkvgg6v97wpitv8o0qjvf3zsut8x3eqyb5difq13e14dzko'
                        //onInit={(evt, editor) => editorRef.current = editor}
                      //  initialValue={data.description}
                        init={{
                        height: 400,
                        menubar: true,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',

                        images_upload_url: 'http://127.0.0.1:8000/imgupload',
                        automatic_uploads: true

                        }}
                        onEditorChange={textareaHandle}
                    />

                        {/* <textarea className="form-control editorClassName" onChange={inputHandle} value={data.description} name="description" id="textarea" cols="30" rows="10">{data.description}</textarea> */}
            
                    </div>                    

                    <div className="form-group">
                    <label className="col-sm-2 col-form-label">Category</label>
                        <select className="form-control" onChange={inputHandle} name="cat_id" defaultValue='general'>
                        <option>Select a Category</option>

                            {
                                categories.map((item, index)=>{
                                    return(
                                        <option key={index} value={item.id}>{item.cat_name}</option>
                                    )
                                })
                            }
                        </select>

                    </div>                     
                    
                    <div className="form-group">
                        <label className="col-sm-2 col-form-label">Tag</label>
                        <select className="form-control" onChange={inputHandle} name="tag_id" defaultValue='tag'>
                        <option>Select a tag</option>
                            {
                                tags.map((item, index)=>{
                                    return(
                                        <option key={index} value={item.id}>{item.tag_name}</option>
                                    )
                                })
                            }
    
                        </select>
                
                    </div>                     
                    
                    <div className="form-group">
                        <label className="col-sm-2 col-form-label">Fetured</label>
                        <select className="form-control" onChange={inputHandle} name="fetured" defaultValue={data.fetured}>
                            <option>Select a Category</option>
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </select>

                    </div>                    
                    <div className="form-group">
                        <label className="col-sm-2 col-form-label">Status</label>
                        <select className="form-control" onChange={inputHandle} name="status" defaultValue={data.status}>
                            <option value="1">Publish</option>
                            <option value="0">Draft</option>
                        </select>

                    </div>                     
                    
                    <div className="form-group mb-3">
                        <label className="col-sm-2 col-form-label">Image</label>
                        <input onChange={inputFileHandle} name='image' type="file" className="form-control"  />
  
                    </div> 
                    <div className="row">
                        {/* {progress && (
                                  <progress value={progress.percentage} max="100">
                                      {progress.percentage}%
                                  </progress>
                                  )} */}
                    </div>

                    <button  type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>
   
  ) 
}
