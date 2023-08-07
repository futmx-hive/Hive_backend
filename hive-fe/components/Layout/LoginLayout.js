import React from 'react';

const LoginLayout = ({children}) => {
  return (
    <div className="fill bg-pri  fixed  login_layout">
      <div className="login_layout_content">
        {children}
      </div>
    </div>
  );
};

export default LoginLayout;
