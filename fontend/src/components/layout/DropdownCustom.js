import { Col, Row } from 'antd';
import React, { useEffect, useRef } from 'react';
import './DropdownCustom.scss';

const DropdownCustom = ({
  open = false,
  setOpen = () => {},
  top = 55,
  parent,
  children,
  width = '100%',
}) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (parent && parent.current && !parent.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [parent]);

  return (
    <Row
      className={`dropdown-custom box-shadow ${
        open === false ? 'hidden-dropdown' : ''
      }`}
      onClick={(e) => {
        e.stopPropagation();
      }}
      style={{ top: top, width: width }}
    >
      {children}
    </Row>
  );
};

export default DropdownCustom;
