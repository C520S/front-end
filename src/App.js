
import './App.css';
import React from 'react';
import 'antd/dist/reset.css'
import {  Route, Routes } from "react-router-dom";
import NotFound from './Pages/NotFound';
import HomePage from './Pages/HomePage';
import JourneyPage from './Pages/JourneyPage';
import StationListPage from './Pages/StationListPage';
import SingleStationViewPage from './Pages/SingleStationViewPage';

function App() {

  return (
    <div className="App">
     <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/journeys" element={<JourneyPage />} />
        <Route path="/stationList" element={< StationListPage />}/>
        <Route path="/stationList/:stationName" element={<SingleStationViewPage />} />
      {/* create 404 page */}
      <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
