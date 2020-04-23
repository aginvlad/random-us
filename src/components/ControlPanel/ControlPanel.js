import React from 'react';
import './ControlPanel.sass';

const controlPanel = props => {
  const { section, changeSection } = props;
  return (
    <footer className="bottom-control-panel">
      <div className="footer-btn-group">
        <i
          className={`${
            section === 0 ? 'footer-btn-group__item--active' : ''
          } footer-btn-group__item fas fa-layer-group`}
          onClick={() => changeSection(0)}
        ></i>
        <i
          className={`${
            section === 1 ? 'footer-btn-group__item--active' : ''
          } footer-btn-group__item far fa-ballot`}
          onClick={() => changeSection(1)}
        ></i>
        <i
          className={`${
            section === 2 ? 'footer-btn-group__item--active' : ''
          } footer-btn-group__item far fa-bell`}
          onClick={() => changeSection(2)}
        ></i>
        <i
          className={`${
            section === 3 ? 'footer-btn-group__item--active' : ''
          } footer-btn-group__item far fa-info-circle`}
          onClick={() => changeSection(3)}
        ></i>
      </div>
    </footer>
  );
};

export default controlPanel;
