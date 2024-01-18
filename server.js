// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection (Assuming you have a MongoDB database)
mongoose.connect('mongodb+srv://yorsibbu:12345678910@cluster0.wrycp28.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Define your schema and model (replace this with your actual data structure)

// Modify your schema in server.js
const bookingSchema = new mongoose.Schema({
    location: String,
    date: Date,
    personCount: Number,
    overallPrice: Number,
    slotId: { type: Number, unique: true, required: true },
  });
  
  const Booking = mongoose.model('Booking', bookingSchema);

  
const locationSchema = new mongoose.Schema({
    name: String,
    imageUrl: String,
    description: String,
    price : Number
  });
  
const Location = mongoose.model('Location', locationSchema);
  
// const seedLocations = async () => {
//     try {
//       const locations = [
//         { name: 'London', imageUrl: 'https://assets.vogue.in/photos/5ce43d58f55c27a7f4a28dce/1:1/w_1080,h_1080,c_limit/london-thames-river-uk.jpg', description: 'Beautiful city with historic landmarks.', price: 50 },
//         { name: 'Paris', imageUrl: 'https://www.mistraurbanfutures.org/sites/mistraurbanfutures.org/files/styles/square_250/public/2020-01/paris-skyline-eiffel-tower-champ-de-mars-france-tourism.jpg', description: 'Fashion city with natural landscapes in France.', price: 60 },
//         { name: 'Madrid C', imageUrl: 'https://cf.bstatic.com/xdata/images/landmark/square250/255614.jpg?k=19af74e429a0ed81aae0f7a24aa85fc3a60d7eaf6e6db77a4f6e2a22f4d1f9db&o=', description: 'Cultural city with vibrant arts scene in Spain', price: 55 },
//         { name: 'L A', imageUrl: 'https://i.pinimg.com/474x/9f/cd/91/9fcd91e3dc9b368bc254dbb93d5743a4.jpg', description: 'Modern city with technological advancements.', price: 70 },
//         // Add more locations as needed
//       ];
  
//       await Location.insertMany(locations);
//       console.log('Locations seeded successfully');
//     } catch (error) {
//       console.error('Error seeding locations:', error);
//     }
//   };
  
//   // Call the seedLocations function
//   seedLocations();
  
  

// Routes



// Add a new route in server.js
app.post('/bookings', async (req, res) => {
    try {
      const { location, date, personCount, overallPrice } = req.body;
  
      // Generate a unique slot ID (incremental)
      const latestBooking = await Booking.findOne().sort({ slotId: -1 });
      const nextSlotId = latestBooking ? latestBooking.slotId + 1 : 1;
  
      // Create a new booking
      const newBooking = new Booking({
        location,
        date,
        personCount,
        overallPrice,
        slotId: nextSlotId,
      });
  
      await newBooking.save();
  
      res.json({ message: 'Booking successful', booking: newBooking });
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
app.get('/locations', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Add a new route in server.js
app.get('/bookings', async (req, res) => {
    try {
      const bookings = await Booking.find().populate('location');
      res.json(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
