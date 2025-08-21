import React, { useContext } from "react";
import { ContextObj } from "../../store/medicose-store";

export default function Row3() {
  const { cardsData } = useContext(ContextObj);

  return (
    <div className="row row3">
      {cardsData.map((card, index) => (
        <div key={index} className="col-md-3 col-sm-6 mb-3">
          <div className={`card text-center ${card.border}`}>
            <div className={`card-body ${card.text}`}>
              <h5 className="card-title">{card.logo}</h5>
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text">{card.body}</p>
            </div>
            <div className={`card-footer bg-transparent ${card.border} ${card.text}`} style={{ cursor: "pointer" }}>
              {card.footer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
