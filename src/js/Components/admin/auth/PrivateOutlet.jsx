import { Navigate, useNavigate, Outlet,useOutletContext } from "react-router-dom";


export default function PrivateOutlet() {
  const token = localStorage.getItem("auth_token");
  const role = localStorage.getItem("role");


  if(token){
      if(role ==1){
        return <Outlet />
      }else{
        return <Navigate to="/" />
      }
  }else{
   return <Navigate to="/login" />
  }

 // return token ? <Outlet /> : <Navigate to="/login" />;
}