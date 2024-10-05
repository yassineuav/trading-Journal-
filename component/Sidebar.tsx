import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 text-white ">
      <div className="p-4 text-2xl font-bold">Sidebar</div>
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link href="/">
              <p className="block p-4 hover:bg-gray-700">Dashboard</p>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <p className="block p-4 hover:bg-gray-700">About</p>
            </Link>
          </li>
          <li>
            <Link href="/settings">
              <p className="block p-4 hover:bg-gray-700">Settings</p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
