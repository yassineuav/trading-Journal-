import { useState } from 'react';

// Sample data representing "weeks" and "days"
const data = [
  [0, 1, 2, 3, 4, 5, 1], // Week 1
  [2, 3, 0, 1, 4, 2, 0], // Week 2
  [4, 1, 2, 3, 0, 2, 3], // Week 3
  [3, 0, 2, 4, 1, 3, 5], // Week 4
  [2, 3, 4, 0, 2, 1, 0], // Week 5
  [1, 4, 3, 5, 0, 2, 3], // Week 6
];

const GitHubChart = () => {
  // Background colors for the different levels (0 to 5)
  const getColor = (value: number) => {
    switch (value) {
      case 0:
        return 'bg-gray-200'; // No contributions
      case 1:
        return 'bg-green-100'; // Low activity
      case 2:
        return 'bg-green-300'; // Medium-low activity
      case 3:
        return 'bg-green-500'; // Medium-high activity
      case 4:
        return 'bg-green-700'; // High activity
      case 5:
        return 'bg-green-900'; // Very high activity
      default:
        return 'bg-gray-200'; // Default color
    }
  };

  return (
    <div className="p-12 bg-red flex screen-h full-w">
        <h1>test</h1>
      <div className="grid grid-cols-7 gap-1">
        {data.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-rows-7 gap-1">
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`h-12 w-12 ${getColor(day)} rounded-sm`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GitHubChart;
