import React, { useContext } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { ContextObj } from "../../store/medicose-store";
import Stack from '@mui/material/Stack';

export default function ShowMedicine() {
  const { allMedicines, filteredMedicine, formatDate, handleDeleteMedicineMain, filterMedicine } = useContext(ContextObj);
  const itemsToShow = filterMedicine ? filteredMedicine : allMedicines;
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
                      <th scope="col">Medicine Name</th>
                      <th scope="col">Company Name</th>
                      <th scope="col">Tablet/Unit</th>
                      <th scope="col">Units/Box</th>
                      <th scope="col">Box</th>
                      <th scope="col">Tab Left</th>
                      <th scope="col">Batch</th>
                      <th scope="col">Rate</th>
                      <th scope="col">MRP</th>
                      <th scope="col">Counter</th>
                      <th scope="col">Expiry Date</th>
                      <th scope="col">Manage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemsToShow.map((medicineItem) => (

                      <tr key={medicineItem._id}>
                        <td>{medicineItem.name}</td>
                        <td>{medicineItem.company}</td>
                        <td>{medicineItem.tab}</td>
                        <td>{medicineItem.units}</td>
                        <td>{medicineItem.packages}</td>
                        <td>{medicineItem.tabLeft * medicineItem.packagesLeft * medicineItem.unitsLeft}</td>
                        <td>{medicineItem.batch}</td>
                        <td>{medicineItem.rate}</td>
                        <td>{medicineItem.mrp}</td>
                        <td>{medicineItem.counter}</td>
                        <td>{formatDate(medicineItem.expiry)}</td>
                        <td>
                          <button className="btn btn-sm btn-danger ms-2" onClick={() => handleDeleteMedicineMain(medicineItem._id)}><MdDelete /> </button>
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
