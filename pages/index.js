import React, { useState, useEffect } from 'react';
import LeaderboardChiefs from '../components/LeaderboardChiefs';
import Leaderboard49ers from '../components/Leaderboard49ers';

function HomePage() {
  const [data, setData] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('chiefs'); // Default to 'chiefs'

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/getData');
      const fetchedData = await response.json();
      setData(fetchedData.reverse());
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
     
        
        {/* Dropdown for selecting team */}
        <div className="mb-8 text-center">
    
          <select
            id="team-select"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="text-center text-lg font-medium bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 mx-auto p-2.5"
          >
            <option value="chiefs">Chiefs</option>
            <option value="49ers">49ers</option>
          </select>
        </div>

        {/* Conditionally render leaderboards based on selectedTeam */}
        {data.length > 0 && (
          <div className="flex flex-wrap justify-center -mx-2 overflow-hidden">
            {selectedTeam === 'chiefs' ? (
              <div className="px-2 w-full overflow-hidden">
                <div className="bg-white rounded-lg shadow p-6">
                  <LeaderboardChiefs data={data} />
                </div>
              </div>
            ) : (
              <div className="px-2 w-full overflow-hidden">
                <div className="bg-white rounded-lg shadow p-6">
                  <Leaderboard49ers data={data} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
