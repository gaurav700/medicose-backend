import { CiInstagram } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import logo from '../assets/logo.png'
export default function Footer() {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-8 d-flex align-items-center">
          <img src={logo} alt="" height="30px" width="100px" />
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3 footer-icon"><CiInstagram /></li>
          <li className="ms-3 footer-icon"><CiFacebook /></li>
          <li className="ms-3 footer-icon"><CiTwitter /></li>
        </ul>
      </footer>
    </div>

  )
}