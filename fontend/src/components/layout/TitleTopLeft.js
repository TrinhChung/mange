import { Breadcrumb, Col, Row } from 'antd';
import React from 'react';

const TitleTopLeft = ({ title, itemList }) => {
  return (
    <div span={24}>
      <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>
        {title}
      </div>
      <Breadcrumb separator=">>" items={itemList} />
    </div>
  );
};

export default TitleTopLeft;
