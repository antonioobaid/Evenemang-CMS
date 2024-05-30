'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function EventList() {
  const router = useRouter(); // Hook för att navigera mellan sidor
  const [events, setEvents] = useState([]); // State för att lagra evenemang
  const [loading, setLoading] = useState(true); // State för att hantera laddningsstatus
  const [sortOption, setSortOption] = useState(''); // State för att lagra sorteringsalternativet

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/event'); // Hämta data från API
        const events = await res.json(); // Konvertera svar till JSON
        setEvents(events); // Sätt den hämtade datan till state
      } catch (error) {
        console.error('Error fetching events:', error); // Hantera eventuella fel
      } finally {
        setLoading(false); // Stäng av laddningsstatus
      }
    };
    getData(); // Anropa funktionen för att hämta data
  }, []);

  const handleEventClick = (eventId) => {
    router.push(`/events/detailPage/${eventId}`); // Navigera till detaljsidan för valt evenemang
  };

  const handleSort = (option) => {
    setSortOption(option); // Sätt valt sorteringsalternativ
    let sortedEvents = [...events]; // Skapa en kopia av evenemangslistan för att sortera
    if (option === 'date') {
      sortedEvents.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sortera evenemang efter datum
    } else if (option === 'place') {
      sortedEvents.sort((a, b) => a.city.localeCompare(b.city)); // Sortera evenemang efter plats
    }
    setEvents(sortedEvents); // Uppdatera state med sorterade evenemang
  };

  if (loading) {
    return <div>Loading...</div>; // Visa laddningsmeddelande medan data hämtas
  }

  const currentDate = new Date().toISOString().split('T')[0]; // Hämta dagens datum i ISO-format
  const futureEvents = events.filter(event => event.date >= currentDate); // Filtrera ut evenemang som ligger i framtiden

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold text-white">Evenemang</h1>
        <div>
          <Button className="mr-2" onClick={() => handleSort('place')}>Sort by Place</Button>
          <Button onClick={() => handleSort('date')}>Sort by Date</Button>
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
            <h2 className="text-sm font-semibold">{event.title}</h2>
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
