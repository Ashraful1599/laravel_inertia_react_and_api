import axios from "axios";

const upload = async (file, onUploadProgress) => {

   let data = new FormData();
   data.append("file", file);

 return await axios.get("/sanctum/csrf-cookie").then((res) => {
    return  axios.post(`/api/account-image-update`, data, { onUploadProgress })
  });
};


const getFiles = () => {
  return "file";
};

export default {
    upload,
  //getFiles,
};
