import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { getStartOfPreviousMonth, getEndOfCurrentMonth, isSameDay } from './helper';

const CalendarPage: React.FC = () => {
  const [fixtureDates, setFixtureDates] = useState<Date[]>([]);
  const [startDate, setStartDate] = useState<String>(getStartOfPreviousMonth());
  const [endDate, setEndDate] = useState<String>(getEndOfCurrentMonth());

  useEffect(() => {
    const startOfPreviousMonth = getStartOfPreviousMonth();
    const endOfCurrentMonth = getEndOfCurrentMonth();

    setStartDate(startOfPreviousMonth);
    setEndDate(endOfCurrentMonth);

    loadFixtureDates();
  }, []);

  const loadFixtureDates = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/fixtures?start=${startDate}&end=${endDate}`);
      const data = response.data.fixtures; // await response.json();
      
      // Extract fixture dates from the response
      const extractedFixtureDates = data.map((item: any) => new Date(item.fixture.matchDate));
      console.log(extractedFixtureDates);
      
      // Update fixtureDates state
      setFixtureDates(extractedFixtureDates);
      
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
        className='calendar-success'
        value={new Date()} // Set calendar date (can be dynamic)
        tileDisabled={({ date }) => {
          // Disable dates with no fixtures
          return !fixtureDates.some((fixtureDate) => isSameDay(date, fixtureDate));
        }}
        onClickDay={(value, event) => alert('Clicked day: ' + value)}
      />
    </div>
  );
};

export default CalendarPage;
