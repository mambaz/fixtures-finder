import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FixturesListingPage from './FixturesListingPage';
import CalendarPage from './CalendarPage';
import PageNotFound from './PageNotFound';
import { FixtureStatusProvider } from "./FixtureStatusContext"; // Provide the correct path


const App: React.FC = () => {
  return (
    <FixtureStatusProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<FixturesListingPage />} />
            <Route path="/fixtures" element={<FixturesListingPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </FixtureStatusProvider>
  );
};

export default App;
