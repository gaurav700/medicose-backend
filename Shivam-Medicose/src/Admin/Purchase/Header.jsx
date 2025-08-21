import React, { useContext } from "react";
import './PurchaseHistory.css'
import { ContextObj } from "../../store/medicose-store";
import { FaDownload, FaFilter, FaPlus } from 'react-icons/fa';

export default function Header() {
  const { filterDatetype, isOpen, toggleCollapse, handleShow, handleFilterPurchase, handleCancelButtonBatch } = useContext(ContextObj);
  return (
    <>
      <div className="header d-flex justify-content-between align-items-center">
        <h3>Purchase history</h3>
        <div className="iconsLast">
          <button className="icon btn custom-button-delete" onClick={toggleCollapse}><FaFilter /></button>
          &nbsp;&nbsp;
          <button className="icon btn custom-button text-white" onClick={handleShow}><FaPlus /></button>
        </div>
      </div>
      {/* collapse for filter */}
      <div className={`collapse ${isOpen ? 'show' : ''}`}>
        <div className="card-body mt-3">
          <form>
            <div className="input-group">
              <input
                type={filterDatetype}
                className="form-control"
                id="filterBatch"
                name="filterBatch"
                placeholder="Enter Batch Number to Search..."
                onChange={handleFilterPurchase}
              />
              <button className="btn btn-outline-secondary" type="button" onClick={handleCancelButtonBatch}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}