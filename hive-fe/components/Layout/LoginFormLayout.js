import React from 'react';
import Card from '../Shared/SmallComponents/Card';

// SPRITE
import sprite from '../../Assets/imagery/svg/sprite.svg';
import LoginLayout from './LoginLayout';

const LoginFormLayout = ({children, title, size = 'small', classes}) => {
  return (
    <LoginLayout>
      <Card
        classes={`login_form m-auto ${size === 'small' ? 'small' : 'big'} ${classes}`}
      >

        <header className={`u-center login_form_header `}>
          <svg className="login_form_logo col-b mb-3">
            <use xlinkHref={sprite + '#logo_box'} />
          </svg>

          <h4 className="heading_med  cap col-bl">{title}</h4>
        </header>

        <div className="login_form_contents">
          {children}
        </div>

      </Card>
    </LoginLayout>
  );
};

export default LoginFormLayout;
