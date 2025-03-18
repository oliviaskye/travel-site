Hotel Reservation System
-
Description
-
An hotel reservation website for an imaginary travel agency’s hotel reservation system. 
Built with the MERN stack, the project allows users to book hotels, manage their profile and reservations, 
and provides an admin panel for managing site content.

Participants
-
This project was a team effort by Abdullah al-Tammemi, Ricards Aleksejuks, Minoo Yaghoubi and Olivia Hinkle. All were involved in the development of components and troubleshooting issues 
in both the front and backend of the project at all stages. Specific responsibilities included:

Olivia Hinkle: Project management

Abdullah al-Tammemi: Backend management

Ricards Aleksejuks: User features and styling

Minoo Yaghoubi: Payment features, security and styling

Features
-
User authentication and authorization

Hotel room search and filtering

Room reservation and payment processing

User profile management and reservation history

Admin panel for content management

Dependencies
-
ReactJS: Frontend framework for the user interface.

Node.js: Backend runtime for handling server-side operations.

Express: Web framework for building API routes and handling requests.

Vite: Development build tool for faster frontend development.

CSS: Styling and layout for the user interface.

MongoDB: NoSQL database for storing user and hotel data.

mongoose: ODM library for interacting with MongoDB.

Stripe: Payment processing for hotel reservations.

JSON Web Token (JWT): User authentication and authorization.

bcrypt: Password hashing for secure authentication.

Postman: API testing tool for backend endpoints.

Render: Cloud hosting service for deployment.

Render
-
The project is hosted on Render cloud hosting, a production version can be viewed at https://traveler-brhm.onrender.com

Project Structure
-
```
travel-site/
│
├── admin/                     # Admin panel frontend
│   │
│   ├── .vite/                 # Vite config files
│   │
│   ├── src/                   # Admin panel source code
│   │   ├── components/        # Reusable UI components
│   │   │   ├── chart/         # Charts and analytics visualization
│   │   │   ├── featured/      # Featured content widgets
│   │   │   ├── navbar/        # Top navigation bar
│   │   │   ├── sidebar/       # Sidebar navigation menu
│   │   │   ├── widget/        # General dashboard widgets
│   │   │
│   │   ├── controllers/       # Admin panel logic handlers
│   │   │   ├── Add/           # Handles adding new entities
│   │   │   ├── Edit/          # Handles editing existing data
│   │   │   ├── Hotel/         # Manages hotel-related operations
│   │   │   ├── Reservation/   # Handles reservation management
│   │   │   ├── Rooms/         # Manages room data
│   │   │   ├── Users/         # User management functions
│   │   │
│   │   ├── pages/             # Full admin panel pages
│   │   │
│   │   ├── App.jsx            # Main React component
│   │   ├── index.css          # Global styles
│   │   ├── main.jsx           # React entry point
│   │
│   ├── .gitignore             # Ignore unnecessary files for Git
│   ├── index.html             # Main HTML file
│   ├── package-lock.json      # Dependency version tracking
│   ├── package.json           # Admin project dependencies
│   └── vite.config.js         # Vite config for admin panel
│
├── api/                       # Backend server
│   ├── controllers/           # Handles API request logic
│   ├── Middleware/            # Middleware functions (file upload handling)
│   ├── models/                # Database schemas (MongoDB)
│   ├── node_modules/          # Installed dependencies
│   ├── routes/                # API endpoint handlers
│   ├── uploads/               # Stores uploaded files (images, etc.)
│   ├── .env                   # Environment variables
│   ├── .gitignore             # Ignore unnecessary files for Git
│   ├── database.js            # MongoDB connection setup
│   ├── index.js               # Main backend entry point
│   ├── package-lock.json      # Dependency version tracking
│   ├── package.json           # Backend project dependencies
│
├── client/                    # Main frontend UI
│   │
│   ├── node_modules/          # Installed dependencies
│   │
│   ├── public/                # Static assets
│   │   └── assets/images/     # Stores image assets
│   │
│   └── src/                   # Frontend source code
│       ├── components/        # Reusable UI components
│       ├── Hotelcomponents/   # Hotel-related UI components
│       ├── Middleware/        # Context provider and themes
│       ├── pages/             # Page components for routing
│       ├── Style/             # CSS styles for the app
│       │
│       ├── .env               # Environment variables
│       ├── App.jsx            # Main React app component
│       ├── index.css          # Global styles
│       ├── main.jsx           # React app entry point
│
│   ├── .gitignore             # Ignore unnecessary files for Git
│   ├── index.html             # Main HTML file
│   ├── package-lock.json      # Dependency version tracking
│   ├── package.json           # Project dependencies
│   └── vite.config.js         # Vite configuration file
```
Local Installation
-
Clone the repository:
```
  git clone https: //github.com/your-repo/travel-site.git
```
Install dependencies for both client and server:
```
  cd api
  npm install
  
  cd ../client
  npm install
  
  cd ../admin
  npm install
```
Run the development servers:
```
  cd api
  npm start
  
  cd ../client
  npm run dev
  
  cd ../admin
  npm start
```
Access the application in your browser at http://localhost:3000

