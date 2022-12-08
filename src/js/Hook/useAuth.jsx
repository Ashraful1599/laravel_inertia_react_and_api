import React, {useState, useEffect} from 'react'
import axios  from 'axios'


export default function ProcessCurrentUser() {



   // const auth_username = localStorage.getItem('auth_username');
   // const auth_email = localStorage.getItem('auth_email');



    const [currentUser, setCurrentUser] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {

        const getCurrentuser = async () =>{
    
            const getUser = await axios.get('api/getCurentUser').then(res=>res.data).then(data=>{
                setCurrentUser(data);
            }).catch(error=>{
                setError(error);
            })
            }
    
            getCurrentuser();
    
      }, []);

        return {
            currentUser,
            error
        }


    
}
