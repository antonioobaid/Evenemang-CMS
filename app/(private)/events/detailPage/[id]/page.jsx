/*'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

const EventDetail = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState(null);
  const [bookingMessage, setBookingMessage] = useState(null);
  const pathname = usePathname();
  const eventId = pathname.split('/').pop();

  useEffect(() => {
    const getEvent = async () => {
      if (!user) {
        return; 
      }

      const userEmail = user.primaryEmailAddress?.emailAddress;
      if (!userEmail) {
        setBookingMessage('User information is incomplete.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:3001/api/event/${eventId}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      getEvent();
    }
  }, [eventId, user]);

  const bookEvent = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress, eventId }), 
      });
      const data = await res.json();
      setBookingMessage(data.message);
  
      if (res.ok) {
        setEvent(prevEvent => ({
          ...prevEvent,
          seats: prevEvent.seats - 1
        }));
      }
    } catch (error) {
      console.error('Error booking event:', error);
      setBookingMessage('Could not book the event, please try again');
    } finally {
      setLoading(false);
    }
  };

  if (!event) {
    return <div>Loading...</div>;
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
      <button
        onClick={bookEvent}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded relative"
        style={{ transition: 'background-color 0.3s' }}
        disabled={loading}
      >
        {loading ? 'Booking...' : 'Book now'}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 rounded">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
          </div>
        )}
      </button>
      {bookingMessage && (
        <p className={`mt-2 ${bookingMessage.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
          {bookingMessage}
        </p>
      )}
    </div>
  );
};

export default EventDetail;*/




/*'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

const EventDetail = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState(null);
  const [bookingMessage, setBookingMessage] = useState(null);
  const pathname = usePathname();
  const eventId = pathname.split('/').pop();

  useEffect(() => {
    const getEvent = async () => {
      if (!user) {
        return; 
      }

      const userEmail = user.primaryEmailAddress?.emailAddress;
      if (!userEmail) {
        setBookingMessage('User information is incomplete.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:3001/api/event/${eventId}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      getEvent();
    }
  }, [eventId, user]);

  const bookEvent = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress, eventId }), 
      });
      const data = await res.json();
      setBookingMessage(data.message);
  
      if (res.ok) {
        setEvent(prevEvent => ({
          ...prevEvent,
          seats: prevEvent.seats - 1
        }));
      }
    } catch (error) {
      console.error('Error booking event:', error);
      setBookingMessage('Could not book the event, please try again');
    } finally {
      setLoading(false);
    }
  };

  if (!event) {
    return <div>Loading...</div>;
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
      <button
        onClick={bookEvent}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded relative"
        style={{ transition: 'background-color 0.3s' }}
        disabled={loading || event.seats === 0}
      >
        {loading ? 'Booking...' : 'Book now'}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 rounded">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
          </div>
        )}
      </button>
      {bookingMessage && (
        <p className={`mt-2 ${bookingMessage.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
          {bookingMessage}
        </p>
      )}
      {event.seats === 0 && (
        <p className="text-red-500 mb-2 flex items-center justify-center text-2xl">This event is fully booked.</p>
      )}
    </div>
  );
};

export default EventDetail;*/

'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

