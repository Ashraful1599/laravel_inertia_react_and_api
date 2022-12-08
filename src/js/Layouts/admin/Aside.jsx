import React from 'react'
import * as fIcon from 'react-feather';
import ProcessCurrentUser from '../../Hook/useAuth'
import {Link} from 'react-router-dom'

export default function Aside({userName}) {

    const {currentUser, email} = ProcessCurrentUser();


  return (
    <div id="layoutSidenav_nav">
    <nav className="sidenav shadow-right sidenav-light">
        <div className="sidenav-menu">
            <div className="nav accordion" id="accordionSidenav">
 
                <div className="sidenav-menu-heading d-sm-none">Account</div>
 
                <a className="nav-link d-sm-none" href="#!">
                    <div className="nav-link-icon"><fIcon.Bell /></div>
                    Alerts
                    <span className="badge bg-warning-soft text-warning ms-auto">4 New!</span>
                </a>
  
                <a className="nav-link d-sm-none" href="#!">
                    <div className="nav-link-icon"><fIcon.Mail /></div>
                    Messages
                    <span className="badge bg-success-soft text-success ms-auto">2 New!</span>
                </a>

    
                <div className="sidenav-menu-heading">Custom</div>

                {/* <div className="collapse" id="collapsePages" data-bs-parent="#accordionSidenav">
                    <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPagesMenu">
             
                        <a className="nav-link collapsed" href="#!" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                            Authentication
                            <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="pagesCollapseAuth" data-bs-parent="#accordionSidenavPagesMenu">
                            <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPagesAuth">
                    
                                <a className="nav-link collapsed" href="#!" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuthBasic" aria-expanded="false" aria-controls="pagesCollapseAuthBasic">
                                    Basic
                                    <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </a>
                                <div className="collapse" id="pagesCollapseAuthBasic" data-bs-parent="#accordionSidenavPagesAuth">
                                    <nav className="sidenav-menu-nested nav">
                                        <a className="nav-link" href="auth-login-basic.html">Login</a>
                                    </nav>
                                </div>
                            </nav>
                        </div>
                    </nav>
                </div>                 */}

                <a className="nav-link collapsed" href="#!" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                    <div className="nav-link-icon"><fIcon.Grid /></div>
                    File
                    <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </a>
                
                <div className="collapse" id="collapsePages" data-bs-parent="#accordionSidenav">
                    <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPagesMenu">
             
                        <Link className="nav-link collapsed" to="/admin/file/create" >
                            Add file
                        </Link>                       
                        
                        <Link className="nav-link collapsed" to="/admin/file">
                            All files
                        </Link>
 
                    </nav>
                </div>                
                
                <a className="nav-link collapsed" href="#!" data-bs-toggle="collapse" data-bs-target="#category" aria-expanded="false" aria-controls="collapsePages">
                    <div className="nav-link-icon"><fIcon.Grid /></div>
                    Category
                    <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </a>
                
                <div className="collapse" id="category" data-bs-parent="#accordionSidenav">
                    <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPagesMenu">
             
                        <Link className="nav-link collapsed" to="/admin/category/create" >
                            Add Category
                        </Link>                       
                        
                        <Link className="nav-link collapsed" to="/admin/category">
                            All Categories
                        </Link>
 
                    </nav>
                </div>                
                
                <a className="nav-link collapsed" href="#!" data-bs-toggle="collapse" data-bs-target="#tag" aria-expanded="false" aria-controls="collapsePages">
                    <div className="nav-link-icon"><fIcon.Grid /></div>
                    Tag
                    <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </a>
                
                <div className="collapse" id="tag" data-bs-parent="#accordionSidenav">
                    <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPagesMenu">
             
                        <Link className="nav-link collapsed" to="/admin/tag/create" >
                            Add Tag
                        </Link>                       
                        
                        <Link className="nav-link collapsed" to="/admin/tag">
                            All Tags
                        </Link>
 
                    </nav>
                </div>                
                
                <a className="nav-link collapsed" href="#!" data-bs-toggle="collapse" data-bs-target="#product" aria-expanded="false" aria-controls="collapsePages">
                    <div className="nav-link-icon"><fIcon.Grid /></div>
                    Product
                    <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </a>
                
                <div className="collapse" id="product" data-bs-parent="#accordionSidenav">
                    <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPagesMenu">
             
                        <Link className="nav-link collapsed" to="/admin/product/create" >
                            Add Product
                        </Link>                       
                        
                        <Link className="nav-link collapsed" to="/admin/product">
                            All Products
                        </Link>
 
                    </nav>
                </div>
         
      
            </div>
        </div>

        <div className="sidenav-footer">
            <div className="sidenav-footer-content">
                <div className="sidenav-footer-subtitle">Logged in as:</div>
                <div className="sidenav-footer-title">{userName?userName : currentUser? currentUser.name+" "+currentUser.lname : "User name"}</div>
            </div>
        </div>
    </nav>
</div>
  )
}
