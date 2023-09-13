import React from "react";
import HomeLayout from "../../../layouts/HomeLayout";
import LinkCustom from "../../../components/layout/LinkCustom";

const Home = () => {
  const items = [
    {
      label: <LinkCustom to="/" label="Trang chủ" />,
      key: "home",
    },
    {
      label: <LinkCustom to={"/job"} label="Mới ra mắt" />,
      key: "job",
    },
    {
      label: <LinkCustom to={"/company"} label="Phổ biến" />,
      key: "company",
    },
    {
      label: <LinkCustom to={"/profile/"} label="Thể loại" />,
      key: "profile",
    },
  ];

  return <HomeLayout menu={items}>Hello</HomeLayout>;
};

export default Home;
