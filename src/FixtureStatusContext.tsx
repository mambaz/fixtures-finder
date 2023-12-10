import React, { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';

interface FixtureStatusContextProps {
  fixtureStatus: any; // Replace 'any' with your specific type if known
  setFixtureStatus: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' with your specific type if known
}
interface FixtureStatusProviderProps {
    children: React.ReactNode;
  }

const FixtureStatusContext = createContext<FixtureStatusContextProps>({
  fixtureStatus: null,
  setFixtureStatus: () => {},
});

export const useFixtureStatus = () => {
  return useContext(FixtureStatusContext);
};

export const FixtureStatusProvider: React.FC<FixtureStatusProviderProps> = ({ children }) => {
    const [fixtureStatus, setFixtureStatus] = useState<any>(null);

  useEffect(() => {
    // Fetch fixtureStatus from API
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/fixtures/status`);
        setFixtureStatus(response.data); // Update fixtureStatus with fetched data
      } catch (error) {
        console.error("Error fetching fixtureStatus:", error);
      }
    };

    fetchData(); // Call the fetch function when component mounts
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <FixtureStatusContext.Provider value={{ fixtureStatus, setFixtureStatus }}>
      {children}
    </FixtureStatusContext.Provider>
  );
};

export default FixtureStatusContext;
