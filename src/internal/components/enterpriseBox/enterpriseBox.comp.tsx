import React from 'react';

import './enterpriseBox.scss';

export const EnterpriseBox = () => {
  return (
    <div className="enterprise-box">
      <aside>Still not enough?</aside>
      <div className="text">
        If none of the premium plans we offer is enough for you - worry not! Contact us at&nbsp;
        <a href="mailto:contact@commoninja.com">contact@commoninja.com</a>&nbsp;
        and we'll do our best to offer you a custom tailored plan. <br /><br/>
        <strong>We do offer plans for enterprises.</strong>
      </div>
    </div>
  );
}