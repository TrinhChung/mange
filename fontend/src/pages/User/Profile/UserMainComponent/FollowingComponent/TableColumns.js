import StoryItem from '../UserStory/StoryItem';

const tableColumns = [
  {
    title: 'TÊN TRUYỆN',
    dataIndex: 'manga',
    key: 'manga',
    render: (manga) => <StoryItem manga={manga} />,
  },
  {
    title: 'HÀNH ĐỘNG',
    dataIndex: 'action',
    render: (text) => <div style={{ fontSize: 22 }}>{text}</div>,
    key: 'action',
    align: 'center',
    width: '20%',
  },
];

export default tableColumns;
