import mongoose from "mongoose";

// Define the Reservation schema
const ReservationSchema = new mongoose.Schema(
  {
    HotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
      enum: ["pending", "confirmed", "canceled"],
      default: "pending",
    },
  },
<<<<<<< HEAD
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
=======
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Validation for dates
ReservationSchema.pre("save", function (next) {
  if (this.startDate >= this.endDate) {
    next(new Error("Start date must be before the end date."));
  } else {
    next();
  }
});

export default mongoose.model("Reservation", ReservationSchema);

>>>>>>> 01f5fb9425a6a48dce9d152382c3169c5238801a

