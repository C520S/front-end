import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "antd/dist/reset.css";
import { Layout, Divider, Table, Typography, Button } from "antd";
import { RedoOutlined } from "@ant-design/icons";

import Header from "../Components/Header";
import MapLeaflet from "../Components/MapLeaflet";

const SingleStationViewPage = () => {
  const { Content } = Layout;
  const { Text, Title } = Typography;
  const { stationName } = useParams();
  const navigate = useNavigate();
  const [singleStationDataSource1, setsingleStationDataSource1] = useState([]);
  const [singleStationDataSource2, setsingleStationDataSource2] = useState([]);
  const [loading, setLoading] = useState(true);

  //  fetch data from 'get single station view' Api
  const fetchRecords = async (nimi) => {
    try {
      const dataFromApi = await axios.get(
        `https://calm-jade-greyhound-yoke.cyclic.app/api/v1/stationList/${nimi}`
      );

      const singleStationData = dataFromApi.data.singleStationViewData;

      setsingleStationDataSource1(singleStationData[0]);

      setsingleStationDataSource2(singleStationData.at(-1));
    } catch (error) {
      alert(
        "We are sorry. The resource you are looking for was not found due to a server error."
      );
    } finally {
      setLoading(false);
    }
  };
  //First presentation of the page
  useEffect(() => {
    fetchRecords(stationName);
  }, [stationName]);

  // back to the StationList page

  const onBack = () => {
    navigate("/stationList");
  };

  const columns = [
    {
      title: !loading ? "Station traffic data" : "",
      dataIndex: "stationData",
      key: "Station traffic data",
    },
    {
      title: !loading ? "Details of the information" : "",
      dataIndex: "detailInformation",
      key: "detail",
    },
  ];

  const data = [
    {
      key: "1",
      stationData: !loading ? "Station identification code" : "",
      detailInformation: singleStationDataSource1.id,
    },
    {
      key: "2",
      stationData: !loading ? "Station name" : "",
      detailInformation: singleStationDataSource1.nimi,
    },
    {
      key: "3",
      stationData: !loading ? "Station address" : "",
      detailInformation: singleStationDataSource1.osoite,
    },

    {
      key: "4",
      stationData: !loading ? "City" : "",
      detailInformation: singleStationDataSource1.kaupunki,
    },

    {
      key: "5",
      stationData: !loading ? "Operators" : "",
      detailInformation: singleStationDataSource1.operaattor,
    },
    {
      key: "6",
      stationData: !loading ? "Bicycle Capacity" : "",
      detailInformation: singleStationDataSource1.kapasiteet,
    },
    {
      key: "7",
      stationData: !loading ? "Average distance from station" : "",
      detailInformation: !loading
        ? `${(
            singleStationDataSource2.averageDistanceofstationDeparture / 1000
          ).toFixed(2)} km`
        : "",
    },
    {
      key: "8",
      stationData: !loading ? "Average distance to station" : "",
      detailInformation: !loading
        ? `${(
            singleStationDataSource2.averageDistanceofstationArrival / 1000
          ).toFixed(2)} km`
        : "",
    },
    {
      key: "9",
      stationData: !loading
        ? "Total number of journeys starting from the station"
        : "",
      detailInformation: singleStationDataSource2.stationDepartureNum,
    },

    {
      key: "10",
      stationData: !loading
        ? "Total number of journeys ending at the station"
        : "",
      detailInformation: singleStationDataSource2.stationArrivalNum,
    },

    {
      key: "11",
      stationData: !loading
        ? "Top 5 most popular return stations for journeys starting from the station"
        : "",
      detailInformation: singleStationDataSource2.popular5start,
    },

    {
      key: "12",
      stationData: !loading
        ? "Top 5 most popular departure stations for journeys ending at the station"
        : "",
      detailInformation: singleStationDataSource2.popular5end,
    },
  ];

  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Header />
        <Divider style={{ borderStyle: "none", borderColor: "transparent" }} />
        <Content>
          {!loading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Title level={2} type="success">
                Station location on the map
              </Title>{" "}
            </div>
          ) : (
            <div></div>
          )}
          {!loading ? (
            <MapLeaflet
              gecode={[singleStationDataSource1.y, singleStationDataSource1.x]}
              popUp={singleStationDataSource1.nimi}
            />
          ) : (
            <div></div>
          )}
          {!loading ? (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={onBack} size="large" icon={<RedoOutlined />}>
                back
              </Button>
            </div>
          ) : (
            <div></div>
          )}
          <Table
            style={{
              boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)",
            }}
            loading={loading}
            columns={columns}
            dataSource={data}
            pagination={false}
            bordered
          />
          <Divider
            style={{ borderStyle: "none", borderColor: "transparent" }}
          />
          <Text italic type="secondary" style={{ textAlign: "center" }}>
            @Data is owned by City Bike Finland
          </Text>
        </Content>
      </Layout>
    </>
  );
};

export default SingleStationViewPage;
