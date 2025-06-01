'use server';

import { auth, signIn, signOut } from '@/app/_lib/auth';
import { supabase } from '@/app/_lib/supabase';
import { revalidatePath } from 'next/cache';
import {getBookings} from '@/app/_lib/data-service';
import { redirect } from 'next/navigation';

export async function createBooking(bookingData , formData) {
  const session = await auth();
  if (!session) throw new Error('No session provided');

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get('numGuests')),
    observations: String(formData.get('observations').slice(0, 1000)),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: 'unconfirmed',
  }
  const { error } = await supabase
    .from('booking')
    .insert([newBooking]);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect('/thankyou')
}

export async function updataProfile(formData) {
  const session = await auth();
  if (!session) throw new Error('No session provided');
  const  nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split('%');
  if(!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) throw new Error('Invalid nationalID, please provide a valid national ID');

  const updateData = {nationalID, nationality, countryFlag};
  const { data, error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user.guestId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Guest could not be updated');
  }
  revalidatePath('/account/profile');
}

export async function deleteBooking( bookingId ){
  // await new Promise(resolve => setTimeout(resolve, 2000));
  // throw new Error('lol')
  const session = await auth();
  if (!session) throw new Error('No session provided');

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsId =  guestBookings.map((booking) => booking.id);

  if(!guestBookingsId.includes(bookingId)) throw new Error('Your are not allowed to delete this booking')

  const {  error } = await supabase.from('booking').delete().eq('id', bookingId);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  revalidatePath('/account/reservations');
}

export async function updateReservation( formData ){
  const session = await auth();
  if (!session) throw new Error('No session provided');
const bookingId = Number(formData.get("bookingId"));
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsId =  guestBookings.map((booking) => booking.id);

  if(!guestBookingsId.includes(bookingId)) throw new Error('Your are not allowed to delete this booking')

  const updatedData = {
      numGuests: Number(formData.get("numGuests")),
    observations: String(formData.get("observations").slice(0, 1000)),
  }

  const { error } = await supabase
    .from('booking')
    .update(updatedData)
    .eq('id', bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  redirect('/account/reservations');
}

export async function signInAction(){
  await signIn('google', {redirectTo:'/account'});
}
export async function signOutAction(){
  await signOut({redirectTo:'/'});
}