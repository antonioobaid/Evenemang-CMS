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
        const res = await fetch('/api/events');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
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

export default EventList; */

/*'use client'
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Importera Image-komponenten från Next.js

function EventList() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/event');
        const events = await res.json();
        setEvents(events);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    getEvents();
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
          <div className="relative w-full h-40 mb-4">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Använd sizes för att förbättra prestanda
              style={{ objectFit: 'cover' }} 
              className="rounded-md"
            />
          </div>
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
  );
}

export default EventList;*/



//utan gamla evenemang och utna sortering
/*'use client'
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Importera Image-komponenten från Next.js

function EventList() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/event'); // Använd relativ URL för fetch
        const events = await res.json();
        setEvents(events);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    getData();
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
          <div className="relative w-full h-40 mb-4">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill // Använd fill för att fylla containern
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Använd sizes för att förbättra prestanda
              style={{ objectFit: 'cover' }} // Använd CSS-stil för object-fit
              className="rounded-md"
              priority // Lägg till egenskapen priority för att optimera LCP
            />
          </div>
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
  );
}

export default EventList;*/


//med gamla evenemang

/*'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function EventList() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/event');
        const events = await res.json();
        setEvents(events);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleEventClick = (eventId) => {
    router.push(`/events/detailPage/${eventId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const currentDate = new Date().toISOString().split('T')[0];
  const futureEvents = events.filter(event => event.date >= currentDate);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {futureEvents.map(event => (
          <div key={event.id} className="bg-gray-800 text-white p-4 rounded-md">
            <div className="relative w-full h-40 mb-4">
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
      <div className="flex justify-center mt-8">
        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => router.push('/events/gamlaEvenemang')}>
          View Old Events
        </Button>
      </div>
    </div>
  );
}

export default EventList;*/


'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function EventList() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/event');
        const events = await res.json();
        setEvents(events);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleEventClick = (eventId) => {
    router.push(`/events/detailPage/${eventId}`);
  };

  const handleSort = (option) => {
    setSortOption(option);
    let sortedEvents = [...events];
    if (option === 'time') {
      sortedEvents.sort((a, b) => new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time));
    } else if (option === 'place') {
      sortedEvents.sort((a, b) => a.city.localeCompare(b.city));
    }
    setEvents(sortedEvents);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const currentDate = new Date().toISOString().split('T')[0];
  const futureEvents = events.filter(event => event.date >= currentDate);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold text-white">Evenemang</h1>
        <div>
          <Button className="mr-2" onClick={() => handleSort('time')}>Sort by Time</Button>
          <Button onClick={() => handleSort('place')}>Sort by Place</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {futureEvents.map(event => (
          <div key={event.id} className="bg-gray-800 text-white p-4 rounded-md">
            <div className="relative w-full h-40 mb-4">
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
      <div className="flex justify-center mt-8">
        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => router.push('/events/gamlaEvenemang')}>
          View Old Events
        </Button>
      </div>
    </div>
  );
}

export default EventList;

