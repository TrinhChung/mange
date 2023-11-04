import StoryRow from './StoryRow';

const tableColumns = [
  {
    title: 'TÊN TRUYỆN',
    dataIndex: 'title',
    key: 'title',
    render: (manga) => <StoryRow manga={manga} />,
    width: '35%',
  },
  {
    title: 'USERNAME',
    dataIndex: 'username',
    key: 'username',
    align: 'center',
  },
  {
    title: 'NỘI DUNG BÌNH LUẬN',
    dataIndex: 'content',
    key: 'content',
    width: '35%',
  },
  {
    title: 'ĐÁNH GIÁ',
    dataIndex: 'evaluation',
    render: (text) => <div style={{ fontSize: 22 }}>{text}</div>,
    key: 'evaluation',
    align: 'center',
  },
];

export default tableColumns;
