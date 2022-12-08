import React from 'react'
import Profile from "../../../assets/img/illustrations/profiles/profile-1.png"
import Profile2 from "../../../assets/img/illustrations/profiles/profile-2.png"
import Profile3 from "../../../assets/img/illustrations/profiles/profile-3.png"
import Profile4 from "../../../assets/img/illustrations/profiles/profile-4.png"
import Profile5 from "../../../assets/img/illustrations/profiles/profile-5.png"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fIcon from 'react-feather';
import ProcessCurrentUser from '../../Hook/useAuth'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import ContentLoader from 'react-content-loader'

export default function Navbar({avatar,userName}) {

const navigate = useNavigate();


const {currentUser, email} = ProcessCurrentUser();

const Toast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })


const logout = (e) =>{
    e.preventDefault();

   // console.log(localStorage.getItem("auth_token"));

    axios.post('/api/logout')
    .then(res=>res.data)
    .then(data=>{

        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_username");
        localStorage.removeItem("auth_email");
        localStorage.removeItem("role");

        Toast.fire({
            icon: 'success',
            title: data
        })

        navigate('/login');


    }).catch(error=>{
        console.log(error)
    });
}





 const  hideSidebar = (e) => {
  e.preventDefault();
  document.body.classList.toggle('sidenav-toggled');
  localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sidenav-toggled'));
  }


  return (
          <nav className="topnav navbar navbar-expand shadow justify-content-between justify-content-sm-start navbar-light bg-white" id="sidenavAccordion">

            <button onClick={hideSidebar} className="btn btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-2 me-lg-0" id="sidebarToggle"><fIcon.Menu size={16} /></button>
            {/* <!-- Navbar Brand-->
            <!-- * * Tip * * You can use text or an image for your navbar brand.-->
            <!-- * * * * * * When using an image, we recommend the SVG format.-->
            <!-- * * * * * * Dimensions: Maximum height: 32px, maximum width: 240px--> */}
            <Link className="navbar-brand pe-3 ps-4 ps-lg-2" to="/admin/dashboard">SB Admin Pro</Link>
            {/* <!-- Navbar Search Input-->
            <!-- * * Note: * * Visible only on and above the lg breakpoint--> */}
            <form className="form-inline me-auto d-none d-lg-block me-3">
                <div className="input-group input-group-joined input-group-solid">
                    <input className="form-control pe-0" type="search" placeholder="Search" aria-label="Search" />
                    <div className="input-group-text"><fIcon.Search size={16} /></div>
                </div>
            </form>
 
            <ul className="navbar-nav align-items-center ms-auto">

                {/* <!-- Navbar Search Dropdown-->
                <!-- * * Note: * * Visible only below the lg breakpoint--> */}
                <li className="nav-item dropdown no-caret me-3 d-lg-none">
                    <a className="btn btn-icon btn-transparent-dark dropdown-toggle" id="searchDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><fIcon.Search size={16} /></a> 
    
                    <div className="dropdown-menu dropdown-menu-end p-3 shadow animated--fade-in-up" aria-labelledby="searchDropdown">
                        <form className="form-inline me-auto w-100">
                            <div className="input-group input-group-joined input-group-solid">
                                <input className="form-control pe-0" type="text" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                 <div className="input-group-text"><fIcon.Search size={16} /></div> 
                            </div>
                        </form>
                    </div>
                </li>

                <li className="nav-item dropdown no-caret d-none d-sm-block me-3 dropdown-notifications">
                    <a className="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownAlerts" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><fIcon.Bell size={16} /></a>
                    <div className="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownAlerts">
                        <h6 className="dropdown-header dropdown-notifications-header">
                            <fIcon.Bell size={16} className="me-2" />
                            Alerts Center
                        </h6>

                        <a className="dropdown-item dropdown-notifications-item" href="#!">
                            <div className="dropdown-notifications-item-icon bg-warning"><fIcon.Activity size={16} /></div>
                            <div className="dropdown-notifications-item-content">
                                <div className="dropdown-notifications-item-content-details">December 29, 2021</div>
                                <div className="dropdown-notifications-item-content-text">This is an alert message. It's nothing serious, but it requires your attention.</div>
                            </div>
                        </a>

                        <a className="dropdown-item dropdown-notifications-item" href="#!">
                            <div className="dropdown-notifications-item-icon bg-info"><fIcon.BarChart size={16} /></div>
                            <div className="dropdown-notifications-item-content">
                                <div className="dropdown-notifications-item-content-details">December 22, 2021</div>
                                <div className="dropdown-notifications-item-content-text">A new monthly report is ready. Click here to view!</div>
                            </div>
                        </a>

                        <a className="dropdown-item dropdown-notifications-item" href="#!">
                            <div className="dropdown-notifications-item-icon bg-danger"><i className="fas fa-exclamation-triangle"></i></div>
                            <div className="dropdown-notifications-item-content">
                                <div className="dropdown-notifications-item-content-details">December 8, 2021</div>
                                <div className="dropdown-notifications-item-content-text">Critical system failure, systems shutting down.</div>
                            </div>
                        </a>

                        <a className="dropdown-item dropdown-notifications-item" href="#!">
                            <div className="dropdown-notifications-item-icon bg-success"><fIcon.UserPlus size={16} /></div>
                            <div className="dropdown-notifications-item-content">
                                <div className="dropdown-notifications-item-content-details">December 2, 2021</div>
                                <div className="dropdown-notifications-item-content-text">New user request. Woody has requested access to the organization.</div>
                            </div>
                        </a>
                        <a className="dropdown-item dropdown-notifications-footer" href="#!">View All Alerts</a>
                    </div>
                </li>

                <li className="nav-item dropdown no-caret d-none d-sm-block me-3 dropdown-notifications">
                    <a className="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownMessages" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><fIcon.Mail size={16} /></a>
                    <div className="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownMessages">
                        <h6 className="dropdown-header dropdown-notifications-header">
                        <fIcon.Mail size={16} className="me-2" />
                            Message Center
                        </h6>

                        <a className="dropdown-item dropdown-notifications-item" href="#!">
                            <img className="dropdown-notifications-item-img" src={Profile2} />
                            <div className="dropdown-notifications-item-content">
                                <div className="dropdown-notifications-item-content-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                                <div className="dropdown-notifications-item-content-details">Thomas Wilcox · 58m</div>
                            </div>
                        </a>

                        <a className="dropdown-item dropdown-notifications-item" href="#!">
                            <img className="dropdown-notifications-item-img" src={Profile3} />
                            <div className="dropdown-notifications-item-content">
                                <div className="dropdown-notifications-item-content-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                                <div className="dropdown-notifications-item-content-details">Emily Fowler · 2d</div>
                            </div>
                        </a>

                        <a className="dropdown-item dropdown-notifications-item" href="#!">
                            <img className="dropdown-notifications-item-img" src={Profile4} />
                            <div className="dropdown-notifications-item-content">
                                <div className="dropdown-notifications-item-content-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                                <div className="dropdown-notifications-item-content-details">Marshall Rosencrantz · 3d</div>
                            </div>
                        </a>

                        <a className="dropdown-item dropdown-notifications-item" href="#!">
                            <img className="dropdown-notifications-item-img" src={Profile5} />
                            <div className="dropdown-notifications-item-content">
                                <div className="dropdown-notifications-item-content-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                                <div className="dropdown-notifications-item-content-details">Colby Newton · 3d</div>
                            </div>
                        </a>
                        <a className="dropdown-item dropdown-notifications-footer" href="#!">Read All Messages</a>
                    </div>
                </li>
                <li className="nav-item dropdown no-caret dropdown-user me-3 me-lg-4">
                    <a className="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownUserImage" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        
                        {avatar || currentUser.image?
                        <img className="img-fluid" src={avatar? process.env.REACT_APP_UP_DIR+avatar : process.env.REACT_APP_UP_DIR+currentUser.image} />
                        :
                        <ContentLoader speed={2} width={100} height={107} viewBox="0 0 50 50" backgroundColor="#f3f3f3" foregroundColor="#ecebeb"><circle cx="21" cy="21" r="21" /> </ContentLoader>
                        }
                        
                        </a>
                    <div className="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownUserImage">
                        <h6 className="dropdown-header d-flex align-items-center">
                        {avatar || currentUser.image?
                        <img className="dropdown-user-img" src={avatar? process.env.REACT_APP_UP_DIR+avatar : process.env.REACT_APP_UP_DIR+currentUser.image} />
                        :
                        <ContentLoader speed={2} width={100} height={107} viewBox="0 0 50 50" backgroundColor="#f3f3f3" foregroundColor="#ecebeb"><circle cx="21" cy="21" r="21" /> </ContentLoader>
                        }
                            {/* <img className="dropdown-user-img" src={avatar? process.env.REACT_APP_UP_DIR+avatar : currentUser? process.env.REACT_APP_UP_DIR+currentUser.image : ""} /> */}
                            <div className="dropdown-user-details">
                              <div className="dropdown-user-details-name">{userName? userName : currentUser.name? currentUser.name+" "+currentUser.lname : ""}</div>
                                <div className="dropdown-user-details-email">{currentUser.email}</div> 
                            </div>
                        </h6>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to="/admin/account-profile">
                            <div className="dropdown-item-icon"><fIcon.Settings size={16} /></div>
                            Account
                        </Link>
                        <Link className="dropdown-item" onClick={logout}>
                            <div className="dropdown-item-icon"><fIcon.LogOut size={16} /></div>
                            Logout
                        </Link>
                    </div>
                </li>
            </ul>
        </nav>
  ) 
}
