import React, { useContext, useState } from 'react';
import styles from './Header.module.css';
import logo from '../assets/logo.png';
import { ContextObj } from '../store/medicose-store';
import Modal from './Modal';

export default function Header() {
  const { searchTerm, suggestions, showModal, selectedMedicineUser, handleSearchChange, handleSuggestionClick, handleCloseModal, handleRequestClick } = useContext(ContextObj);

  return (
    <div className="container-fluid">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className={`col-md-3 mb-2 mb-md-0 ${styles.logo}`}>
          <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
            <img src={logo} alt="" className="bi" width="190" height="50" role="img" />
          </a>
        </div>

        <div className={`nav col-12 col-md-4 mb-2 justify-content-center mb-md-0`}>
          <input
            placeholder='Search anything here...'
            className={styles.searchbar}
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {suggestions.length > 0 && (
            <div className={styles.suggestions}>
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={styles.suggestion}
                  onClick={() => handleSuggestionClick(suggestion.name)}
                >
                  {suggestion.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={`col-md-3 mb-2 mb-md-0 ${styles.logo}`}>
          <button className={`${styles.button}`} onClick={handleRequestClick}>Request Medicine</button>
        </div>
      </header>

      {showModal && (
        <Modal
          show={showModal}
          medicine={selectedMedicineUser}
          onClose={handleCloseModal}
        />

      )}

      {showModal && (
        <Modal
          show={showModal}
          medicine={selectedMedicineUser}
          onClose={handleCloseModal}
        />

      )}

    </div>
  );
}
