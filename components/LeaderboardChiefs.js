import React from 'react';

function LeaderboardChiefs({ data }) {
  // Function to calculate points for individual action
  const calculatePoints = (item) => {
    let points = 1; // Base point
    if (item.requesterFollowsCaster) points += 1;
    if (item.likedCast) points += 1;
    if (item.recastedCast) points += 1;
    // Check if requester's address is verified
    if (item.requesterVerifiedAddresses && item.requesterVerifiedAddresses.length > 0) {
      points += item.requesterVerifiedAddresses.length; // Additional points for verified addresses
    }
    return points;
  };

  // Aggregate Chiefs points for each user
  const chiefsPoints = data.reduce((acc, item) => {
    // Focus only on Chiefs points
    if (item.buttonIndex === 2) {
      const username = item.requesterUserData.username;
      const points = calculatePoints(item);
      
      if (!acc[username]) {
        acc[username] = {
          displayName: item.requesterUserData.displayName,
          profileImage: item.requesterUserData.profileImage,
          points: 0, // Chiefs points
          verifiedAddresses: [] // Initialize an array to store unique verified addresses
        };
      }

      // Add verified addresses to the array
      if (item.requesterVerifiedAddresses && item.requesterVerifiedAddresses.length > 0) {
        item.requesterVerifiedAddresses.forEach(address => {
          if (!acc[username].verifiedAddresses.includes(address)) {
            acc[username].verifiedAddresses.push(address);
          }
        });
      }
      
      acc[username].points += points; // Add points to Chiefs
    }

    return acc;
  }, {});

  // Convert to array and sort by Chiefs points in descending order
  const sortedChiefsUsers = Object.entries(chiefsPoints).map(([username, info]) => ({
    username,
    ...info
  })).sort((a, b) => b.points - a.points);

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <h2 className="text-3xl font-bold text-center mb-6 sticky top-0 bg-white py-2">Chiefs Leaderboard</h2>
      {sortedChiefsUsers.map((user, index) => (
        <div key={index} className="flex items-center mb-4 bg-white p-4 rounded-lg shadow">
          <img src={user.profileImage} alt="Profile" className="w-16 h-16 rounded-full mr-4" />
          <div>
            <h3 className="text-xl text-green-500 font-semibold">{user.displayName}</h3>
            <p className="text-gray-600">{`@${user.username} - ${user.points} Points`}</p>
            <p className="text-gray-600">{user.verifiedAddresses.join(', ')}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LeaderboardChiefs;
