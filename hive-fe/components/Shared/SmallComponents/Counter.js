import React from 'react';
import sprite from '../../../Assets/imagery/svg/sprite.svg';

const Counter = ({inc, dec, count}) => {
  return (
    <div className="counter   flexi">
      <button className="counter_btn btn_blue u-center br" onClick={inc}>
        <svg className="tiny_svg col-w" style={{stroke: '#fff'}}>
          <use xlinkHref={sprite + '#plus'} />
        </svg>
      </button>
      <span className="col-bl counter_txt">
        1
      </span>
      <button className="counter_btn btn_blue u-center br" onClick={dec}>
        <svg className="tiny_svg">
          <use xlinkHref={sprite + '#minus'} />
        </svg>
      </button>
    </div>
  );
};

export default Counter;
