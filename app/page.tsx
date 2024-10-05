"use client"
import { useEffect, useState } from 'react';
import { createData, readData, updateData, deleteData, deleteDataAll } from '../lib/dataService';

interface DataItem {
  id: string;
  date: string;
  margin: number;
  pl: number;
  plPercent: number;
  trades: number;
  color: number;
  description: string;
}


const colorOptions = [-3, -2, -1, 0, 1, 2, 3];

const Home = () => {

  const colorMap = {
    // Red activity levels
    '-3': 'bg-red-900',  // Medium Red
    '-2': 'bg-red-600',  // Medium Light Red
    '-1': 'bg-red-400',  // Light Red
    // Neutral activity level
    '0': 'bg-gray-400',   // No contributions
    // Green activity levels
    '1': 'bg-green-600',  // Light Green
    '2': 'bg-green-700',  // Medium Light Green
    '3': 'bg-green-900',  // Medium Dark Green
  };

  const getColor = (value: number) => {
    return colorMap[value] || 'bg-gray-400'; // Default color for unexpected values
  };

  const getColorFromPercent = (percent) => {
    if (percent <= -30) return '-3'; // Color for -30% and below
    if (percent <= -20) return '-2'; // Color for -20% to -30%
    if (percent <= -10) return '-1'; // Color for -10% to -20%
    if (percent === 0) return '0';    // Color for 0%
    if (percent <= 20) return '1';    // Color for +0% to +20%
    if (percent <= 50) return '2';    // Color for +20% to +50%
    return '3';                        // Color for +50% and above
  };

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];



  const [dataList, setDataList] = useState<DataItem[]>([]);
  const [form, setForm] = useState<DataItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchData = async () => {
    const data = await readData();
    setDataList(Object.values(data || {}).map((item: any) => ({ ...item, id: item.id })));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form) {
      if (form.id) {
        await updateData(form);
      } else {
        await createData({ ...form, id: Date.now().toString() });
      }
      setForm(null);
      setIsOpen(false);
      fetchData();
    }
  };



  const handleEdit = (item: DataItem) => {
    setForm(item);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteData(id);
    fetchData();
  };

  const deleteDummyData = async () => {
    await deleteDataAll();
  }


  const formatDate = (dateString) => {

    const [year, month, day] = dateString.split('-'); // Split the string into parts
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${String(day).padStart(2, '0')} ${monthNames[parseInt(month, 10) - 1]}`; // Format to "07 Oct"
  };


  const generateDummyData = () => {
    const data = [];

    for (let i = 0; i < 50; i++) { // Random color
      const date = new Date(2024, 9, 7 + i).toISOString().split('T')[0]; // Incrementing date
      const description = `win %${Math.random() * 100 | 0}`; // Random win percentage
      const trades = Math.floor(Math.random() * 7) + 1;
      const id = Date.now() + i; // Unique ID based on timestamp
      const margin = 1000; // Random margin between 0 and 200
      const pl = Math.floor(Math.random() * 2000) - 1000; // Range: -1000 to +1000
      // Format P&L as a string
      const formattedPl = `${pl >= 0 ? '+' : '-'}$${Math.abs(pl)}`;

      // Calculate P&L percentage based on margin, avoid division by zero
      const plPercent = margin !== 0 ? ((pl / margin) * 100).toFixed(2) : '0.00';

      const color = getColorFromPercent(plPercent);

      data.push({
        color,
        date,
        description,
        id: String(id),
        margin: String(margin),
        pl: formattedPl,
        plPercent: plPercent,
        trades,
      });
    }

    return data;
  };

  const createDummyData = async () => {
    // console.log(generateDummyData())
    //   await createData({ ...generateDummyData(), id: Date.now().toString() });
    await createData(generateDummyData());

  }
  const numberOfGroups = Math.ceil(dataList.length / 5);

  return (
    <div className="flex  min-h-screen ">
      <main className="flex-grow p-2 text-white">
        <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
        <h2 className="mt-8 text-2xl font-semibold">Contributions Chart: 50 days of trading</h2>

        <div className="grid grid-cols-8 gap-6 rounded-md text-center border p-2">
          <div className="border ">total</div>
          <div className="border ">grow</div>
          <div className="border"></div>
          <div className="border"></div>

          <button onClick={() => createDummyData()} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-4">
            add
          </button>
          <button onClick={() => deleteDummyData()} className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded m-4">
            delete all
          </button>
        </div>

        <div className="grid grid-rows grid-flow-col rounded-lg m-2 p-2 border" >

          <div className='row-span-3  w-24'>
            <div className=' text-xl text-gray-100 h-8 w-24 '>weeks:</div>            
            <div className="grid grid-rows-5 gap-2">
              {daysOfWeek.map((day, dayIndex) => (
                <div key={dayIndex} className="h-24 w-24 pt-8 ">{day}</div>
              ))}
            </div>
          </div>

          
          <div className="col-span-2 text-center">
            <div className={`grid grid-cols-${numberOfGroups} gap-2 m-1`}>
              {Array.from({ length: numberOfGroups }, (_, groupIndex) => (
                <div key={groupIndex} className='text-xl h-8 w-24 '>{groupIndex + 1}</div>
              ))}
            </div>
          </div>

          <div className=' row-span-2 col-span-2'>
            <div className="grid grid-rows-5 grid-flow-col gap-2 mx-1 justify-start">
              {dataList.map((item, index) => (
                <div
                  key={index}
                  className={`h-24 w-24 ${getColor(item.color)} rounded-sm`}
                  title={`${item.id} contributions`}
                >
                  <div className="text-center">
                    <div className="text-xl font-bold">{item.pl}</div>
                    <div className="text-sm" >{item.plPercent}%</div>
                    <div className="text-sm" >{item.trades} trade{item.trades>1?"s":""}</div>
                    <div className="h-2" ></div>
                    <div className="text-xs m-1 text-right text-bottom" >{formatDate(item.date)}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <button
            onClick={() => { setForm({ id: '', date: '', margin: 0, pl: 0, trades: 1, plPercent: 0, color: 0, description: '' }); setIsOpen(true); }}
            className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Data
          </button>

          {dataList.map(item => (
            <div key={item.id} className="flex bg-gray-700 rounded-lg mb-2 shadow-white shadow-sm">
              <div className={`${getColor(item.color)} w-2 h-auto border-l-none rounded-l-lg`} /> {/* Colored bar */}
              <div className="flex-1 ml-4"> {/* Added flex-1 to fill the remaining space */}

                <p className="text-gray-200">Margin: ${item.margin}</p>
                <p className="text-gray-200">Trades: {item.trades}</p>
                <p className="text-gray-200">P&L: {item.pl}</p>
                <p className="text-gray-200">P&L Percent: {item.plPercent}%</p>
                <p className="text-gray-200">Description: {item.description}</p>
                {/* <p className="text-gray-200">Color: {item.color}</p> */}
              </div>
              <div className='flex flex-col'>
                <div className=" flex flex-wrap m-2">
                  <div><button onClick={() => handleEdit(item)} className="mr-2 text-yellow-500 hover:text-yellow-400">Edit</button></div>
                  <div className='w-2'>{"|"}</div>
                  <div><button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-400">Delete</button></div>
                </div>
                <div className="h-10"></div>
                <div className="flex m-2 justify-end">
                  <p className="text-xs text-gray-200">{formatDate(item.date)}</p>
                </div>
              </div>
            </div>
          ))}

          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white dark:bg-gray-800 p-5 rounded shadow-lg">
                <form onSubmit={handleSubmit}>
                  <div>
                    <label className="text-gray-800 dark:text-gray-200">Date:</label>
                    <input type="date" name="date" value={form?.date || ''} onChange={handleChange} required className="block border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" />
                  </div>
                  <div>
                    <label className="text-gray-800 dark:text-gray-200">Margin</label>
                    <input type="number" name="margin" value={form?.margin || 0} onChange={handleChange} required className="block border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" />
                  </div>
                  <div>
                    <label className="text-gray-800 dark:text-gray-200">P&L:</label>
                    <input type="number" name="pl" value={form?.pl || 0} onChange={handleChange} required className="block border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" />
                  </div>
                  <div>
                    <label className="text-gray-800 dark:text-gray-200">P&L Percent:</label>
                    <input type="number" name="plPercent" value={form?.plPercent || 0} onChange={handleChange} required className="block border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" />
                  </div>
                  <div>
                    <label className="text-gray-800 dark:text-gray-200">Trades :</label>
                    <input type="number" name="trades" value={form?.trades || 0} onChange={handleChange} required className="block border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" />
                  </div>
                  <div>
                    <label className="text-gray-800 dark:text-gray-200">Color:</label>
                    <select name="color" value={form?.color || 0} onChange={handleChange} required className="block border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
                      {colorOptions.map(option => (

                        <option key={option} value={option} className={`h-24 w-24 ${getColor(option)} rounded-sm `} >{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-800 dark:text-gray-200 ">Description:</label>
                    <input type="text" name="description" value={form?.description || ''} onChange={handleChange} required className="block border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 " />
                  </div>
                  <div className="border m-2 p-2">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ">
                      {form?.id ? 'Update' : 'Create'}
                    </button>
                    <button type="button" onClick={() => setIsOpen(false)} className="ml-2 text-red-500 hover:text-red-400 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
                      Cancel
                    </button>
                  </div>

                </form>
              </div>
            </div>
          )}
        </div>

      </main>
    </div>
  );
};

export default Home;
