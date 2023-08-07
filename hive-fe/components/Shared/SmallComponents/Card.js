import React from 'react';
import {motion} from 'framer-motion';

const Card = ({children, classes, stop = false, animated, ...rest}) => {
  if (!animated)
    return (
      <div
        className={`br bg-w ${classes}`}
        onClick={e => stop && e.stopPropagation ()}
      >
        {children}
      </div>
    );

  return (
    <motion.div
      className={`br bg-w ${classes}`}
      onClick={e => stop && e.stopPropagation ()}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default Card;
