// src/components/LocationList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [bookingData, setBookingData] = useState({ date: '', personCount: 1 });
  const [selectedLocation, setSelectedLocation] = useState(null);


  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:3001/locations');
        setLocations(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const handleBookGuide = (location) => {
    setSelectedLocation(location);
  };

  const handleModalClose = () => {
    setSelectedLocation(null);
  };
  const handlePersonCountChange = (e) => {
    const newPersonCount = parseInt(e.target.value, 10) || 1;
    // Ensure person count is at least 1
    setBookingData({ ...bookingData, personCount: Math.max(newPersonCount, 1) });
  };

  const handleBookingSubmit = async () => {
    try {
        if (!bookingData.date) {
            alert('Please select a date for booking.');
            return;
          }
      
      // Calculate the updated price based on person count
      const updatedPrice = selectedLocation.price * bookingData.personCount;

      // Prepare booking data
      const bookingDetails = {
        location: selectedLocation.name,
        date: bookingData.date,
        personCount: bookingData.personCount,
        overallPrice: updatedPrice,
      };

      // Send a POST request to the backend API
      const response = await axios.post('http://localhost:3001/bookings', bookingDetails);

      // Handle the response from the server as needed
      console.log('Booking successful:', response.data);
      alert('Booking successful!')

      // Reset the modal state after submitting
      handleModalClose();
    } catch (error) {
      console.error('Error creating booking:', error);
      // Handle errors from the server
    }
  };


  return (
    <div>
      <h2>Available Locations</h2>
      <div>
      </div>
      <div className="location-list">
        {locations.map((location) => (
          <div className="location-card" key={location._id}>
            <img  src={location.imageUrl} alt={`Location: ${location.name}`} />
            <h3>{location.name}</h3>
            <p>{location.description}</p>
            <button onClick={() => handleBookGuide(location)}>Book Guide</button>
          </div>
        ))}
      </div>

      {selectedLocation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <img width={'100px'} src={selectedLocation.imageUrl} alt={`Location: ${selectedLocation.imageUrl}`} />
            <h3>{selectedLocation.name}</h3>
            <label>
            Price: ${selectedLocation.price * bookingData.personCount}
            </label>
            <label>
              Date:
              <input
                type="date"
                value={bookingData.date}
                onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
              />
            </label>
            <label>
              Persons:
              <input
                type="number"
                value={bookingData.personCount}
                onChange={handlePersonCountChange}
              />
            </label>
            <button onClick={handleBookingSubmit}>Book Now</button>
            <button onClick={handleModalClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationList;
