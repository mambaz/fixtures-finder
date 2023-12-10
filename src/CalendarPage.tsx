import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { getStartOfPreviousMonth, getEndOfCurrentMonth, isSameDay, findMatchDate, dateDisplay, nextYearEnd, prevYearStart, getDateFormat, getEndDateOfMonth } from './helper';
import ModalComponent from "./components/modalComponents";

const CalendarPage: React.FC = () => {
  // const [fixtureDates, setFixtureDates] = useState<Date[]>([]);
  const [fixtureDates, setFixtureDates] = useState<any[]>([]);
  const [userDate, setUserDate] = useState<String|Date>();
  const [fixtureDataByDate, setFixtureDataByDate] = useState<any[]>([]);
  // const [startDate, setStartDate] = useState<String>(getStartOfPreviousMonth());
  // const [endDate, setEndDate] = useState<String>(getEndOfCurrentMonth());
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const startOfPreviousMonth = getStartOfPreviousMonth().toString();
    const endOfCurrentMonth = getEndOfCurrentMonth().toString();

    // setStartDate(startOfPreviousMonth);
    // setEndDate(endOfCurrentMonth);

    loadFixtureDates(startOfPreviousMonth, endOfCurrentMonth);
  }, []);

  const getMatchDataByDate = (selectedDate: string | Date) => {
    const data = findMatchDate(fixtureDates, new Date(selectedDate));
    // console.log(data);
    setUserDate(dateDisplay(selectedDate));
    setFixtureDataByDate(data);
    setIsModalOpen(true);
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getDataByDate = (selectedDate: string | Date | null) => {
    if(selectedDate) {
      const startDate = getDateFormat(new Date(selectedDate)).toString();
      console.log('=-=-startDate',startDate);
      const endDate = getEndDateOfMonth(new Date(selectedDate)).toString();
      console.log('=-=-endDate',endDate);
      // setStartDate(startDate);
      // setEndDate(endDate);
      loadFixtureDates(startDate, endDate);
    }
  }

  const loadFixtureDates = async (startDate: string, endDate: string) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/fixtures?start=${startDate}&end=${endDate}`);
      const data = response.data.fixtures;
      
      // Update fixtureDates state
      setFixtureDates(data);
      
      // Extract fixture dates from the response and set to fixtureDates state
      // You can format data here based on your API response structure
    } catch (error) {
      console.error('Error fetching fixture dates:', error);
    }
  };

  return (
    <div>
      <h1>Fixture Calendar</h1>
      <Calendar
        next2Label={null}
        prev2Label={null}
        className='calendar-success'
        value={new Date()} // Set calendar date (can be dynamic)
        tileDisabled={({ date }) => {
          // Disable dates with no fixtures
          return !fixtureDates.some((fixtureData) => isSameDay(date, fixtureData.fixture.matchDate));
        }}
        onClickDay={(value, event) => getMatchDataByDate(value)}
        onActiveStartDateChange={({ action, activeStartDate, value, view }) => getDataByDate(activeStartDate)}
        minDate={prevYearStart}
        maxDate={nextYearEnd}
      />
      <ModalComponent 
        handleClose={handleCloseModal} 
        show={isModalOpen} 
        fixtures={fixtureDataByDate}
        title={`Fixture Listing - ${userDate}`}
       />
    </div>
  );
};

export default CalendarPage;
