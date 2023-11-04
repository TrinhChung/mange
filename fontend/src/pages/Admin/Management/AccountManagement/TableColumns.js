import { Avatar } from 'antd';

const tableColumns = [
  {
    title: 'AVATAR',
    dataIndex: 'avatar',
    render: (avatarURL) => <Avatar src={avatarURL} size={48} />,
    key: 'avatar',
    align: 'center',
  },
  {
    title: 'TÊN HIỂN THỊ',
    dataIndex: 'displayName',
    key: 'displayName',
    align: 'center',
  },
  {
    title: 'USERNAME',
    dataIndex: 'username',
    key: 'username',
    align: 'center',
  },
  {
    title: 'EMAIL',
    dataIndex: 'email',
    key: 'email',
    align: 'center',
  },
  {
    title: 'TÌNH TRẠNG',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
  },
  {
    title: 'HÀNH ĐỘNG',
    dataIndex: 'action',
    render: (children) => (
      <div
        style={{
          display: 'flex',
          gap: 12,
          justifyContent: 'center',
          fontSize: 20,
        }}
      >
        {children}
      </div>
    ),
    key: 'action',
    align: 'center',
  },
];

export default tableColumns;
