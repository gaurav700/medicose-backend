import React, { useContext } from "react";
import Notification from "./Notification";
import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";
import "./Dashboard.css";
import { ContextObj } from "../../store/medicose-store"
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { sessionCheck } = useContext(ContextObj);
  const navigate = useNavigate();
  return (
    sessionCheck ? (
      <div className="dashboard">
        <Row1 />
        <Row2 />
        <Row3 />
        <Notification />
      </div>
    ) : navigate('/login')
  );
}