import { useState, useRef, useContext } from 'react';
import { DownOutlined } from '@ant-design/icons';
import DropdownCustom from './DropdownCustom';
import { Col, Row } from 'antd';
import { MangaContext } from '../../providers/mangaProvider/index';
import './WrapCategory.scss';
const WrapCategory = () => {
  const { categories } = useContext(MangaContext);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const wrapperDropdown = useRef(null);
  return (
    <label
      ref={wrapperDropdown}
      onMouseMove={() => {
        setIsOpenDropdown(true);
      }}
      className="category-menu-item"
    >
      Thể loại
      <DownOutlined style={{ paddingLeft: 4 }} />
      <DropdownCustom
        open={isOpenDropdown}
        setOpen={setIsOpenDropdown}
        parent={wrapperDropdown}
        top={58}
        width="508px"
      >
        <Col span={24} className="box-category-menu">
          <Row>
            {categories &&
              categories.map((category) => {
                return <Col className="category-label">{category?.name}</Col>;
              })}
          </Row>
        </Col>
      </DropdownCustom>
    </label>
  );
};

export default WrapCategory;
