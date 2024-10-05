

const Home = () => {
  const data = [
    [0, 1, 2, 3, 4],    // Week 1
    [1, 2, 3, 0, 5],    // Week 2
    [2, 0, 1, -1, 3],   // Week 3
    [-1, -2, -3, -4, -5], // Week 4
    [3, 4, 5, 1, 2],    // Week 5
    [0, -1, 2, 3, 4],   // Week 6
    [1, 2, -2, 0, 5],   // Week 7
    [-1, -3, -5, 2, 4], // Week 8
    [2, 3, 4, -1, 0],   // Week 9
    [3, -1, 2, 4, -2],  // Week 10
    [4, 5, 0, -3, -1],  // Week 11
    [0, 1, 2, -4, -5],  // Week 12
    [1, 3, 4, 5, -1],   // Week 13
    [-2, -3, -1, 0, 2], // Week 14
    [3, 4, 5, 1, -2],   // Week 15
    [0, -4, -5, 3, 2],  // Week 16
    [1, 2, 3, -3, -4],  // Week 17
    [4, 5, 2, 0, -1],   // Week 18
    [3, 1, -2, -3, 0],  // Week 19
    [0, 5, 4, -1, -2],  // Week 20
  ];
  const getColor = (value: number) => {
    if (value < 0) {
      // Red activity levels
      switch (value) {
        case -1:
          return 'bg-red-200'; // Light Red
        case -2:
          return 'bg-red-400'; // Medium Light Red
        case -3:
          return 'bg-red-600'; // Medium Red
        case -4:
          return 'bg-red-700'; // Medium Dark Red
        case -5:
          return 'bg-red-900'; // Dark Red
        default:
          return 'bg-gray-200'; // Default color for unexpected values
      }
    } else {
      // Green activity levels
      switch (value) {
        case 0:
          return 'bg-gray-200'; // No contributions
        case 1:
          return 'bg-green-200'; // Light Green
        case 2:
          return 'bg-green-400'; // Medium Light Green
        case 3:
          return 'bg-green-600'; // Medium Green
        case 4:
          return 'bg-green-700'; // Medium Dark Green
        case 5:
          return 'bg-green-900'; // Dark Green
        default:
          return 'bg-gray-200'; // Default color for unexpected values
      }
    }
  };

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  return (
    <div className="flex  min-h-screen">
      <main className="flex-grow p-2 text-white">
        <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
        <p className="mt-4 text-xl">This is a basic Next.js app with TypeScript and Tailwind CSS.</p>
        <h2 className="mt-8 text-2xl font-semibold">Contribution Chart: 100 days of trading</h2>

        <div className="flex border rounded-md m-4 p-4 h-auto " >

          <div className="grid grid-rows-6  grid-flow-col gap-2 mx-1">
              {/* Day names on the left */}
              <div className="text-xl">weeks:</div>
              {daysOfWeek.map((day, dayIndex) => (
                <div key={dayIndex} className="h-12">{day}</div>
              ))}
           
          </div>

          {data.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-rows-6  grid-flow-col gap-2 mx-1">
              <div className="h-12 w-12 text-center">{weekIndex+1}</div>
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`h-12 w-12 ${getColor(day)} rounded-sm`}
                  title={`${day} contributions`}
                ></div>
              ))}
            </div>
          ))}
        </div>

      </main>
    </div>
  );
};

export default Home;
