import React, { useContext } from "react";
import { ContextObj } from "../../store/medicose-store"
import Header from "./Header";
import ShowHistory from "./ShowHistory";
import Toast from "./Toast";
import { useNavigate } from 'react-router-dom';
export default function Request() {
  const { sessionCheck } = useContext(ContextObj);
  const navigate = useNavigate();
  return (
    sessionCheck ? (
      <div className="dashboard">
        <Header />
        <Toast />
        <ShowHistory />
      </div>
    ) : navigate('/login')
  );
}