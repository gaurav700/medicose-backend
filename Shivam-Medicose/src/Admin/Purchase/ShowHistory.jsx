import React, { useContext } from "react";
import { MdDelete, MdFileDownload, MdEdit } from "react-icons/md";
import { ContextObj } from "../../store/medicose-store";
import Stack from '@mui/material/Stack';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ShowHistory() {
  const { data, filteredDataPurchase, formatDate, calculateTotalPrice, handleToggleCollapse, expandedItem, handleDeleteMedicine, handleEditMedicine } = useContext(ContextObj);
  const itemsToShow = data;
  return (
    <div className="notification">
      {
        filteredDataPurchase.length > 0 ?
          <Stack sx={{ width: '100%' }} spacing={2}>
            <div className="row mt-3 border vendor-row">
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
                        <th scope="col">Batch</th>
                        <th scope="col">Rate</th>
                        <th scope="col">MRP</th>
                        <th scope="col">Counter</th>
                        <th scope="col">Expiry Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDataPurchase.map((medicineItem) => (
                        <tr key={medicineItem._id}>
                          <td>{medicineItem.name}</td>
                          <td>{medicineItem.company}</td>
                          <td>{medicineItem.tab}</td>
                          <td>{medicineItem.units}</td>
                          <td>{medicineItem.packages}</td>
                          <td>{medicineItem.batch}</td>
                          <td>{medicineItem.rate}</td>
                          <td>{medicineItem.mrp}</td>
                          <td>{medicineItem.counter}</td>
                          <td>{formatDate(medicineItem.expiry)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Stack>
          :
          <Stack sx={{ width: '100%' }} spacing={2}>
            {itemsToShow.map((item) => (
              <div key={item._id} className="row mt-3 border vendor-row">
                <div className="col-md-3 fw-bolder">
                  Vendor name: {item.vendorName}
                </div>
                <div className="col-md-4 fw-bolder">Purchase Date: {formatDate(item.purchaseDate)}</div>
                <div className="col-md-3 fw-bolder">Total Price: {item.medicine ? `₹${calculateTotalPrice(item.medicine)}` : ''}</div>
                <div className="col-md-2 d-flex justify-content-end">
                  <button className="btn custom-button" onClick={() => handleToggleCollapse(item._id)}>
                    {expandedItem === item._id ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>

                <div className={`collapse ${expandedItem === item._id ? "show" : ""}`} id={`collapse-${item._id}`}>
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
                            <th scope="col">Batch</th>
                            <th scope="col">Rate</th>
                            <th scope="col">MRP</th>
                            <th scope="col">Counter</th>
                            <th scope="col">Expiry Date</th>
                            <th scope="col">Manage</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.medicine && item.medicine.map((medicineItem) => (
                            <tr key={medicineItem._id}>
                              <td>{medicineItem.name}</td>
                              <td>{medicineItem.company}</td>
                              <td>{medicineItem.tab}</td>
                              <td>{medicineItem.units}</td>
                              <td>{medicineItem.packages}</td>
                              <td>{medicineItem.batch}</td>
                              <td>{medicineItem.rate}</td>
                              <td>{medicineItem.mrp}</td>
                              <td>{medicineItem.counter}</td>
                              <td>{formatDate(medicineItem.expiry)}</td>
                              <td>
                                <button className="btn btn-sm btn-warning" onClick={() => handleEditMedicine(item, medicineItem)}><MdEdit /> </button>
                                <button className="btn btn-sm btn-danger ms-2" onClick={() => handleDeleteMedicine(item._id, medicineItem._id)}><MdDelete /> </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Stack>
      }
    </div>
  );
}
