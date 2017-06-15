import React from 'react';

const Header = () => (
  <div className="header">
      <div className="header-logo">
          <i className="icon_homedepot"></i>
      </div>
      <div className="header-info">
          <label className="product-info">Test Store Maintenance</label>
      </div>
      <div className="header-search">
      </div>
      <div className="header-actions">
          <div className="active"><i className="icon_bell"></i>Home</div>
          <div><i className="icon_info_outline"></i>About</div>
      </div>
  </div>
);

export default Header;
