import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "@inertiajs/inertia-react";
import Dropzone, { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import { usePage } from "@inertiajs/inertia-react";
import "react-toastify/dist/ReactToastify.css";
import UploadService from "../../Services/MultipleFileUploadServices";
import { Navigate, useNavigate } from "react-router-dom";

export default function FileCreate() {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const uploadSubmit = (e) => {
    e.preventDefault();

    let uploadCurrentFile = selectedFiles;

    setProgress(0);
    setCurrentFile(uploadCurrentFile);

    UploadService.upload(uploadCurrentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((res) => {
        setSelectedFiles(undefined);
        Toast.fire({
          icon: "success",
          title: res.data.msg,
        });

        navigate("/admin/file");
      })
      .catch((error) => {
        console.log(error);
      });

    setSelectedFiles(undefined);
  };

  const onDrop = (files) => {
    if (files.length > 0) {
      setSelectedFiles(files);
    }
  };

  return (
    <div className="container-xl px-4">
      <div className="card mb-4">
        <div className="card-header">Upload Files</div>
        <div className="card-body">
          <form onSubmit={uploadSubmit}>
            <div className="form-group">
              <Dropzone onDrop={onDrop} multiple={true}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps({ className: "dropzone" })}>
                      <input {...getInputProps()} />
                      {selectedFiles ? (
                        <ul
                          style={{ marginBottom: "0" }}
                          className="selected-file"
                        >
                          {selectedFiles.map((item, index) => {
                            return <li key={index}>{item.name}</li>;
                          })}
                        </ul>
                      ) : (
                        "Drag and drop file here, or click to select file"
                      )}
                    </div>
                  </section>
                )}
              </Dropzone>

              {/* {errors && <div className="text-danger">{errors.file}</div>} */}
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
              type="submit"
              className="btn btn-primary mt-3"
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
