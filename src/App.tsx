import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FixturesListingPage from './FixturesListingPage';
import CalendarPage from './CalendarPage';
import PageNotFound from './PageNotFound';

const App: React.FC = () => {
  console.log(process.env.REACT_APP_API_BASE_URL);
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<FixturesListingPage />} />
          <Route path="/fixtures" element={<FixturesListingPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
