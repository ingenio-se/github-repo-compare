import React from 'react';
import './Modal.css'; // Make sure to create a corresponding CSS file
import Button from './Button'; // Assuming Button is in the same common directory

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        {children}
        <Button className="modal-close" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default Modal;
