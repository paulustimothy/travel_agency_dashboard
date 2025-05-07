import React from "react";

const InfoPill = ({ text, image }: InfoPillProps) => {
  return (
    <figure className="info-pill max-w-[450px] flex items-center gap-2">
      <img src={image} alt={text} className="w-4 h-4" />

      <figcaption className="truncate overflow-hidden whitespace-nowrap">
        {text}
      </figcaption>
    </figure>
  );
};

export default InfoPill;
