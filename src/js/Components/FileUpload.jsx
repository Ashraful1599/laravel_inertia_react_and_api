import React, { useState, useEffect } from "react";
import UploadService from "../Services/FileUploadService"
import { Link,useOutletContext } from 'react-router-dom'
import ProcessCurrentUser from '../Hook/useAuth'
import ContentLoader from "react-content-loader"
import axios from "axios";
import Swal from "sweetalert2"; 

const UploadFiles = () => {
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [fileInfos, setFileInfos] = useState([]);
    const [avatar,setAvatar,setUserName] = useOutletContext();
    const {currentUser} = ProcessCurrentUser();
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

    const selectFile = (event) => {
        setSelectedFiles(event.target.files);
      };
  const upload = (e) => {
        e.preventDefault();

        let currentFile = selectedFiles[0];
    
        setProgress(0);
        setCurrentFile(currentFile);
    
   UploadService.upload(currentFile, (event) => {
          setProgress(Math.round((100 * event.loaded) / event.total));
        })
        .then((res) => {

                setAvatar(res.data.image);
              Toast.fire({
                  icon: 'success',
                  title: res.data.msg
                })
            })
            .catch((error) => {
              console.log(error);
            });
    
        setSelectedFiles(undefined);
      };

  
  return (



    <div className="card-body text-center">


 
    {avatar || currentUser.image? 
        <img className="img-account-profile rounded-circle mb-2" src={avatar? process.env.REACT_APP_UP_DIR+avatar : currentUser.image? process.env.REACT_APP_UP_DIR+currentUser.image : ""} alt="" /> 
        :
        <ContentLoader speed={2} width={100} height={107} viewBox="0 0 100 100" backgroundColor="#f3f3f3" foregroundColor="#ecebeb"><circle cx="50" cy="50" r="50" /> </ContentLoader>
}
                <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>

                     <form onSubmit={upload}> 
                
                        <div className="row">
                                {/*
                                
                                formik from upload with image 
                                <input name='file' id='file' type="file"   onChange={(event) => {
  const newValues = { ...formik.values }; 
  newValues[event.target.name] = event.target.files[0];
  formik.setValues(newValues);                                */}
  
                      <input name='file' id='file' type="file" onChange={selectFile}  />
                                  {/* {errors && <div className='text-danger'>{errors.file}</div>} */}
                        </div>
                           {currentFile && (
                            <div className="progress mt-2">
                              <div
                                className="progress-bar progress-bar-info progress-bar-striped"
                                role="progressbar"
                                aria-valuenow={progress}
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: progress + "%" }}
                              >
                                {progress}%
                              </div>
                            </div>
                          )}

                         <button 
                           disabled={!selectedFiles}
                         type='submit' className="btn btn-primary mt-4">Save image</button>
                     </form>  
    
                    </div>

  );
};

export default UploadFiles;