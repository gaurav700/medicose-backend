import React, { useContext } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { ContextObj } from "../../store/medicose-store";
import Stack from '@mui/material/Stack';

export default function ShowHistory() {
  const { requests, handleDeleteRequest } = useContext(ContextObj);
  const itemsToShow = requests;
  return (
    <div className="notification">
      <Stack sx={{ width: '100%' }} spacing={2}>
        <div className="row mt-3 border vendor-row">
          {itemsToShow.length === 0 ? (
            <p className="alert alert-danger text-center bold">No results found.</p>
          ) : (
            <div className="row">
              <div className="col col-table">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Customer Name</th>
                      <th scope="col">Medicine Name</th>
                      <th scope="col">Tablets Required</th>
                      <th scope="col">Phone No</th>
                      <th scope="col">Address</th>
                      <th scope="col">File</th>
                      <th scope="col">Manage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemsToShow.map((medicineItem) => (

                      <tr key={medicineItem._id}>
                        <td>{medicineItem.name}</td>
                        <td>{medicineItem.medName ? medicineItem.medName : "--------"}</td>
                        <td>{medicineItem.tab ? medicineItem.tab : "--------"}</td>
                        <td>{medicineItem.phoneNo}</td>
                        <td>{medicineItem.address}</td>
                        <td> <a href={medicineItem.medFile} download="filename.pdf">Download File</a>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-danger ms-2" onClick={() => handleDeleteRequest(medicineItem._id)}><MdDelete /> </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </Stack>
    </div>
  );
}
