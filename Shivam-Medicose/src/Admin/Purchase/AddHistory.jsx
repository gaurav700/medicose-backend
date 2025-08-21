import React, { useContext, useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { ContextObj } from "../../store/medicose-store";
import { Form } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { format, parseISO } from "date-fns";

export default function AddHistory() {
  const { show, handleClose, today, handleInputBlurToday, handleInputFocusToday, medicines, handleAddRow, handleRemoveRow, handleAddHistoryApi, selectedPurchase, selectedMedicine, handleEditHistoryApi, allMedicines } = useContext(ContextObj);

  useEffect(() => {
    if (selectedPurchase && selectedMedicine) {
      document.querySelector('[name="purchase_id"]').value = selectedPurchase._id || '';
      document.querySelector('[name="vendorName"]').value = selectedPurchase.vendorName || '';
      document.querySelector('[name="purchaseDate"]').value = selectedPurchase.purchaseDate ? format(parseISO(selectedPurchase.purchaseDate), "dd MMMM, yyyy") : '';
      const medicine = selectedPurchase.medicine.find(med => med._id === selectedMedicine._id);
      if (medicine) {
        document.querySelector(`[name="medicines[0].medicine_id"]`).value = medicine._id || '';
        document.querySelector(`[name="medicines[0].name"]`).value = medicine.name || '';
        document.querySelector(`[name="medicines[0].company"]`).value = medicine.company || '';
        document.querySelector(`[name="medicines[0].tab"]`).value = medicine.tab || '';
        document.querySelector(`[name="medicines[0].units"]`).value = medicine.units
        document.querySelector(`[name="medicines[0].packages"]`).value = medicine.packages || '';
        document.querySelector(`[name="medicines[0].batch"]`).value = medicine.batch || '';
        document.querySelector(`[name="medicines[0].rate"]`).value = medicine.rate || '';
        document.querySelector(`[name="medicines[0].mrp"]`).value = medicine.mrp || '';
        document.querySelector(`[name="medicines[0].counter"]`).value = medicine.counter || '';
        document.querySelector(`[name="medicines[0].expiry"]`).value = medicine.expiry ? format(parseISO(medicine.expiry), "yyyy-MM-dd") : '';
      }
    }
  }, [selectedPurchase, selectedMedicine]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMedicines, setFilteredMedicines] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = allMedicines.filter(item =>
        item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredMedicines(filtered);
    } else {
      setFilteredMedicines([]);
    }
  }, [searchTerm, allMedicines]);

  const handleInputChangeSale = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSuggestionClick = (item, index) => {
    setSearchTerm("");
    document.querySelector(`[name="medicines[${index}].counter"]`).value = item.counter
    document.querySelector(`[name="medicines[${index}].batch"]`).value = item.batch
    document.querySelector(`[name="medicines[${index}].name"]`).value = item.name;
    document.querySelector(`[name="medicines[${index}].company"]`).value = item.company;
    document.querySelector(`[name="medicines[${index}].expiry"]`).value = format(parseISO(item.expiry), "yyyy-MM-dd");
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} dialogClassName="modal-90w">
      <Modal.Header closeButton>
        <Modal.Title>{selectedPurchase ? 'Edit' : 'Add'} Purchase History</Modal.Title>
      </Modal.Header>
      <Form method="POST" onSubmit={selectedPurchase ? handleEditHistoryApi : handleAddHistoryApi}>
        <Modal.Body>
          <input type="hidden" name="purchase_id" />
          <div className="row g-2">
            <div className="col-md-6">
              <input type="text" className="form-control" name="vendorName" placeholder="Vendor Name" required />
            </div>
            <div className="col-md-6">
              <input type={today} className="form-control" name="purchaseDate" placeholder="Purchase Date" onFocus={handleInputFocusToday}
                onBlur={handleInputBlurToday} required />
            </div>
          </div>
          {medicines.map((medicine, index) => (
            <div key={index} className="row mt-2 g-2">
              <input type="hidden" name={`medicines[${index}].medicine_id`} />
              <div className="col-md-2">
                <input type="text" className="form-control" name={`medicines[${index}].name`} placeholder="Medicine Name" required onChange={handleInputChangeSale} />
                {filteredMedicines.length > 0 && (
                  <ul className="suggestion-list list-group">
                    {filteredMedicines.map((item, idx) => (
                      <li key={idx} className="suggestion-item list-group-item" onClick={() => handleSuggestionClick(item, index)}>
                        {item.name} - {item.batch} - {format(parseISO(item.expiry), "yyyy-MM-dd")}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="col-md-2 ">
                <input type="text" className="form-control" name={`medicines[${index}].company`} placeholder="Company Name" required />
              </div>
              <div className="col mb-2">
                <input type="number" className="form-control" name={`medicines[${index}].tab`} placeholder="Tab/Unit" required />
              </div>
              <div className="col ">
                <input type="number" className="form-control" name={`medicines[${index}].units`} placeholder="Units" required />
              </div>
              <div className="col ">
                <input type="number" className="form-control" name={`medicines[${index}].packages`} placeholder="Packages" required />
              </div>
              <div className="col-md-1 ">
                <input type="text" className="form-control" name={`medicines[${index}].batch`} placeholder="Batch No" required />
              </div>
              <div className="col ">
                <input type="number" className="form-control" name={`medicines[${index}].rate`} placeholder="Rate" required />
              </div>
              <div className="col ">
                <input type="number" className="form-control" name={`medicines[${index}].mrp`} placeholder="MRP" required />
              </div>
              <div className="col">
                <input type="number" className="form-control" name={`medicines[${index}].counter`} placeholder="Counter No" required />
              </div>
              <div className="col">
                <input type='date' className="form-control" name={`medicines[${index}].expiry`} placeholder="Expiry Date" required />
              </div>
              <div className="col">
                <button type="button" className="btn btn-danger" onClick={() => handleRemoveRow(index)}><MdCancel /></button>
              </div>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          {
            !selectedPurchase ?
              <button type="button" className="btn btn-secondary" onClick={handleAddRow}><IoMdAdd /></button>
              : null
          }
          <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
          <button type="submit" className="btn btn-primary">{selectedPurchase ? 'Update' : 'Save'}</button>
        </Modal.Footer>
      </Form>
    </Modal >
  );
}
