import { Avatar, Col, Row } from 'antd';
import React, { useContext } from 'react';
import { AuthContext } from '../../providers/authProvider';

const AvatarArea = () => {
  const { authUser, setAuthUser } = useContext(AuthContext);

  return (
    <Row
      className="box-content"
      style={{ justifyContent: 'center', marginRight: 10 }}
    >
      <Col>
        <Row style={{ color: 'var(--gray)', justifyContent: 'center' }}>
          <Avatar
            src="https://i.pinimg.com/736x/1e/78/af/1e78afc892fb0be95723c2f391d15808.jpg"
            size={180}
          />
        </Row>
        <Row
          style={{
            color: 'var(--gray)',
            marginBottom: 20,
            marginTop: 28,
            justifyContent: 'center',
          }}
          className="title-children"
        >
          <Col style={{ fontSize: 32 }}>a Chung iu e K66</Col>
        </Row>
        {authUser && authUser.role === 'user' ? (
          <>
            <Row
              style={{ color: 'var(--gray)', justifyContent: 'center' }}
              className="title-children"
            >
              <Col style={{ fontSize: 16 }} className="color-jade">
                ĐỘC GIẢ
              </Col>
            </Row>
            <Row
              style={{ color: 'var(--gray)', justifyContent: 'center' }}
              className="title-children"
            >
              <Col style={{ fontSize: 16 }} className="color-main">
                VIP 10
              </Col>
            </Row>
          </>
        ) : (
          <Row
            style={{ color: 'var(--gray)', justifyContent: 'center' }}
            className="title-children"
          >
            <Col style={{ fontSize: 16 }} className="color-main">
              ADMIN
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default AvatarArea;
