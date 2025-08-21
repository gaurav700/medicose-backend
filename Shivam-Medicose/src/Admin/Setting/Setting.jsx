import React, { useContext } from "react";
import { ContextObj } from "../../store/medicose-store"
import Stack from '@mui/material/Stack';
import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export default function Setting() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: 'GET',
      });
      const responseData = await response.json();
      if (responseData.message == 'Logged out successfully') {
        sessionStorage.removeItem('userId');
        navigate("/login");
      }
    } catch (err) {
      console.log(error);
    }
  }
  const { sessionCheck } = useContext(ContextObj);

  return (
    sessionCheck ? (
      <div className="dashboard">
        <div className="header d-flex justify-content-between align-items-center">
          <h3>Setting</h3>
          <div className="iconsLast">
            <button className="icon btn custom-button-delete text-black" onClick={handleLogout}><MdLogout /></button>
          </div>
        </div>

        <div className="notification">
          <Stack sx={{ width: '100%' }} spacing={2}>
            <div className="row mt-3 border vendor-row">

              <form>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="exampleInputName1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="exampleInputName1" />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-4">
                    <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="exampleInputPassword2" className="form-label">Re-Enter New Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword2" />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label htmlFor="exampleInputImage1" className="form-label">Profile Image</label>
                    <input type="file" className="form-control" id="exampleInputImage1" />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>

            </div>
          </Stack>
        </div>
      </div>
    ) : navigate('/login')
  );
}
