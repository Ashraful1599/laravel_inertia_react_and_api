import React from 'react'
//import atWork from "../../assets/img/illustrations/at-work.svg"
//import {DataTable} from "simple-datatables"
import { useEffect } from 'react'



export default function Main() {

    // useEffect(() => {
    //     const myTable = document.querySelector("#datatablesSimple");
    //     const dataTable = new DataTable(myTable);


    //     const litepickerSingleDate = document.getElementById('litepickerSingleDate');
    //     if (litepickerSingleDate) {
    //         new Litepicker({
    //             element: litepickerSingleDate,
    //             format: 'MMM DD, YYYY'
    //         });
    //     }
    
    //     const litepickerDateRange = document.getElementById('litepickerDateRange');
    //     if (litepickerDateRange) {
    //         new Litepicker({
    //             element: litepickerDateRange,
    //             singleMode: false,
    //             format: 'MMM DD, YYYY'
    //         });
    //     }
    
    //     const litepickerDateRange2Months = document.getElementById('litepickerDateRange2Months');
    //     if (litepickerDateRange2Months) {
    //         new Litepicker({
    //             element: litepickerDateRange2Months,
    //             singleMode: false,
    //             numberOfMonths: 2,
    //             numberOfColumns: 2,
    //             format: 'MMM DD, YYYY'
    //         });
    //     }
    
    //     const litepickerRangePlugin = document.getElementById('litepickerRangePlugin');
    //     if (litepickerRangePlugin) {
    //         new Litepicker({
    //             element: litepickerRangePlugin,
    //             startDate: new Date(),
    //             endDate: new Date(),
    //             singleMode: false,
    //             numberOfMonths: 2,
    //             numberOfColumns: 2,
    //             format: 'MMM DD, YYYY',
    //             plugins: ['ranges']
    //         });
    //     }







    // }, [])
    

    // const dataTable = () =>{
    //     const myTable = document.querySelector("#datatablesSimple");
    //     const dataTable = new DataTable(myTable);
    // }


  return (
    <main>
    <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
        <div className="container-xl px-4">
            <div className="page-header-content pt-4">
                <div className="row align-items-center justify-content-between">
                    <div className="col-auto mt-4">
                        <h1 className="page-header-title">
                            <div className="page-header-icon"><i data-feather="activity"></i></div>
                            Dashboard
                        </h1>
                        <div className="page-header-subtitle">Example dashboard overview and content summary</div>
                    </div>
                    <div className="col-12 col-xl-auto mt-4">
                        <div className="input-group input-group-joined border-0" style={{width: "16.5rem"}}>
                            <span className="input-group-text"><i className="text-primary" data-feather="calendar"></i></span>
                            <input className="form-control ps-0 pointer" id="litepickerRangePlugin" placeholder="Select date range..." />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <div className="container-xl px-4 mt-n10">
        <div className="row">
            <div className="col-xxl-4 col-xl-12 mb-4">
                <div className="card h-100">
                    <div className="card-body h-100 p-5">
                        <div className="row align-items-center">
                            <div className="col-xl-8 col-xxl-12">
                                <div className="text-center text-xl-start text-xxl-center mb-4 mb-xl-0 mb-xxl-4">
                                    <h1 className="text-primary">Welcome to SB Admin Pro!</h1>
                                    <p className="text-gray-700 mb-0">Browse our fully designed UI toolkit! Browse our prebuilt app pages, components, and utilites, and be sure to look at our full documentation!</p>
                                </div>
                            </div>
                            {/* <div className="col-xl-4 col-xxl-12 text-center"><img className="img-fluid" src={atWork} style={{maxWidth: "26rem"}} /></div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>




    </div>
</main>
  )
}
