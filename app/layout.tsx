import Sidebar from '@/component/Sidebar';
import '../globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 ">
          {children}
        </main>
      </div>
    </body>
  </html>
  );
}
