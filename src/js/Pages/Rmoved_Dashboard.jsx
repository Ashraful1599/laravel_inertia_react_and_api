import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import Navbar from "../Layouts/Navbar";
import Aside from "../Layouts/Aside";
import Main from "@/Layouts/Main";


 
export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            {/* <Head title="Dashboard" /> */}


        <Navbar auth={props.auth}
            errors={props.errors} />
  
        <div id="layoutSidenav">
            <Aside auth={props.auth}
            errors={props.errors} />
            <div id="layoutSidenav_content">

               <Main /> 


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






        </AuthenticatedLayout>
    );
}
