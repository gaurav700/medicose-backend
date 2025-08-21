import React, { useContext } from "react";
import { ContextObj } from "../../store/medicose-store"
import './PurchaseHistory.css';
import AddHistory from "./AddHistory";
import ShowHistory from "./ShowHistory";
import Header from "./Header";
import Toast from "./Toast";
import { useNavigate } from 'react-router-dom';

export default function PurchaseHistory() {
  const { sessionCheck } = useContext(ContextObj);
  const navigate = useNavigate();
  return (
    sessionCheck ? (
      <div className="dashboard">
        <Header />
        <Toast />
        <AddHistory />
        <ShowHistory />
      </div>
    ) : navigate('/login')
  );
}
