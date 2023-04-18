import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "antd/dist/reset.css";
import { Layout, Divider, Table, Input, Button, Typography } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import Header from "../Components/Header";

const StationListPage = () => {
  const { Content } = Layout;
  const { Search } = Input;
  const { Text } = Typography;
  const pageSize = 10;
  const [stationListDataSource, setStationListDataSource] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [searchingValue, setSearchingValue] = useState("");

  const handleRefresh = () => {
    window.location.reload();
  };

  //  Search data from 'Get all Station list' Api
  const onSearch = (value) => {
    setSearchingValue(value);
  };

  // fetch data from wtih Search API
  const fetchDataWithSearch = async (page, search) => {
    try {
      setLoading(true);

      const dataFromApi = await axios.get(
        `https://talented-visor-tick.cyclic.app/api/v1/stationList?page=${page}&search=${search}`
      );

      const stationListData = dataFromApi.data.data.stationListData;
      const totalPages = dataFromApi.data.data.totalPages;
      const totalPNumofData = totalPages * pageSize;
      setStationListDataSource(stationListData);
      setTotal(totalPNumofData);
    } catch (error) {
      alert("Please enter the name of the relevant station name.");
    } finally {
      setLoading(false);
    }
  };

  //  fetch data from 'Get all Station list' Api

  const fetchRecords = async (page) => {
    try {
      const dataFromApi = await axios.get(
        `https://talented-visor-tick.cyclic.app/api/v1/stationList?page=${page}`
      );

      const stationListData = dataFromApi.data.data.stationListData;

      const totalPages = dataFromApi.data.data.totalPages;
      const totalPNumofData = totalPages * pageSize;

      setStationListDataSource(stationListData);
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

  // Render page when searchingValue is updated
  useEffect(() => {
    if (searchingValue === "") return;
    fetchDataWithSearch(1, searchingValue);
  }, [searchingValue]);

  const columns = [
    {
      title: "Station name",
      dataIndex: "nimi",
      key: "nimi",
      render: (nimi) => {
        return (
          <Link
            to={`/stationList/${nimi}`}
            style={{ textDecoration: "none", color: "Highlight" }}
          >
            {nimi}
          </Link>
        );
      },
      // check to ensure that the values being compared are not undefined before calling localeCompare
      sorter: (a, b) => a.nimi && b.nimi && a.nimi.localeCompare(b.nimi),
    },

    {
      title: "Bicycle Capacity",
      dataIndex: "kapasiteet",
      key: "kapasiteet",
      sorter: (a, b) => a.kapasiteet - b.kapasiteet,
    },

    {
      title: "City",
      dataIndex: "kaupunki",
      key: "kaupunki",
      // check to ensure that the values being compared are not undefined before calling localeCompare
      sorter: (a, b) =>
        a.kaupunki && b.kaupunki && a.kaupunki.localeCompare(b.kaupunki),
    },

    {
      title: "Adress",
      dataIndex: "adress",
      key: "adress",
      // check to ensure that the values being compared are not undefined before calling localeCompare
      sorter: (a, b) =>
        a.adress && b.adress && a.adress.localeCompare(b.adress),
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
              placeholder="Station name"
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
            style={{
              boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)",
            }}
            loading={loading}
            columns={columns}
            dataSource={stationListDataSource}
            rowKey={(stationListDataSource) => stationListDataSource._id} // Add a unique key prop for each row
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

export default StationListPage;
