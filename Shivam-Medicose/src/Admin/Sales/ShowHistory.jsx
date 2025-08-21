import React, { useContext } from "react";
import { MdDelete, MdFileDownload, MdEdit } from "react-icons/md";
import { ContextObj } from "../../store/medicose-store";
import Stack from '@mui/material/Stack';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RiBillLine } from "react-icons/ri";
import "./ShowHistory.css"
import Bill from "./Bill";
import { PDFDownloadLink } from '@react-pdf/renderer';


export default function ShowHistory() {
  const { saleData, formatDate, calculateTotalPrice, handleDeleteMedicineSale, handleEditMedicineSale, handleToggleCollapseSale, expandedVendors, expandedCustomers, filterDataSale } = useContext(ContextObj);

  const itemsToShow = saleData;
  return (
    <div className="notification">
      {
        filterDataSale.length > 0 ?
          <Stack sx={{ width: '100%' }} spacing={2}>
            <div className="row mt-3 border vendor-row">
              <div className="col col-table">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Bill NO</th>
                      <th scope="col">Customer Name</th>
                      <th scope="col">Doctor Name</th>
                      <th scope="col">Total Price</th>
                      <th scope="col">Manage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterDataSale.map((customer) => (
                      <React.Fragment key={customer._id}>
                        <tr>
                          <td>{customer.billNo}</td>
                          <td>{customer.customerName}</td>
                          <td>{customer.doctorName}</td>
                          <td>{calculateTotalPrice(customer.medicine)}</td>
                          <td>
                            <PDFDownloadLink document={<Bill customer={customer} medicineList={customer.medicine} />} fileName='invoice.pdf'>
                              <button className="btn custom-button-delete"><RiBillLine /></button>
                            </PDFDownloadLink>
                            &nbsp;&nbsp;&nbsp;
                            <button className="btn custom-button" onClick={() => handleToggleCollapseSale(customer._id, "customer")}>
                              {expandedCustomers.includes(customer._id) ? <FaEye /> : <FaEyeSlash />}
                            </button>
                          </td>
                        </tr>
                        <tr className={`collapse ${expandedCustomers.includes(customer._id) ? "show" : ""} `} id={`collapse - ${customer._id} `}>
                          <td colSpan="8">
                            <div className="row mt-3 border medicine-row">
                              <div className="col col-table">
                                <table className="table table-striped">
                                  <thead>
                                    <tr>
                                      <th scope="col">Type Of Medicine</th>
                                      <th scope="col">Medicine Name</th>
                                      <th scope="col">Batch</th>
                                      <th scope="col">Company Name</th>
                                      <th scope="col">Tablet/Unit</th>
                                      <th scope="col">Units/Box</th>
                                      <th scope="col">MRP</th>
                                      <th scope="col">Expiry Date</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {customer.medicine && customer.medicine.map((medicineItem) => (
                                      <tr key={medicineItem._id}>
                                        <td>{medicineItem.typeofmedicine ? medicineItem.typeofmedicine : "-----"}</td>
                                        <td>{medicineItem.name}</td>
                                        <td>{medicineItem.batch}</td>
                                        <td>{medicineItem.company}</td>
                                        <td>{medicineItem.tab}</td>
                                        <td>{medicineItem.units}</td>
                                        <td>${medicineItem.mrp}</td>
                                        <td>{formatDate(medicineItem.expiry)}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Stack> :
          <Stack sx={{ width: '100%' }} spacing={2}>
            {itemsToShow.map((item) => (
              <div key={item._id} className="row mt-3 border vendor-row">
                <div className="col-md-4 fw-bolder">Sales Date: {formatDate(item.todayDate)}</div>
                <div className="col-md-3 fw-bolder">Total Price: {item.customers ? `$${calculateTotalPrice(item.customers[0].medicine)} ` : ''}</div>
                <div className="col-md-2 d-flex justify-content-end">
                  <button className="btn custom-button" onClick={() => handleToggleCollapseSale(item._id, "vendor")}>
                    {expandedVendors.includes(item._id) ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
                <div className={`collapse ${expandedVendors.includes(item._id) ? "show" : ""} `} id={`collapse - ${item._id} `}>
                  <div className="col col-table">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Bill NO</th>
                          <th scope="col">Customer Name</th>
                          <th scope="col">Doctor Name</th>
                          <th scope="col">Total Price</th>
                          <th scope="col">Manage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.customers && item.customers.map((customer) => (
                          <React.Fragment key={customer._id}>
                            <tr>
                              <td>{customer.billNo}</td>
                              <td>{customer.customerName}</td>
                              <td>{customer.doctorName}</td>
                              <td>{calculateTotalPrice(customer.medicine)}</td>
                              <td>
                                <PDFDownloadLink document={<Bill customer={customer} medicineList={customer.medicine} />} fileName='invoice.pdf'>
                                  <button className="btn custom-button-delete"><RiBillLine /></button>
                                </PDFDownloadLink>
                                &nbsp;&nbsp;&nbsp;
                                <button className="btn custom-button" onClick={() => handleToggleCollapseSale(customer._id, "customer")}>
                                  {expandedCustomers.includes(customer._id) ? <FaEye /> : <FaEyeSlash />}
                                </button>
                              </td>
                            </tr>
                            <tr className={`collapse ${expandedCustomers.includes(customer._id) ? "show" : ""} `} id={`collapse - ${customer._id} `}>
                              <td colSpan="8">
                                <div className="row mt-3 border medicine-row">
                                  <div className="col col-table">
                                    <table className="table table-striped">
                                      <thead>
                                        <tr>
                                          <th scope="col">Type Of Medicine</th>
                                          <th scope="col">Medicine Name</th>
                                          <th scope="col">Batch</th>
                                          <th scope="col">Company Name</th>
                                          <th scope="col">Tablet/Unit</th>
                                          <th scope="col">Units/Box</th>
                                          <th scope="col">MRP</th>
                                          <th scope="col">Expiry Date</th>
                                          <th scope="col">Manage</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {customer.medicine && customer.medicine.map((medicineItem) => (
                                          <tr key={medicineItem._id}>
                                            <td>{medicineItem.typeofmedicine ? medicineItem.typeofmedicine : "-----"}</td>
                                            <td>{medicineItem.name}</td>
                                            <td>{medicineItem.batch}</td>
                                            <td>{medicineItem.company}</td>
                                            <td>{medicineItem.tab}</td>
                                            <td>{medicineItem.units}</td>
                                            <td>${medicineItem.mrp}</td>
                                            <td>{formatDate(medicineItem.expiry)}</td>
                                            <td>
                                              <button className="btn btn-sm btn-warning" onClick={() => handleEditMedicineSale(item, customer, medicineItem)}><MdEdit /></button>
                                              <button className="btn btn-sm btn-danger ms-2" onClick={() => handleDeleteMedicineSale(item._id, customer._id, medicineItem._id)}><MdDelete /></button>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </Stack>
      }

    </div>
  );
}
