import React from "react";
import { Col, Row } from "antd";
import Banner from "../home/Banner";
import Propose from "../home/Propose";
import NewUp from "../home/NewUp";
import History from "../home/History";
import TopManga from "../home/TopManga";
import { histories, proposes } from "../home/index";
import Overview from "./Overview";
import Content from "./Content";
import Chapter from "./Chapter";
import Comment from "./Comment";

const DetailManga = () => {
  const manga = {
    name: "Vua hải tặc",
    image: "https://nettruyen.live/public/images/comics/one-piece.jpg",
    author: "Eiichiro Oda",
    translator: "Smurf Cat",
    status: "Đang Cập Nhật",
    follow: "120,245",
    view: "1,258,268",
    rating: "4.2",
    categories: [
      "Action",
      "Adventure",
      "Comedy",
      "Drama",
      "Fantasy",
      "Shounen",
      "Supernatural",
    ],
    description:
      "One Piece là câu truyện kể về Luffy và các thuyền viên của mình. Khi còn nhỏ, Luffy ước mơ trở thành Vua Hải Tặc. Cuộc sống của cậu bé thay đổi khi cậu vô tình có được sức mạnh có thể co dãn như cao su, nhưng đổi lại, cậu không bao giờ có thể bơi được nữa. Giờ đây, Luffy cùng những người bạn hải tặc của mình ra khơi tìm kiếm kho báu One Piece, kho báu vĩ đại nhất trên thế giới. Trong One Piece, mỗi nhân vật trong đều mang một nét cá tính đặc sắc kết hợp cùng các tình huống kịch tính, lối dẫn truyện hấp dẫn chứa đầy các bước ngoặt bất ngờ và cũng vô cùng hài hước đã biến One Piece trở thành một trong những bộ truyện nổi tiếng nhất không thể bỏ qua. Hãy đọc One Piece để hòa mình vào một thế giới của những hải tặc rộng lớn, đầy màu sắc, sống động và thú vị, cùng đắm chìm với những nhân vật yêu tự do, trên hành trình đi tìm ước mơ của mình.",
    chapters: [
      {
        chapter: 1,
        updateDay: "05/05/2023",
      },
      {
        chapter: 1,
        updateDay: "05/05/2023",
      },
      {
        chapter: 1,
        updateDay: "05/05/2023",
      },
      {
        chapter: 1,
        updateDay: "05/05/2023",
      },
      {
        chapter: 1,
        updateDay: "05/05/2023",
      },
      {
        chapter: 1,
        updateDay: "05/05/2023",
      },
      {
        chapter: 1,
        updateDay: "05/05/2023",
      },
      {
        chapter: 1,
        updateDay: "05/05/2023",
      },
      {
        chapter: 1,
        updateDay: "05/05/2023",
      },
      {
        chapter: 1,
        updateDay: "05/05/2023",
      },
    ],
    comments: {
      total: 2344,
      data: [
        {
          comment: {
            content:
              "Genya lúc hấp thụ tóc với kiếm cụ nhất mạnh hơn mọi trụ cột :)) nghe vô lí nhưng là sự thật .Viên đạn bắn ra có thể đuổi theo mục tiêu đến cụ nhất cũng ko né được kèm cả huyết quỷ thuật rút sạch máu và làm tê liệt. Genya là 1 trong những đứa đc buff ảo nhất để góp phần làm cụ chán đời rồi chết , MVP của cả trận đấy luôn . Genya là nv bị đánh giá thấp nhất toàn bộ truyện , nếu ko có genya cụ nhất thừa hơi cân sạch lũ còn lại.",
            userId: 1,
            user: {
              name: "John",
              image:
                "https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-1/340248805_1479710319503802_5189644552479298591_n.jpg?stp=cp0_dst-jpg_p48x48&_nc_cat=103&ccb=1-7&_nc_sid=5fac6f&_nc_ohc=Xzmyy8abdc4AX8p4KJC&_nc_ht=scontent.fhan15-2.fna&edm=AJqh0Q8EAAAA&oh=00_AfBILQuxE3CcpndLLYWNqsWomFlj_gms5xZiJ7yPdAcrWw&oe=650B4ED4",
            },
            children: [],
          },
        },
      ],
    },
  };

  return (
    <Row style={{ justifyContent: "center" }}>
      <Col span={18}>
        <Row>
          <Col span={16}>
            <Overview manga={manga} />
            <Content content={manga.description} />
            <Chapter chapters={manga.chapters} />
            <Comment comments={manga.comments} />
          </Col>
          <Col span={8}>
            <History histories={histories} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default DetailManga;
