import { Col, Row } from "antd";
const RowVertical = ({ title, children, paddingBottom = 0 }) => {
  return (
    <Row style={{ paddingBottom: paddingBottom }}>
      <Col span={24}>
        <Row className="title-container" style={{ fontSize: 20 }}>
          {title}
        </Row>
        {children}
      </Col>
    </Row>
  );
};
export default RowVertical;
