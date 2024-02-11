// components/LiveData.js

import React from 'react';

function LiveData({ data }) {
  // Function to calculate points
  const calculatePoints = (item) => {
    let points = 1; // Base point
    if (item.requesterFollowsCaster) points += 1;
    if (item.likedCast) points += 1;
    if (item.recastedCast) points += 1;
    return points;
  }

  return (
    <div>
      <h2 className="text-3xl text-gray-700 mb-4">Data Loaded:</h2>
      {data.map((item, index) => (
        <div 
          key={index} 
          className="mb-6 p-6 bg-white rounded-lg shadow-md"
        >
          <img 
            src={item.requesterUserData.profileImage} 
            alt="Profile" 
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.requesterUserData.username}</h3>
          <div className="text-gray-800 mb-4">Points: {calculatePoints(item)}</div>
        </div>
      ))}
    </div>
  );
}

export default LiveData;
