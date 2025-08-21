import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ContextObj } from "../../store/medicose-store";
import { Form } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { format, parseISO } from "date-fns";

export default function AddHistory() {
  const { show, handleClose, medicinesSale, handleAddRowSale, handleRemoveRowSale, handleSubmitSale, itemSale, customerSale, medicineItemSale, handleEditSubmitSale, allMedicines } = useContext(ContextObj);

  useEffect(() => {
    if (itemSale && customerSale && medicineItemSale) {
      document.querySelector('[name="sale_id"]').value = itemSale._id || '';
      document.querySelector('[name="todayDate"]').value = itemSale.todayDate ? format(parseISO(itemSale.todayDate), "yyyy-MM-dd") : '';
      document.querySelector('[name="customer_id"]').value = customerSale._id || '';
      document.querySelector('[name="customerName"]').value = customerSale.customerName || '';
      document.querySelector('[name="doctorName"]').value = customerSale.doctorName || '';
      document.querySelector('[name="medicinesSale[0].medicine_id"]').value = medicineItemSale._id || '';
      document.querySelector('[name="medicinesSale[0].typeofmedicine"]').value = medicineItemSale.typeofmedicine || '';
      document.querySelector('[name="medicinesSale[0].name"]').value = medicineItemSale.name || '';
      document.querySelector(`[name="medicinesSale[0].batch"]`).value = medicineItemSale.batch || '';
      document.querySelector('[name="medicinesSale[0].company"]').value = medicineItemSale.company || '';
      document.querySelector('[name="medicinesSale[0].tab"]').value = medicineItemSale.tab || '';
      document.querySelector('[name="medicinesSale[0].units"]').value = medicineItemSale.units || '';
      document.querySelector('[name="medicinesSale[0].mrp"]').value = medicineItemSale.mrp || '';
      document.querySelector('[name="medicinesSale[0].expiry"]').value = medicineItemSale.expiry ? format(parseISO(medicineItemSale.expiry), "yyyy-MM-dd") : '';
    }
  }, [itemSale, customerSale, medicineItemSale]);

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
    document.querySelector(`[name="medicinesSale[${index}].name"]`).value = item.name;
    document.querySelector(`[name="medicinesSale[${index}].company"]`).value = item.company;
    document.querySelector(`[name="medicinesSale[${index}].batch"]`).value = item.batch;
    document.querySelector(`[name="medicinesSale[${index}].expiry"]`).value = format(parseISO(item.expiry), "yyyy-MM-dd");
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} dialogClassName="modal-80w">
      <Modal.Header closeButton>
        <Modal.Title>{itemSale ? 'Edit' : 'Add'} Sale</Modal.Title>
      </Modal.Header>
      <Form method="POST" onSubmit={itemSale ? handleEditSubmitSale : handleSubmitSale}>
        <Modal.Body>
          <div className="row g-2">
            <input type="hidden" name="sale_id" />
            <input type="hidden" name="customer_id" />
            <div className="col-md-4">
              <input type="text" className="form-control" name="customerName" placeholder="Customer Name" required />
            </div>
            <div className="col-md-4">
              <input type="text" className="form-control" name="doctorName" placeholder="Doctor Name" required />
            </div>
            <div className="col-md-4">
              <input type="date" className="form-control" name="todayDate" placeholder="YYYY-MM-DD" />
            </div>
          </div>
          {medicinesSale.map((medicine, index) => (
            <div key={index} className="row mt-3">
              <input type="hidden" name={`medicinesSale[${index}].medicine_id`} />
              <div className="col-md-2">
                <input type="text" className="form-control" name={`medicinesSale[${index}].typeofmedicine`} placeholder="Type Of Medicine" />
              </div>
              <div className="col-md-2">
                <input type="text" className="form-control" name={`medicinesSale[${index}].name`} placeholder="Medicine Name" required onChange={handleInputChangeSale} />
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
              <div className="col">
                <input type="text" className="form-control" name={`medicinesSale[${index}].batch`} placeholder="Batch" required />
              </div>
              <div className="col">
                <input type="text" className="form-control" name={`medicinesSale[${index}].company`} placeholder="Company Name" required />
              </div>
              <div className="col">
                <input type="number" className="form-control" name={`medicinesSale[${index}].tab`} placeholder="Tablets/Units" required />
              </div>
              <div className="col">
                <input type="number" className="form-control" name={`medicinesSale[${index}].units`} placeholder="Units" required />
              </div>
              <div className="col">
                <input type="number" className="form-control" name={`medicinesSale[${index}].mrp`} placeholder="MRP" required />
              </div>
              <div className="col">
                <input type="date" className="form-control" name={`medicinesSale[${index}].expiry`} placeholder="Expiry Date" required />
              </div>
              {!itemSale ? <div className="col">
                <button type="button" className="btn btn-danger" onClick={() => handleRemoveRowSale(index)}><MdCancel /></button>
              </div> : null}
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          {!itemSale ? <button type="button" className="btn btn-secondary" onClick={handleAddRowSale}><IoMdAdd /></button> : null}
          <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
          <button type="submit" className="btn btn-primary">{itemSale ? 'Update' : 'Save'}</button>
        </Modal.Footer>
      </Form>
    </Modal>


  );
}
