import { IoIosMan } from "react-icons/io";
import { PiCowFill } from "react-icons/pi";
import { LiaDogSolid } from "react-icons/lia";
import { GrUserExpert } from "react-icons/gr";
export default function Feature() {
  return (
    <div className="container px-4 py-5">
      <h2 className="pb-2 border-bottom">What we offers</h2>
      <div className="row align-items-md-center g-5 py-5">
        <div className="col-md-5 d-flex flex-column align-items-start gap-2">
          <h2 className="fw-bold text-body-emphasis">Comprehensive Range of Medicines</h2>
          <p className="text-body-secondary">At our medical store, we offer a comprehensive range of medicines tailored for both humans and animals, including cows, buffaloes, and dogs. Our diverse inventory ensures that you find the right medication for your needs, whether it's for routine health maintenance or specific treatments. We pride ourselves on our wide selection and commitment to quality, making us your go-to source for reliable pharmaceuticals.</p>
        </div>
        <div className="col-md-7">
          <div className="row row-cols-1 row-cols-sm-2 g-4">
            <div className="col d-flex flex-column gap-2">
              <div className="icons-feature text-center">
                <IoIosMan width="1em" height="1em" className="bi" />
              </div>
              <h4 className="fw-semibold mb-0 text-body-emphasis">Human Medicines</h4>
              <p className="text-body-secondary">We provide a variety of medicines for human ailments, including over-the-counter and prescription options. Our knowledgeable staff is here to assist you in finding the right treatment.</p>
            </div>
            <div className="col d-flex flex-column gap-2">
              <div className="icons-feature text-center">
                <PiCowFill />
              </div>
              <h4 className="fw-semibold mb-0 text-body-emphasis">Veterinary Medicines for Cows and Buffaloes</h4>
              <p className="text-body-secondary">We specialize in veterinary medicines for cows and buffaloes, offering antibiotics, vaccines, and nutritional supplements to maintain the health and productivity of your livestock.</p>
            </div>
            <div className="col d-flex flex-column gap-2">
              <div className="icons-feature text-center">
                <LiaDogSolid />
              </div>
              <h4 className="fw-semibold mb-0 text-body-emphasis">Canine Medicines</h4>
              <p className="text-body-secondary">Our store offers a range of medicines for dogs, including treatments for flea and tick control, heartworm prevention, and other common canine ailments.</p>
            </div>
            <div className="col d-flex flex-column gap-2">
              <div className="icons-feature text-center">
                <GrUserExpert />
              </div>
              <h4 className="fw-semibold mb-0 text-body-emphasis">Expert Advice and Support</h4>
              <p className="text-body-secondary">Our staff provides expert advice on the proper usage and dosage of medications, helping you make informed decisions about the health of both humans and animals.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}