import React from 'react';
import './Skeleton.css';

const PopupSkeleton = () => {
  return (
    <div className="popup">
      <div className="popup-content">
        <div className="popup-bonus-skeleton" />
        <div className="popup-date-skeleton" />
      </div>
      <svg
        className="popup-button"
        width="35"
        height="35"
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="17.5" cy="17.5" r="17" stroke="#D4343F" />
        <g clipPath="url(#clip0_1_51)">
          <path
            d="M15.7716 23.1948L21.2284 17.5"
            stroke="#D4343F"
            strokeLinecap="round"
          />
          <path
            d="M15.7716 11.8052L21.2284 17.5"
            stroke="#D4343F"
            strokeLinecap="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_51">
            <rect
              width="7"
              height="13"
              fill="white"
              transform="translate(15 11)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default PopupSkeleton;
