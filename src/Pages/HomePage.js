import React from "react";
import "antd/dist/reset.css";
import { Layout, Divider, Typography } from "antd";
import Header from "../Components/Header";
import CarouselForHome from "../Components/CarouselForHome";

const HomePage = () => {
  const { Content } = Layout;
  const { Title, Paragraph } = Typography;

  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Header />
        <Divider style={{ borderStyle: "none", borderColor: "transparent" }} />
        <Content style={{ textAlign: "center" }}>
          <div style={{ margin: "0 auto", backgroundColor: "#f5f5f5" }}>
            <Title>Welcome to my Panda Helsinki Citybike website!</Title>
            <CarouselForHome />
            <Divider
              style={{ borderStyle: "none", borderColor: "transparent" }}
            />
            <Paragraph
            id="my-content"
              ellipsis={{ rows: 5 }}
              style={{ width: "80vw", margin: "0 auto" }}
            >
              Welcome to our website, where you can find comprehensive data on
              bike-share trips in the Helsinki and Espoo area for the month of
              May 2021. Our app provides a range of statistics on user trips,
              such as station addresses, capacity, number of pick-ups and
              drop-offs, and average distance between stations. Our easy-to-use
              table format allows you to easily compare statistics from
              different stations. We have also included a map showing the
              location of each station, so you can see the bike stations in
              their geographic context. Our aim is to provide an easy-to-use
              interface that allows you to access and explore the data
              effortlessly.
            </Paragraph>
          </div>
        </Content>
        <Divider />
      </Layout>
    </>
  );
};

export default HomePage;