Database Schemas
-
```
Hotel:
const HotelSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    photos: {
      type: [String],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    phoneNumber: {
      type: Number,
    },
    country: {
      type: String,
    },
    cheapestPrice: {
      type: Number,
      required: true,
    },
    maxPrice: {
      type: Number, 
    },
    featured: {
      type: Boolean,
      default: false,
    },
});

Auth (User):
const userSchema = mongoose.Schema({
    name: { type: String, min: 2, max: 50, },

    email: { type: String, min: 5, max: 50,  unique: true },

    password: { type: String,  },

    phoneNumber: { type: String,  unique: true }, 

    country: { type: String,  },
    
    role: { type: String, enum: ["user", "admin"], default: "user" }
})

Reservation:
const ReservationSchema = new mongoose.Schema({
    HotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'canceled'],
      default: 'pending',
    },
    isPaid: { 
      type: Boolean,
      default: false,
    },
}, { timestamps: true });

Room:
const RoomSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    img: {
      type: [String],
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    roomNumber: {
      type: [Number],
      required: true,
      unique: true 
    },0
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true,
    },
});
```
API Endpoints:
-

**Auth Endpoints:**


// POST

Add a user: "localhost::5000/api/auth/register"

Authenticate a user: "localhost::5000/api/auth/login"


// GET

Get all users: "localhost::5000/api/auth/users"

Get current user: "localhost::5000/api/auth/users/:id"


// DELETE

Delete current user: "localhost::5000/api/auth/users/:id"


// PUT

Update current user: "localhost:5000/api/auth/users/:id"



**Hotel Endpoints:**


// POST

Add a hotel: "localhost/"


// UPDATE

Update hotel information: "/:id"


// DELETE

Remove a hotel listing: router.delete("/:id", deleteHotel);


// GET

Get all hotels: "localhost:5000/api/hotels"

Get a specific hotel by id: "localhost:5000/api/hotels/:id"

Use filter conditions to get specific hotels: "localhost:5000/api/hotels/filter"

Map function for hotel search: "localhost:5000/api/hotels/map"



**Payment Endpoints:**


// POST

Submit a payment for a reservation: "localhost:5000/api/payment"



**Reservation Endpoints:**


// POST

Add a new reservation: "localhost:5000/api/reservations/"


// GET

Get all reservations: "localhost:5000/api/reservations/all"

Get the current user's reservations: "localhost:5000/api/reservations/user/:id"

Get reservation to check validity: "localhost:5000/api/reservations"


// DELETE

Delete a reservation from the current user: "localhost:5000/api/reservations/:id"



**Room Endpoints:**


// POST

Add a new room listing: "localhost:5000/api/hotels/:hotelId/rooms"


// PUT

Update a room listing: "localhost:5000/api/hotels/:hotelId/rooms/:roomId"


// GET

Get all hotel rooms: "localhost:5000/api/hotels/:hotelId/rooms"

Get a specific room by id: "localhost:5000/api/hotels/:hotelId/rooms/:roomId"


// DELETE

Delete a room by id: "localhost:5000/api/hotels/:hotelId/rooms/:roomId"

