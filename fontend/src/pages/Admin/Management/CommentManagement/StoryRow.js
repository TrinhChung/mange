import { Col, Image, Row } from 'antd';
import React from 'react';

const StoryRow = ({ manga }) => {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Image
        src={manga ? manga.image : null}
        preview={false}
        width={45}
        height={60}
      />
      <div>
        <div
          style={{
            color: 'var(--gray)',
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          {manga.name}
        </div>
        <div
          style={{
            color: 'var(--gray)',
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          Chapter {manga.chap}
        </div>
      </div>
    </div>
  );
};

export default StoryRow;
