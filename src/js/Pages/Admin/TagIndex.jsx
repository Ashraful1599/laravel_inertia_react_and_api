import React, {useEffect, useState} from 'react'
import DataTable from "react-data-table-component";
import * as fIcon from 'react-feather';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom'

export default function TagIndex() {

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

    const [data, setData] = useState([]);
    const [pending, setPending] = React.useState(true);

    useEffect(() => {
        (async function () {
        //  await axios.get("/sanctum/csrf-cookie").then((response) => {
        await    axios
              .get(`/api/admin/tag`)
              .then((res) => {
                setData(res.data.tags);
                setPending(false);
              })
              .catch((error) => {
                console.log(error);
              });
         // });
        })();
      }, []);


    const columns = [
        {
          name: "Name",
          selector: (row) => row.tag_name,
          sortable: true,
        },
        {
          name: "Slug",
          selector: (row) => row.tag_slug,
          sortable: true,
        },        
        {
          name: "Description",
          selector: (row) => row.tag_des,
          sortable: true,
        },
        {
          name: "Action",
          selector: (row) => {
            return (
              <div>
                <Link to={`/admin/tag/${row.id}/edit`} className="btn btn-datatable btn-icon btn-transparent-dark me-2"  >  <fIcon.Edit2 />  </Link>
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure to delete this record?")) {
                      axios.get("/sanctum/csrf-cookie").then((response) => {
      
                        axios.delete(`/api/admin/tag/${row.id}`)
                          .then((res) => {
      
                            Toast.fire({
                              icon: "success",
                              title: res.data.msg,
                            });
                           setData(res.data.tags);
                          
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      });
                    }
                  }}
                  className="btn btn-datatable btn-icon btn-transparent-dark deleteBtn"
                >
                  <fIcon.Trash2 />
                </button>
              </div>
            );
          },
        },
      ];
    



      const [selectedRows, setSelectedRows] = React.useState([]);
      const [toggleCleared, setToggleCleared] = React.useState(false);

    
      const handleRowSelected = React.useCallback((state) => {
        setSelectedRows(state.selectedRows);
      }, []);
    
    
      const contextActions = React.useMemo(() => {
        const handleDelete = () => {
    
    
          if (
            window.confirm(
              `Are you sure you want to delete ${selectedRows.length} item?`
            )
          ) {
            const selectedItem = [];
            selectedRows.map((r) => {
              selectedItem.push(r.id);
            });
            const selectedItemString = selectedItem.join();
    
            axios.get("/sanctum/csrf-cookie").then((response) => {
    
              axios.delete(`/api/admin/tag/${selectedItemString}`)
                .then((res) => {
    
                  Toast.fire({
                    icon: "success",
                    title: res.data.msg,
                  });
    
                  setData(res.data.tags);
                })
                .catch((error) => {
                  console.log(error);
                });
            });
            setToggleCleared(!toggleCleared);
          }
        };
    
        return (
          <button onClick={handleDelete} className="btn btn-primary">
            Delete
          </button>
        );
      }, [data, selectedRows, toggleCleared]);
    
      // data provides access to your row data
      const ExpandedComponent = ({ data }) => (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      );
      const [filterText, setFilterText] = React.useState("");
      const [resetPaginationToggle, setResetPaginationToggle] =
        React.useState(false);
      const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
          if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText("");
          }
        };
    
        return (
        
          <div className="input-group mb-3">
            <input
              onChange={(e) => {
                setFilterText(e.target.value);
              }}
              value={filterText}
              type="text"
              className="form-control"
              placeholder="Search here"
            />
            <div className="input-group-append">
              <button
                onClick={handleClear}
                className="btn btn-outline-secondary"
                type="button"
              >
                Clear
              </button>
            </div>
          </div>
        );
      }, [filterText, resetPaginationToggle]);

     // console.log(data)
    
      const filteredItems = data.filter(
        (item) =>
          (item.tag_name &&
            item.tag_name.toLowerCase().includes(filterText.toLowerCase())) ||
          (item.tag_slug && item.tag_slug.toLowerCase().includes(filterText.toLowerCase()))
      );




  return (


        <div className="container-xl px-4">
            <div className="card mb-4">
                <div className="card-header">Tag Information</div>
                <div className="card-body">
                <DataTable
                    title="Tag List" //must enable the title to show selected row and button
                    columns={columns}
                    data={filteredItems}
                    pagination
                    paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    selectableRows
                    contextActions={contextActions}
                    onSelectedRowsChange={handleRowSelected}
                    clearSelectedRows={toggleCleared}
                    theme="default"
                    progressPending={pending}
                    // expandableRows
                    //  expandableRowsComponent={ExpandedComponent}
                />
                </div>
            </div>
        </div>



  )
}
