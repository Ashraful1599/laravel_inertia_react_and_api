import axios from "axios";

const upload = async (files, onUploadProgress) => {

    var formData = new FormData();
    var i = 0;
    for(i; i<files.length; i++) {
         formData.append('files[]', files[i]);
    }

  // console.log(formData.getAll('files'));

 return await axios.get("/sanctum/csrf-cookie").then((res) => {
    return  axios.post(`/api/admin/file/create`, formData, { onUploadProgress })
  });
};


const getFiles = () => {
  return "file";
};

export default {
    upload,
  //getFiles,
};
