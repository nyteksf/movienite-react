import { useEffect, useRef, useState } from "react";

import "@/components/dynamic-quality-slider.css";

const DynamicQualitySlider = ({
  isPlayClicked,
  uniqueHashesEtc,
  onQualitySelect,
  selectedQuality,
}) => {
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const containerRef = useRef(null);
  const labelsRef = useRef([]);

  const handleQualitySelect = (quality, hash, index) => {
    onQualitySelect(quality, hash);
    moveIndicator(index);
  };

  const moveIndicator = (index) => {
    if (!labelsRef.current[index] || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const label = labelsRef.current[index];
    const labelRect = label.getBoundingClientRect();
    
    let position = 0;
    if (index === 0) {
      // For the first label, the circle's left edge is at the label's left.
      // The circle's center is 10px to the right of the label's left.
      position = labelRect.left - containerRect.left + 10;
    } else if (index === uniqueHashesEtc.length - 1) {
      // For the last label, the circle's right edge is at the label's right.
      // The circle's center is 10px to the left of the label's right.
      position = labelRect.right - containerRect.left - 10;
    } else {
      // For the other labels, the pseudo-element is centered in the label.
      position = labelRect.left - containerRect.left + (labelRect.width / 2);
    }
    
    setIndicatorPosition(position);
  };  

  useEffect(() => {
    if (selectedQuality && uniqueHashesEtc?.length) {
      const index = uniqueHashesEtc.findIndex(
        (item) => item.quality === selectedQuality
      );
      if (index !== -1) {
        moveIndicator(index);
      }
    }
  }, [selectedQuality, uniqueHashesEtc]);

  if (!isPlayClicked || !uniqueHashesEtc?.length) return null;

  return (
    <div className="slider-container" ref={containerRef}>
      <div className="slider-labels">
        {uniqueHashesEtc.map((item, index) => (
          <div
            key={item.hash}
            hash={item.hash}
            ref={(el) => (labelsRef.current[index] = el)}
            className={`slider-label ${
              selectedQuality === item.quality ? "selected" : ""
            }`}
            onClick={() => handleQualitySelect(item.quality, item.hash, index)}
          >
            {item.quality}
          </div>
        ))}
      </div>

      <div className="slider-track">
        {uniqueHashesEtc.map((item, index) => (
          <button
            key={item.hash}
            className={`slider-btn ${
              selectedQuality === item.quality ? "selected" : ""
            }`}
            onClick={() => handleQualitySelect(item.quality, item.hash, index)}
          />
        ))}

        <div
          className={`slider-indicator ${!selectedQuality ? "hidden" : ""}`}
          style={{
            left: `${indicatorPosition}px`,
            transform: "translateX(-50%)",
          }}
        />
      </div>
    </div>
  );
};

export default DynamicQualitySlider;
