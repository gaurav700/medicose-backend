import React, { useContext } from "react";
import './Medicine.css';
import Header from "./Header";
import ShowMedicine from "./ShowMedicine"
import { ContextObj } from "../../store/medicose-store"
import { useNavigate } from 'react-router-dom';
import Toast from "../Purchase/Toast";
export default function SalesHistory() {
  const { sessionCheck } = useContext(ContextObj);
  const navigate = useNavigate();
  return (
    sessionCheck ? (
      <div className="dashboard">
        <Header />
        <Toast />
        <ShowMedicine />
      </div>
    ) : navigate('/login')
  );
}
