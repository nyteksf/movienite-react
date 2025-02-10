import { useState, useRef, useEffect } from "react";

import "@/components/radio-buttons-group.css";

/* MANUAL SELECTION FAUX RADIO BUTTON FUNCTIONALITY */
const RadioButtonsGroup = ({ selectedButton, handleRadioSelect }) => {
    

  return (
    <>
      <div className="radio-panel--wrapper">
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className={`radio__btn radio__btn--${num}${
              selectedButton === num ? " radio__btn--selected" : ""
            }`}
            onClick={() => handleRadioSelect(num)}
          />
        ))}
      </div>
    </>
  );
};

export default RadioButtonsGroup;
