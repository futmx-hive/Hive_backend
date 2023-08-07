import React, {useEffect} from 'react';

// const UseClickOutsideToclose = (isOpen, close, toogle) => {
//   useEffect (
//     () => {
//       console.log ({isOpen});
//       if (isOpen) document.addEventListener ('click', close);

//       return () => {
//         document.removeEventListener ('click', () => {
//           close ();
//         });
//       };
//     },
//     [isOpen, close, toogle]
//   );

//   return null;
// };
const UseClickOutsideToclose = (ref, close) => {
  const handler = e => {
    if (ref.current && !ref.current.contains (e.target)) close ();
  };
  useEffect (
    () => {
      document.addEventListener ('click', handler);

      return () => {
        document.removeEventListener ('click', handler);
      };
    },
    [ref, close]
  );

  return null;
};

export default UseClickOutsideToclose;
