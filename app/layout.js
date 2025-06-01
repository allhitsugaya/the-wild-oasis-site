import Navigation from '@/app/_components/Navigation';
import Logo from '@/app/_components/Logo';
import '@/app/_styles/globals.css'
import {Josefin_Sans} from 'next/font/google';
import Header from '@/app/_components/Header';
import { ReservationProvider } from '@/app/_components/ReservationContext';

const josefin = Josefin_Sans({
  subsets:['latin'],
  display: 'swap',
});


export const metadata = {
  title: {
    template:'%s The wild oasis',
    default:'Welcome / The wild oasis'
  },
  description: 'Luxurious cabins hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forest',
}

function RootLayout({children}) {
  return (
    <html lang="en">
    <body className={`${josefin.className} relative antialiased bg-primary-950 text-primary-50 min-h-screen  flex flex-col `}>
    <Header/>

    <div className="flex-1 px-8 py-12 grid">
    <main className='max-w-7xl mx-auto w-full '>
      <ReservationProvider>
        {children}
      </ReservationProvider>
    </main>
    </div>
    </body>
    </html>
  );
}

export default RootLayout;
