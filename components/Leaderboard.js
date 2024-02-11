import React from 'react';

function Leaderboard({ data }) {
  // Function to calculate points for individual action
  const calculatePoints = (item) => {
    let points = 1; // Base point
    if (item.requesterFollowsCaster) points += 1;
    if (item.likedCast) points += 1;
    if (item.recastedCast) points += 1;
    return points;
  };

  // Aggregate points for each user, differentiating by button index
  const userPoints = data.reduce((acc, item) => {
    const username = item.requesterUserData.username;
    const buttonIndex = item.buttonIndex; // Identify the button index (49ers or Chiefs)
    const points = calculatePoints(item);
    
    if (!acc[username]) {
      acc[username] = {
        displayName: item.requesterUserData.displayName,
        profileImage: item.requesterUserData.profileImage,
        points: 0, // Total points
        button1Points: 0, // 49ers points
        button2Points: 0, // Chiefs points
      };
    }
    
    acc[username].points += points;
    if (buttonIndex === 1) {
      acc[username].button1Points += points; // Add points to 49ers
    } else if (buttonIndex === 2) {
      acc[username].button2Points += points; // Add points to Chiefs
    }

    return acc;
  }, {});

  // Convert to array and sort by total points in descending order
  const sortedUsers = Object.entries(userPoints).map(([username, info]) => ({
    username,
    ...info
  })).sort((a, b) => b.points - a.points);

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6">Leaderboard</h2>
      {sortedUsers.map((user, index) => (
        <div key={index} className="flex items-center mb-4 bg-white p-4 rounded-lg shadow">
          <img src={user.profileImage} alt="Profile" className="w-16 h-16 rounded-full mr-4" />
          <div>
            <h3 className="text-xl font-semibold">{user.displayName}</h3>
            <p className="text-gray-600">{`@${user.username} - ${user.points} Points (49ers: ${user.button1Points}, Chiefs: ${user.button2Points})`}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Leaderboard;
