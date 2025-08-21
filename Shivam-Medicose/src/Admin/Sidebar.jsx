import React, { useState, useContext } from "react";
import logo from '../assets/logo.png';
import { MdNavigateNext, MdDashboard } from "react-icons/md";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { FaPills } from "react-icons/fa";
import { CiSquareQuestion } from "react-icons/ci";
import { FcSalesPerformance } from "react-icons/fc";
import { IoIosSettings } from "react-icons/io";
import { Outlet } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ContextObj } from "../store/medicose-store"
export default function Sidebar() {
  const { sessionCheck } = useContext(ContextObj);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(true);
  const handleButton = () => {
    setToggle(!toggle);
  };
  return (
    sessionCheck ? (
      <div className="row sidebar1">
        <div className={!toggle ? 'col-md-1' : 'col-md-2'}>
          <nav className={toggle ? 'active' : ''}>
            <div className="sidebar-header">
              <div className="logo-wrapper">
                <img src={logo} alt="Logo" />
              </div>
              <button className="toggle-btn" onClick={handleButton}>
                <MdNavigateNext size={24} />
              </button>
            </div>
            <div className="sidebar-links">
              <Link to="/admin/">
                <a className="link active">
                  <MdDashboard size={24} />
                  <span className="hidden">Home</span>
                </a>
              </Link>
              <Link to="/admin/purchase">
                <a className="link">
                  <BiSolidPurchaseTag size={24} />
                  <span className="hidden">Purchase</span>
                </a>
              </Link>
              <Link to="/admin/sales">
                <a className="link">
                  <FcSalesPerformance size={24} />
                  <span className="hidden">Sales</span>
                </a>
              </Link>
              <Link to="/admin/medicine">
                <a className="link">
                  <FaPills size={24} />
                  <span className="hidden">Medicines</span>
                </a>
              </Link>
              <Link to="/admin/request">
                <a className="link">
                  <CiSquareQuestion size={24} />
                  <span className="hidden">Requests</span>
                </a>
              </Link>
            </div>
            <div className="sidebar-bottom">
              <div className="sidebar-links">
                <Link to="/admin/setting">
                  <a className="link">
                    <IoIosSettings size={24} />
                    <span className="hidden">Settings</span>
                  </a>
                </Link>
              </div>
              <div className="user-profile">
                <div className="user-avatar">
                  <img src={logo} alt="User Avatar" />
                </div>
                <div className="user-details hidden">
                  <p className="username">Ashutosh Joshi</p>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className={!toggle ? 'col-md-11' : 'col-md-10'}>
          <Outlet />
        </div>
      </div>) : navigate('/login')
  );
}


