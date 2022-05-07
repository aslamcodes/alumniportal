import React from 'react'
import EventCard from '../components/EventCard'
import Navbar from '../components/Navbar'


const Events = () => {
  return (
    <div>
      <Navbar />
      <p>Upcomming Events</p>
      <div>
        <EventCard />
      </div>
    </div>
  )
}

export default Events