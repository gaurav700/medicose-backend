import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import MedicoseProvider from './store/medicose-store.jsx';
import Sidebar from './Admin/Sidebar.jsx';
import LoginModal from './Admin/LoginModal.jsx';
import Dashboard from './Admin/Dashboard/Dashboard.jsx';
import PurchaseHistory from './Admin/Purchase/PurchaseHistory.jsx';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import medicoseStore from '../src/store/index.js'
import SalesHistory from './Admin/Sales/SalesHistory.jsx';
import Medicine from './Admin/Medicines/Medicine.jsx'
import Request from './Admin/Request/Request.jsx';
import Setting from './Admin/Setting/Setting.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <Sidebar />,
    children: [
      {
        path: "", // Removed "/admin" from here to make it relative to "/admin"
        element: <Dashboard />
      },
      {
        path: "purchase", // Removed "/admin" from here to make it relative to "/admin"
        element: <PurchaseHistory />
      }, {
        path: "sales",
        element: <SalesHistory />
      },
      {
        path: "medicine",
        element: <Medicine />
      },
      {
        path: "request",
        element: <Request />
      }, {
        path: "setting",
        element: <Setting />
      }
    ]
  }, {
    path: "/login",
    element: <LoginModal />
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={medicoseStore}>
    <MedicoseProvider>
      <RouterProvider router={router} />
    </MedicoseProvider>
  </Provider>
)
