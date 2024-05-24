/*'use client'

import { useState, useEffect } from 'react';
function GamlaEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/event');
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
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    const currentDate = new Date().toISOString().split('T')[0];
    const pastEvents = events.filter(event => event.date < currentDate);
  
    return (
      <div className="flex flex-col items-center mb-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pastEvents.map(event => (
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
            </div>
          ))}
        </div>
      </div>
    );
  }
export default GamlaEvents*/

'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

function GamlaEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/event');
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

  if (loading) {
    return <div>Loading...</div>;
  }

  const currentDate = new Date().toISOString().split('T')[0];
  const pastEvents = events.filter(event => event.date < currentDate);

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pastEvents.map(event => (
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default GamlaEvents;
