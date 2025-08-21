import React, { useContext } from "react";
import { ContextObj } from "../../store/medicose-store";

export default function Toast() {
  const { flash, handleCloseAlert } = useContext(ContextObj);
  return (
    <>
      {flash && (
        <div className="toast-container position-fixed bottom-0 end-0 p-3 ">
          <div id="liveToast" className="toast show custom-button" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-body">
              {flash}
              <div className="float-end">
                <small>Just Now</small> &nbsp;
                <button type="button" className="btn-close float-end" data-bs-dismiss="toast" aria-label="Close" onClick={handleCloseAlert}></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}