'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

const EventDetail = () => {
  const { user } = useUser(); // Hämta information om den inloggade användaren
  const [event, setEvent] = useState(null); // State för att lagra evenemangets data
  const [loadingBooking, setLoadingBooking] = useState(false); // State för att hantera laddningsstatus vid bokning
  const [loadingCancelling, setLoadingCancelling] = useState(false); // State för att hantera laddningsstatus vid avbokning
  const [userBooked, setUserBooked] = useState(false); // State för att kontrollera om användaren har bokat evenemanget
  const [bookingMessage, setBookingMessage] = useState(null); // State för att lagra bokningsmeddelanden
  const pathname = usePathname(); // Hämta den nuvarande vägen (URL) från Next.js
  const eventId = pathname.split('/').pop(); // Extrahera evenemangs-ID från URL

  useEffect(() => {
    const getEvent = async () => {
      if (!user) {
        return;
      }

      const userEmail = user.primaryEmailAddress?.emailAddress; // Hämta användarens e-postadress
      if (!userEmail) {
        setBookingMessage('User information is incomplete.');
        return;
      }

      try {
        const res = await fetch(`http://localhost:3001/api/event/${eventId}?email=${userEmail}`); // Hämta evenemangets data från API
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setEvent(data); // Uppdatera evenemangets data i state
        setUserBooked(data.userBooked); // Uppdatera state om användaren har bokat evenemanget
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    if (eventId) {
      getEvent();
    }
  }, [eventId, user]); // Kör effekten när eventId eller user ändras

  const bookEvent = async () => {
    setLoadingBooking(true); // Sätt laddningsstatus till true vid bokning
    try {
      const res = await fetch('http://localhost:3001/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress, eventId }), 
      });
      const data = await res.json();
      setBookingMessage(data.message); // Uppdatera bokningsmeddelandet
  
      if (res.ok) {
        setEvent(prevEvent => ({
          ...prevEvent,
          seats: prevEvent.seats - 1 // Minska antalet tillgängliga platser
        }));
        setUserBooked(true); // Sätt användarens bokningsstatus till true
      }
    } catch (error) {
      console.error('Error booking event:', error);
      setBookingMessage('Could not book the event, please try again');
    } finally {
      setLoadingBooking(false); // Sätt laddningsstatus till false efter bokning
    }
  };

  const cancelBooking = async () => {
    setLoadingCancelling(true); // Sätt laddningsstatus till true vid avbokning
    try {
      const res = await fetch('http://localhost:3001/api/avbookning', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress, eventId }), 
      });
      
      const data = await res.json();
      setBookingMessage(data.message); // Uppdatera bokningsmeddelandet
  
      if (res.ok) {
        setEvent(prevEvent => ({
          ...prevEvent,
          seats: prevEvent.seats + 1 // Öka antalet tillgängliga platser
        }));
        setUserBooked(false); // Sätt användarens bokningsstatus till false
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      setBookingMessage('Could not cancel the booking, please try again');
    } finally {
      setLoadingCancelling(false); // Sätt laddningsstatus till false efter avbokning
    }
  };

  if (!event) {
    return <div>Loading...</div>; // Visa laddningsmeddelande medan evenemangets data hämtas
  }

  return (
    <div className="p-4">
      <div className="relative w-full h-96 mb-4">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          className="rounded-md"
          priority
        />
      </div>
      <h1 className="text-2xl font-semibold mb-2">{event.title}</h1>
      <p className="text-gray-300 mb-4">{event.description}</p>
      <div className="flex justify-between mb-4">
        <p className="text-gray-400">Date: {event.date}</p>
        <p className="text-gray-400">Time: {event.time}</p>
      </div>
      <p className="text-gray-400 mb-2">Seats left: {event.seats}</p>
      <p className="text-gray-400 mb-2">Location: {event.city}</p>
      {event.seats === 0 && (
        <p className="text-red-500 mb-2 flex items-center justify-center text-2xl">This event is fully booked.</p>
      )}
      <Button
        onClick={bookEvent}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded relative"
        style={{ transition: 'background-color 0.3s' }}
        disabled={loadingBooking || event.seats === 0 || userBooked}
      >
        {loadingBooking ? 'Booking...' : 'Book now'}
        {loadingBooking && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 rounded">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
          </div>
        )}
      </Button>
      {userBooked && (
        <Button
          onClick={cancelBooking}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded relative"
          style={{ transition: 'background-color 0.3s', marginLeft: '10px' }}
          disabled={loadingCancelling}
        >
          {loadingCancelling ? 'Cancelling...' : 'Cancel booking'}
          {loadingCancelling && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 rounded">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
            </div>
          )}
        </Button>
      )}
      {bookingMessage && (
        <p className={`mt-2 ${bookingMessage.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
          {bookingMessage}
        </p>
      )}
    </div>
  );
};

export default EventDetail;
