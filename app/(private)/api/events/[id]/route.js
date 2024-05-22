import { db } from '@/firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';


export async function GET(req, { params }) {
  const { id } = params;

  try {
    const eventDoc = doc(db, 'events', id);
    const eventSnapshot = await getDoc(eventDoc);

    if (!eventSnapshot.exists()) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({ id: eventSnapshot.id, ...eventSnapshot.data() }, { status: 200 });
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 });
  }
}

