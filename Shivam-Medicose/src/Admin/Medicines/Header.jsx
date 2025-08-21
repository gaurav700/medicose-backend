import React, { useContext } from "react";
import './Medicine.css'
import { ContextObj } from "../../store/medicose-store";
import { FaDownload, FaFilter, FaPlus } from 'react-icons/fa';

export default function Header() {
  const { isOpen, toggleCollapse, handleFilterChangeMedicine } = useContext(ContextObj);
  return (
    <>
      <div className="header d-flex justify-content-between align-items-center">
        <h3>Medicines List</h3>
        <div className="iconsLast">
          <button className="icon btn custom-button-delete text-black"><FaDownload /></button>
          &nbsp; &nbsp;
          <button className="icon btn custom-button-delete" onClick={toggleCollapse}><FaFilter /></button>
        </div>
      </div>
      {/* collapse for filter */}
      <div className={`collapse ${isOpen ? 'show' : ''}`}>
        <div className="card-body mt-3">
          <form>
            <div>
              <input
                type="text"
                className="form-control"
                id="filterDate"
                name="filterDate"
                placeholder="Enter Medicine Name to Search"
                onChange={handleFilterChangeMedicine}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}