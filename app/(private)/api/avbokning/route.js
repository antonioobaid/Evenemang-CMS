import { db } from '@/firebase.config';
import { doc, getDoc, updateDoc, collection, deleteDoc, query, where, getDocs } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function DELETE(req) {
  const { eventId, email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Invalid input: email is required' }, { status: 400 });
  }

  try {
    // Find the booking document for the user and event
    const bookingsCollection = collection(db, 'booking');
    const q = query(bookingsCollection, where('eventId', '==', eventId), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Get the booking document ID
    const bookingDocId = querySnapshot.docs[0].id;

    // Delete the booking document
    await deleteDoc(doc(db, 'booking', bookingDocId));

    // Increment the event seat count
    const eventDoc = doc(db, 'events', eventId);
    const eventSnapshot = await getDoc(eventDoc);
    if (!eventSnapshot.exists()) {
      throw new Error('Event not found');
    }
    const eventData = eventSnapshot.data();
    await updateDoc(eventDoc, {
      seats: eventData.seats + 1
    });

    return NextResponse.json({ message: 'Booking cancelled successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return NextResponse.json({ error: 'Failed to cancel booking' }, { status: 500 });
  }
}
