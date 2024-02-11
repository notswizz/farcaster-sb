import React, { useState, useEffect } from 'react';
import LeaderboardChiefs from '../components/LeaderboardChiefs'; // Import LiveData component
import Leaderboard49ers from '../components/Leaderboard49ers'; // Import Leaderboard component

function HomePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/getData');
      const fetchedData = await response.json();
      setData(fetchedData.reverse()); // Reverse data for reverse chronological order
    }
    fetchData();
  }, []); // The empty array means this effect runs once on mount

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Super Bowl</h1>
        {data.length > 0 && (
          <div className="flex flex-wrap justify-between -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-4 lg:mb-0">
              <div className="bg-white rounded-lg shadow-lg p-6">
           
                <LeaderboardChiefs data={data} />
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <div className="bg-white rounded-lg shadow-lg p-6">
         
                <Leaderboard49ers data={data} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
}

export default HomePage;
