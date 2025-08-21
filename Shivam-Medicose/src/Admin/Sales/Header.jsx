import React, { useContext } from "react";
import './SalesHistory.css'
import { ContextObj } from "../../store/medicose-store";
import { FaDownload, FaFilter, FaPlus } from 'react-icons/fa';

export default function Header() {
  const { filterDatetype, isOpen, toggleCollapse, handleShow, handleFilterNameSale, handleCancelButton } = useContext(ContextObj);

  return (
    <>
      <div className="header d-flex justify-content-between align-items-center">
        <h3>Sales history</h3>
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
                id="filterName"
                name="filtername"
                placeholder="Enter Customer Name to Search..."
                onChange={handleFilterNameSale}
              />
              <button className="btn btn-outline-secondary" type="button" onClick={handleCancelButton}>Cancel</button>
            </div>
          </form>
        </div >
      </div >
    </>
  )
}