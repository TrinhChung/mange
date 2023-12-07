import StoryRow from './StoryRow';

const tableColumns = [
  {
    title: 'TÊN TRUYỆN',
    dataIndex: 'manga',
    key: 'manga',
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
    title: 'NỘI DUNG',
    dataIndex: 'content',
    key: 'content',
    width: '35%',
  },
  {
    title: 'XÓA',
    dataIndex: 'action',
    render: (text) => <div style={{ fontSize: 22 }}>{text}</div>,
    key: 'action',
    align: 'center',
  },
];

export default tableColumns;
