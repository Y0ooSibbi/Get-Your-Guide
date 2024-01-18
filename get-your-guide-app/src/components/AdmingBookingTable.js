// src/components/AdminBookingTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminBookingTable.css'; // Import the CSS file

const AdminBookingTable = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3001/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Admin Panel - Booking Table</h2>
      <table>
        <thead>
          <tr>
            <th>Slot ID</th>
            <th>Location</th>
            <th>Date</th>
            <th>Person Count</th>
            <th>Overall Price</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.slotId}</td>
              <td>{booking.location}</td>
              <td>{new Date(booking.date).toLocaleDateString()}</td>
              <td>{booking.personCount}</td>
              <td>${booking.overallPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookingTable;