const EventDetail = () => {
  const { user } = useUser();
  const [event, setEvent] = useState(null);
  const [loadingBooking, setLoadingBooking] = useState(false);
  const [loadingCancelling, setLoadingCancelling] = useState(false);
  const [userBooked, setUserBooked] = useState(false);
  const [bookingMessage, setBookingMessage] = useState(null);
  const pathname = usePathname();
  const eventId = pathname.split('/').pop();

  useEffect(() => {
    const getEvent = async () => {
      if (!user) {
        return; 
      }

      const userEmail = user.primaryEmailAddress?.emailAddress;
      if (!userEmail) {
        setBookingMessage('User information is incomplete.');
        return;
      }

      try {
        const res = await fetch(`http://localhost:3001/api/event/${eventId}?email=${userEmail}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setEvent(data);
        setUserBooked(data.userBooked);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    if (eventId) {
      getEvent();
    }
  }, [eventId, user]);

  const bookEvent = async () => {
    setLoadingBooking(true);
    try {
      const res = await fetch('http://localhost:3001/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress, eventId }), 
      });
      const data = await res.json();
      setBookingMessage(data.message);
  
      if (res.ok) {
        setEvent(prevEvent => ({
          ...prevEvent,
          seats: prevEvent.seats - 1
        }));
        setUserBooked(true);
      }
    } catch (error) {
      console.error('Error booking event:', error);
      setBookingMessage('Could not book the event, please try again');
    } finally {
      setLoadingBooking(false);
    }
  };

  const cancelBooking = async () => {
    setLoadingCancelling(true);
    try {
      const res = await fetch('http://localhost:3001/api/avbookning', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress, eventId }), 
      });
      
      const data = await res.json();
      setBookingMessage(data.message);
  
      if (res.ok) {
        setEvent(prevEvent => ({
          ...prevEvent,
          seats: prevEvent.seats + 1
        }));
        setUserBooked(false);
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      setBookingMessage('Could not cancel the booking, please try again');
    } finally {
      setLoadingCancelling(false);
    }
  };

  if (!event) {
    return <div>Loading...</div>;
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















/*'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

const EventDetail = () => {
  const { user } = useUser();
  const [loadingBooking, setLoadingBooking] = useState(false);
  const [loadingCancelling, setLoadingCancelling] = useState(false);
  const [event, setEvent] = useState(null);
  const [bookingMessage, setBookingMessage] = useState(null);
  const pathname = usePathname();
  const eventId = pathname.split('/').pop();
  const [userBooked, setUserBooked] = useState(false);

  useEffect(() => {
    const getEvent = async () => {
      if (!user) {
        return; 
      }

      const userEmail = user.primaryEmailAddress?.emailAddress;
      if (!userEmail) {
        setBookingMessage('User information is incomplete.');
        return;
      }

      try {
        const res = await fetch(`http://localhost:3001/api/event/${eventId}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setEvent(data);

        // Kontrollera om användaren redan har bokat detta evenemang
        const bookingRes = await fetch(`http://localhost:3001/api/booking/${eventId}/${userEmail}`);
        if (bookingRes.ok) {
          const bookingData = await bookingRes.json();
          setUserBooked(bookingData.booked);
        } else if (bookingRes.status === 404) {
          setUserBooked(false);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    if (eventId) {
      getEvent();
    }
  }, [eventId, user]);

  const bookEvent = async () => {
    setLoadingBooking(true);
    try {
      const res = await fetch('http://localhost:3001/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress, eventId }), 
      });
      const data = await res.json();
      setBookingMessage(data.message);
  
      if (res.ok) {
        setEvent(prevEvent => ({
          ...prevEvent,
          seats: prevEvent.seats - 1
        }));
        setUserBooked(true);
      }
    } catch (error) {
      console.error('Error booking event:', error);
      setBookingMessage('Could not book the event, please try again');
    } finally {
      setLoadingBooking(false);
    }
  };

  const cancelBooking = async () => {
    setLoadingCancelling(true);
    try {
      console.log('Sending DELETE request with:', {
        email: user?.primaryEmailAddress?.emailAddress,
        eventId
      });
      const res = await fetch('http://localhost:3001/api/booking', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress, eventId }), 
      });
      
      const data = await res.json();
      console.log('Response from DELETE request:', data);
      setBookingMessage(data.message);
  
      if (res.ok) {
        setEvent(prevEvent => ({
          ...prevEvent,
          seats: prevEvent.seats + 1
        }));
        setUserBooked(false);
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      setBookingMessage('Could not cancel the booking, please try again');
    } finally {
      setLoadingCancelling(false);
    }
  };

  if (!event) {
    return <div>Loading...</div>;
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

export default EventDetail;*/


