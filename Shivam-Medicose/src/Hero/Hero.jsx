import React from "react"
import hero from '../assets/Hero.png'
import styles from './Hero.module.css';
export default function Hero() {
  return (
    <div className="container col-xxl-8 px-4 py-5">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div className="col-10 col-sm-8 col-lg-6">
          <img src={hero} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
        </div>
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Welcome to Your Trusted Medical Store</h1>
          <p className="lead">Discover a wide range of healthcare products and services tailored to meet your needs. From prescription medications to over-the-counter remedies, we provide high-quality products to ensure your well-being.</p>
          <button type="button" className={`${styles.button}`}>Explore Our Services</button>
        </div>
      </div>
    </div>
  )
}