import React from 'react'
import Navbar from './Navbar'
import Aside from './Aside'
import Main from './Main'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import ProcessCurrentUser from '../../Hook/useAuth'

export default function Dashboard() {

const {currentUser} = ProcessCurrentUser();


const [avatar, setAvatar] = useState();
const [userName, setUserName] = useState();
//console.log(avatar);


  return (
    <div>
    <Navbar avatar={avatar} userName={userName} />
  
        <div id="layoutSidenav">
            <Aside userName={userName} />
            <div id="layoutSidenav_content">
             <Outlet context={[avatar,setAvatar,setUserName]} />  
                <footer className="footer-admin mt-auto footer-light">
                    <div className="container-xl px-4">
                        <div className="row">
                            <div className="col-md-6 small">Copyright &copy; Your Website 2022</div>
                            <div className="col-md-6 text-md-end small">
                                <a href="#!">Privacy Policy</a>
                                &middot;
                                <a href="#!">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div> 
    </div>
  )
}
