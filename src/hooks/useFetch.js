import { useState, useEffect } from 'react';

// Custom hook for data fetching with local storage integration
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Don't fetch if no URL provided
    if (!url) return;
    
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // check localStorage first
        const cachedData = localStorage.getItem(url);
        
        if (cachedData) {
          setData(JSON.parse(cachedData));
          setLoading(false);
          return;
        }
        
        // If no cached data, fetch from API
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const result = await response.json();
        
        // Save to localStorage
        localStorage.setItem(url, JSON.stringify(result));
        
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);
  
  //update data and localStorage
  const updateData = (newData) => {
    setData(newData);
    localStorage.setItem(url, JSON.stringify(newData));
  };
  
  // refresh data from localStorage
  const refreshFromStorage = () => {
    const cachedData = localStorage.getItem(url);
    if (cachedData) {
      setData(JSON.parse(cachedData));
    }
  };
  
  return { data, loading, error, updateData, refreshFromStorage };
};

export default useFetch;
