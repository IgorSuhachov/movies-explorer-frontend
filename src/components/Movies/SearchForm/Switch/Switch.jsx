import React from 'react';

export default function Switch() {
  return (
    <div className="switch">
      <input type="checkbox" id="switch" className="switch-input" defaultChecked />
      <label htmlFor="switch" className="switch-label" />
      <p className="switch-text">Короткометражки</p>
    </div>
  );
}
