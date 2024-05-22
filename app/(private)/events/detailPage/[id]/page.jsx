/*'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const EventDetail = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const eventId = pathname.split('/').pop(); // Extract the event ID from the URL

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="p-4">
      <img src={event.imageUrl} alt={event.title} className="w-full h-60 object-cover rounded-md mb-4" />
      <h1 className="text-2xl font-semibold mb-2">{event.title}</h1>
      <p className="text-gray-300 mb-4">{event.description}</p>
      <div className="flex justify-between mb-4">
        <p className="text-gray-400">Date: {event.date}</p>
        <p className="text-gray-400">Time: {event.time}</p>
      </div>
      <p className="text-gray-400 mb-2">Seats: {event.seats}</p>
      <p className="text-gray-400 mb-2">Location: {event.city}</p>
      <Button className="p-4 mt-2">Book now</Button>
    </div>
  );
};

export default EventDetail;*/




/*'use client'
import { useState, useEffect } from 'react';
import {  usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';


const EventDetail = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState(null); 
  const eventId = pathname.split('/').pop(); 

  const fetchEvent = async () => {
    try {
      const response = await fetch(`/api/events/${eventId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEvent(data);
    } catch (error) {
      console.error('Error fetching event:', error);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [eventId]);



  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <img src={event.imageUrl} alt={event.title} className="w-full h-60 object-cover rounded-md mb-4" />
      <h1 className="text-2xl font-semibold mb-2">{event.title}</h1>
      <p className="text-gray-300 mb-4">{event.description}</p>
      <div className="flex justify-between mb-4">
        <p className="text-gray-400">Date: {event.date}</p>
        <p className="text-gray-400">Time: {event.time}</p>
      </div>
      <p className="text-gray-400 mb-2">Seats left : {event.seats}</p>
      <p className="text-gray-400 mb-2">Location: {event.city}</p>
      <Button className="p-4 mt-2"  disabled={loading}>
        {loading ? 'Booking...' : 'Book now'}
      </Button>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default EventDetail;*/

//perfekt
/*'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';

const EventDetail = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState(null);
  const eventId = pathname.split('/').pop();

  const fetchEvent = async () => {
    try {
      const response = await fetch(`/api/events/${eventId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEvent(data);
    } catch (error) {
      console.error('Error fetching event:', error);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  const handleBooking = async () => {
    setLoading(true);

    const userFullName = user.fullName;
    const userEmail = user.primaryEmailAddress?.emailAddress;

    if (!userFullName || !userEmail) {
      setMessage('User information is incomplete.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ eventId, name: userFullName, email: userEmail })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessage('Successfully booked the event');
      fetchEvent(); // Refresh event details to reflect updated seats
    } catch (error) {
      console.error('Error booking event:', error);
      setMessage('Failed to book the event');
    } finally {
      setLoading(false);
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <img src={event.imageUrl} alt={event.title} className="w-full h-60 object-cover rounded-md mb-4" />
      <h1 className="text-2xl font-semibold mb-2">{event.title}</h1>
      <p className="text-gray-300 mb-4">{event.description}</p>
      <div className="flex justify-between mb-4">
        <p className="text-gray-400">Date: {event.date}</p>
        <p className="text-gray-400">Time: {event.time}</p>
      </div>
      <p className="text-gray-400 mb-2">Seats left: {event.seats}</p>
      <p className="text-gray-400 mb-2">Location: {event.city}</p>
      {event.seats <= 0 && <p className="text-red-500">This event is fully booked.</p>}
      <Button className="p-4 mt-2" onClick={handleBooking} disabled={loading || event.seats <= 0}>
        {loading ? 'Booking...' : 'Book now'}
      </Button>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default EventDetail;*/

'use client'
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';

const EventDetail = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState(null);
  const eventId = pathname.split('/').pop();

  const fetchEvent = async () => {
    try {
      const response = await fetch(`/api/events/${eventId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEvent(data);
    } catch (error) {
      console.error('Error fetching event:', error);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  const handleBooking = async () => {
    setLoading(true);

    const userFullName = user.fullName;
    const userEmail = user.primaryEmailAddress?.emailAddress;

    if (!userFullName || !userEmail) {
      setMessage('User information is incomplete.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ eventId, name: userFullName, email: userEmail })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessage('Successfully booked the event');
      fetchEvent(); // Refresh event details to reflect updated seats
    } catch (error) {
      console.error('Error booking event:', error);
      setMessage('Failed to book the event');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    setLoading(true);

    try {
      const response = await fetch(`/api/avbokning`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ eventId, email: user.primaryEmailAddress?.emailAddress })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessage(data.message);
      fetchEvent(); // Refresh event details to reflect updated seats
    } catch (error) {
      console.error('Error cancelling booking:', error);
      setMessage('Failed to cancel booking');
    } finally {
      setLoading(false);
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <img src={event.imageUrl} alt={event.title} className="w-full h-96 object-cover rounded-md mb-4" />
      <h1 className="text-2xl font-semibold mb-2">{event.title}</h1>
      <p className="text-gray-300 mb-4">{event.description}</p>
      <div className="flex justify-between mb-4">
        <p className="text-gray-400">Date: {event.date}</p>
        <p className="text-gray-400">Time: {event.time}</p>
      </div>
      <p className="text-gray-400 mb-2">Seats left: {event.seats}</p>
      <p className="text-gray-400 mb-2">Location: {event.city}</p>
      {event.seats <= 0 && <p className="text-red-500">This event is fully booked.</p>}
      <Button className="p-4 mt-2 " onClick={handleBooking} disabled={loading || event.seats <= 0}>
        {loading ? 'Booking...' : 'Book now'}
      </Button>
      <Button className="p-4 m-2" onClick={handleCancelBooking} disabled={loading}>
        {loading ? 'Cancelling...' : 'Cancel booking'}
      </Button>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default EventDetail;
