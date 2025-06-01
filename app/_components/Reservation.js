import React from 'react';
import DateSelector from '@/app/_components/DateSelector';
import ReservationForm from '@/app/_components/ReservationForm';
import { getBookedDatesByCabinId, getCabin,getSettings } from '@/app/_lib/data-service';
import { auth } from '@/app/_lib/auth';
import LoginMessage from '@/app/_components/LoginMessage';

async function Reservation({cabin}) {
  const session = await auth();
  const [ settings,bookedDates ] = await Promise.all([getCabin(cabin.id),  getSettings(), getBookedDatesByCabinId(cabin.id)])

  return <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector settings={settings} bookedData={bookedDates} cabin={cabin} />
    {session?.user ? <ReservationForm cabin={cabin} user={session.user} /> : <LoginMessage/>}
  </div>

}

export default Reservation;
