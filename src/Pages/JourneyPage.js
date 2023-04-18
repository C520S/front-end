import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "antd/dist/reset.css";
import { Layout, Divider, Table, Input, Button, Typography } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import Header from "../Components/Header";

const JourneyPage = () => {
  //antd
  const { Content } = Layout;
  const { Search } = Input;
  const { Text } = Typography;
  const pageSize = 15;
  const [journeyDataSource, setJourneyDataSource] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [searchingValue, setSearchingValue] = useState("");

  //  format "DD/MM/YYYY"
  const changeDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  //  Search data from 'Get all Journey list' Api
  const onSearch = (value) => {
    setSearchingValue(value);
  };

  // fetch data from wtih Search API
  const fetchDataWithSearch = async (page, search) => {
    try {
      setLoading(true);

      const dataFromApi = await axios.get(
        `https://calm-jade-greyhound-yoke.cyclic.app/api/v1/journeys?page=${page}&search=${search}`
      );

      const journeysData = dataFromApi.data.data.journeysData;

      const totalPages = dataFromApi.data.data.totalPages;
      const totalPNumofData = totalPages * pageSize;
      setJourneyDataSource(journeysData);
      setTotal(totalPNumofData);
    } catch (error) {
      alert("Please enter the name of the relevant departure station.");
    } finally {
      setLoading(false);
    }
  };

  //  fetch data from 'Get all Journey list' Api

  const fetchRecords = async (page) => {
    try {
     

      const dataFromApi = await axios.get(
        `https://calm-jade-greyhound-yoke.cyclic.app/api/v1/journeys?page=${page}`
      );

      const journeysData = dataFromApi.data.data.journeysData;

      const totalPages = dataFromApi.data.data.totalPages;
      const totalPNumofData = totalPages * pageSize;
      setJourneyDataSource(journeysData);
      setTotal(totalPNumofData);
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
    fetchRecords(1);
  }, []);

  //Render page when searchingValue is updated
  useEffect(() => {
    if (searchingValue === "") return;
    fetchDataWithSearch(1, searchingValue);
  }, [searchingValue]);

  const columns = [
    {
      title: "Departure places",
      dataIndex: "departureStationName",
      key: "departureStationName",
      // check to ensure that the values being compared are not undefined before calling localeCompare
      sorter: (a, b) =>
        a.departureStationName &&
        b.departureStationName &&
        a.departureStationName.localeCompare(b.departureStationName),
    },
    {
      title: "Departure time",
      dataIndex: "departureTime",
      key: "departureTime",
      render: (departureTime) => {
        return changeDate(departureTime);
      },
    },
    {
      title: "Return places",
      dataIndex: "returnStationName",
      key: "returnStationName",
      // check to ensure that the values being compared are not undefined before calling localeCompare
      sorter: (a, b) =>
        a.returnStationName &&
        b.returnStationName &&
        a.returnStationName.localeCompare(b.returnStationName),
    },

    {
      title: "Return time",
      dataIndex: "returnTime",
      key: "returnTime",
      render: (returnTime) => {
        return changeDate(returnTime);
      },
    },

    {
      title: "Distance covered",
      dataIndex: "coveredDistance",
      key: "coveredDistance",
      sorter: (a, b) => a.coveredDistance - b.coveredDistance,
      render: (coveredDistance) => {
        return `${(coveredDistance / 1000).toFixed(2)} km`;
      },
    },

    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      sorter: (a, b) => a.duration - b.duration,
      render: (duration) => {
        return `${(duration / 60).toFixed(2)} min`;
      },
    },
  ];

  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Header />
        <Divider style={{ borderStyle: "none", borderColor: "transparent" }} />
        <Content>
          {!loading ? (
            <Search
              placeholder="Enter the departure place"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
            />
          ) : (
            <div></div>
          )}

          <Divider
            style={{ borderStyle: "none", borderColor: "transparent" }}
          />
          {!loading ? (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={handleRefresh}
                size="large"
                icon={<RedoOutlined />}
              >
                back
              </Button>
            </div>
          ) : (
            <div></div>
          )}
          <Table
            loading={loading}
            columns={columns}
            dataSource={journeyDataSource}
            rowKey={(journeyDataSource) => journeyDataSource._id} // Add a unique key prop for each row
            pagination={{
              pageSize: pageSize,
              total: total,
              showSizeChanger: false,
              onChange: (page) => {
                searchingValue
                  ? fetchDataWithSearch(page, searchingValue)
                  : fetchRecords(page);
              },
            }}
          ></Table>

          <Text italic type="secondary" style={{ textAlign: "center" }}>
            @Data is owned by City Bike Finland
          </Text>
        </Content>
      </Layout>
    </>
  );
};

export default JourneyPage;
