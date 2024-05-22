import { db } from '@/firebase.config';
import { doc, getDoc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { eventId, email, name } = await req.json();

  if (!email || !name) {
    return NextResponse.json({ error: 'Invalid input: name and email are required' }, { status: 400 });
  }

  try {
    const eventDoc = doc(db, 'events', eventId);
    const eventSnapshot = await getDoc(eventDoc);

    if (!eventSnapshot.exists()) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const eventData = eventSnapshot.data();

    if (eventData.seats <= 0) {
      return NextResponse.json({ error: 'No seats available' }, { status: 400 });
    }

    // Update the event seat count
    await updateDoc(eventDoc, {
      seats: eventData.seats - 1
    });

    // Add booking to the "bookings" collection
    const bookingsCollection = collection(db, 'booking');
    await addDoc(bookingsCollection, {
      eventId,
      email,
      name,
    });

    return NextResponse.json({ message: 'Booking successful' }, { status: 200 });
  } catch (error) {
    console.error('Error processing booking:', error);
    return NextResponse.json({ error: 'Failed to process booking' }, { status: 500 });
  }
}
