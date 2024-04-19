import React from "react";

export const HamburgerIcon = ({ height, width }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="21" y2="12" />
      <line x1="5" y1="6" x2="21" y2="6" />
      <line x1="5" y1="18" x2="21" y2="18" />
    </svg>
  );
};
