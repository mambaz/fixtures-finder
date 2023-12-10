import React from "react";
import FixtureComponent from "./fixtureComponent";

interface ModalProps {
  handleClose: () => void;
  show: boolean;
  fixtures: any[]; // Add fixtures prop
  title?: string; // Optional title prop
  description?: string; // Optional description prop
}

export const ModalComponent: React.FC<ModalProps> = ({ handleClose, show, fixtures, title, description }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <section className="modal-header">
            {title && <h2>{title}</h2>}
            {description && <p>{description}</p>}
            <button type="button" className="modal-header-x-btn" onClick={handleClose}>x</button>
          </section>
          <section className="modal-body">
          <ul>
            {fixtures.map((data: any) => (
              <li key={data.fixture.id}>
                <FixtureComponent data={data} />
              </li>
            ))}
          </ul>
          </section>
          <section className="modal-footer">
            <button type="button" className="btn-close" onClick={handleClose}>
              Close
            </button>
          </section>
        </section>
      </div>
    );
  };

export default ModalComponent;
