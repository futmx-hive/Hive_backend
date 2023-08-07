import React from 'react';
import svgSprite from '../../images/sprite.svg';

const Verifybutton = ({status}) => {
  return (
    <span className={`verify round ${status}`}>
      <svg className="large verify_svg  center-abs col-w-1">
        <use xlinkHref={svgSprite + '#tick'} />
      </svg>
    </span>
  );
};

export default Verifybutton;
