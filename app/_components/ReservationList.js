'use client'
import React from 'react';
import ReservationCard from '@/app/_components/ReservationCard';
import {useOptimistic} from 'react'
import { deleteBooking } from '@/app/_lib/actions';


function ReservationList({bookings}) {
 const [optimisticBooking, optmisticDelete ] =  useOptimistic(
   bookings,
   (currBookings, bookingId) => {
     return currBookings.filter((booking) => booking.id !== bookingId);
   });
async function handleDelete(bookingId) {
  optmisticDelete(bookingId);
  await deleteBooking(bookingId);
}
  return (
    <ul className="space-y-6">
      {optimisticBooking.map((booking) => (
        <ReservationCard onDelete={handleDelete} booking={booking} key={booking.id} />
      ))}
    </ul>
  );
}

export default ReservationList;
