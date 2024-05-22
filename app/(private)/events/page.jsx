/*'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

function EventList() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);
  const handleEventClick = (eventId) => {
    router.push(`/events/detailPage/${eventId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {events.map(event => (
        <div key={event.id} className="bg-gray-800 text-white p-4 rounded-md">
          <img src={event.imageUrl} alt={event.title} className="w-full h-40 object-cover rounded-md mb-4" />
          <h2 className="text-lg font-semibold">{event.title}</h2>
          <p className="text-gray-300">{event.description}</p>
          <div className="flex justify-between mt-4">
            <p className="text-gray-400">Date: {event.date}</p>
            <p className="text-gray-400">Time: {event.time}</p>
          </div>
          <p className="text-gray-400">Seats left : {event.seats}</p>
          <p className="text-gray-400">Location: {event.city}</p>
          <Button className="p-4 mt-2" onClick={() => handleEventClick(event.id)}>Book now</Button>
        </div>
      ))}
    </div>
  );
}
export default EventList*/

/*'use client'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

function EventList() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (eventId) => {
    router.push(`/events/detailPage/${eventId}`);
  };

  const sortByDateTime = () => {
    setSortBy('datetime');
    const sortedEvents = [...events].sort((a, b) => {
      if (a.date === b.date) {
        return a.time.localeCompare(b.time);
      }
      return a.date.localeCompare(b.date);
    });
    setEvents(sortedEvents);
  };

  const sortByLocation = () => {
    setSortBy('location');
    const sortedEvents = [...events].sort((a, b) => a.city.localeCompare(b.city));
    setEvents(sortedEvents);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="flex justify-end mb-4 mt-2">
        <Button className="mr-2" onClick={sortByDateTime}>Sort by Date & Time</Button>
        <Button onClick={sortByLocation}>Sort by Location</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map(event => (
          <div key={event.id} className="bg-gray-800 text-white p-4 rounded-md">
            <img src={event.imageUrl} alt={event.title} className="w-full h-40 object-cover rounded-md mb-4" />
            <h2 className="text-lg font-semibold">{event.title}</h2>
            <p className="text-gray-300">{event.description}</p>
            <div className="flex justify-between mt-4">
              <p className="text-gray-400">Date: {event.date}</p>
              <p className="text-gray-400">Time: {event.time}</p>
            </div>
            <p className="text-gray-400">Seats left : {event.seats}</p>
            <p className="text-gray-400">Location: {event.city}</p>
            <Button className="p-4 mt-2" onClick={() => handleEventClick(event.id)}>Book now</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventList; 
*/


'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

function EventList() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (eventId) => {
    router.push(`/events/detailPage/${eventId}`);
  };

  const sortByDateTime = () => {
    setSortBy('datetime');
    const sortedEvents = [...events].sort((a, b) => {
      if (a.date === b.date) {
        return a.time.localeCompare(b.time);
      }
      return a.date.localeCompare(b.date);
    });
    setEvents(sortedEvents);
  };

  const sortByLocation = () => {
    setSortBy('location');
    const sortedEvents = [...events].sort((a, b) => a.city.localeCompare(b.city));
    setEvents(sortedEvents);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const currentDate = new Date().toISOString().split('T')[0]; // dagens datum i formatet 'yyyy-mm-dd'
  const upcomingEvents = events.filter(event => event.date >= currentDate);
  const pastEvents = events.filter(event => event.date < currentDate);

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="flex justify-between w-full mb-4 mt-2 px-4">
        <div>
          <Button className="mr-2" onClick={sortByDateTime}>Sort by Date & Time</Button>
          <Button onClick={sortByLocation}>Sort by Location</Button>
        </div>
        <Link href="/events/gamlaEvenemang" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Gamla Evenemang
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {upcomingEvents.map(event => (
          <div key={event.id} className="bg-gray-800 text-white p-4 rounded-md">
            <img src={event.imageUrl} alt={event.title} className="w-full h-40 object-cover rounded-md mb-4" />
            <h2 className="text-lg font-semibold">{event.title}</h2>
            <p className="text-gray-300">{event.description}</p>
            <div className="flex justify-between mt-4">
              <p className="text-gray-400">Date: {event.date}</p>
              <p className="text-gray-400">Time: {event.time}</p>
            </div>
            <p className="text-gray-400">Seats left: {event.seats}</p>
            <p className="text-gray-400">Location: {event.city}</p>
            <Button className="p-4 mt-2" onClick={() => handleEventClick(event.id)}>Book now</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventList;
