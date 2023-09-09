import React from "react";
import { Col, Row } from "antd";
import "./HomeLayout.scss";

const FooterComponent = () => {
  const box1 = {
    title: "Lien he cho chung toi",
    data: [
      "Điện thoại: 0812345678",
      "Email: efpyi@example.com",
      "Địa chỉ: 0812345678",
      "Số điện thoại: 0812345678",
    ],
  };

  const box2 = {
    title: "Danh cho ung vien",
    data: ["Tim viec lam", "Tim cong ty", "CV"],
  };

  const box3 = {
    title: "Danh cho HR",
    data: ["Dang tuye", "Tim ung vien"],
  };

  const BoxContact = ({ title, data }) => {
    return (
      <Col>
        <Row className="title-box">{title}</Row>
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            return <Row key={index}>{item}</Row>;
          })}
      </Col>
    );
  };
  return (
    <div className="footer">
      <Col>
        <Row className="top-box">
          <Col span={4}>{BoxContact(box1)}</Col>
          <Col span={4}>{BoxContact(box2)}</Col>
          <Col span={4}>{BoxContact(box3)}</Col>
          <Col span={12}>
            <Row className="title-box">Tham gia voi chung toi ngay luc nay</Row>
          </Col>
        </Row>
        <Row
          style={{
            height: 30,
            backgroundColor: "#000000",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          &#169;Ahihi
        </Row>
      </Col>
    </div>
  );
};

export default FooterComponent;
