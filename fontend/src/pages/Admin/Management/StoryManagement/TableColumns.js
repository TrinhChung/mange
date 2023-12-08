import StoryRow from '../../../../components/management/story-row';

const tableColumns = [
  {
    title: 'TÊN TRUYỆN',
    dataIndex: 'manga',
    key: 'manga',
    render: (manga) => <StoryRow manga={manga} />,
    width: '35%',
  },
  {
    title: 'TÁC GIẢ',
    dataIndex: 'authors',
    key: 'authors',
    align: 'center',
    width: '20%',
  },
  {
    title: 'LƯỢT XEM',
    dataIndex: 'view',
    key: 'view',
    align: 'center',
    width: '14%',
  },
  {
    title: 'THEO RÕI',
    dataIndex: 'follow',
    key: 'follow',
    align: 'center',
    width: '14%',
  },
  {
    title: 'HÀNH ĐỘNG',
    dataIndex: 'action',
    render: (text) => (
      <div
        style={{
          display: 'flex',
          gap: 16,
          justifyContent: 'center',
          fontSize: 20,
        }}
      >
        {text}
      </div>
    ),
    key: 'action',
    align: 'center',
    width: '14%',
  },
];

export default tableColumns;
