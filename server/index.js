import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cors());

const BookingSchema = new mongoose.Schema({
    passangerName: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

const Booking = mongoose.model("Booking", BookingSchema);

(async () => {
    const DATABASE_URI = process.env.DB_URI;
    try {
        await mongoose.connect(DATABASE_URI);
        console.log("Connected to database")
    } catch (error) {
        console.log("failed connecting to database")
    }
})();

app.route("/api/booking")
    .get(async (req, res) => {
        try {
            const bookings = await Booking.find();
            if (bookings) {
                return res.json(bookings);
            }
            res.status(400).json({ message: "No bookings found" });
        } catch (error) {
            res.status(500).json({ message: "Some error occured" });
        }
    })
    .post(async (req, res) => {
        try {
            const { passangerName, source, destination, time } = req.body;
            if (!(passangerName || source || destination || time)) {
                return res.status(400).json({ message: "Booking successful" });
            }
            const newBooking = new Booking({
                passangerName,
                source,
                destination,
                time,
            });

            await newBooking.save();

            return res.json({ message: "Booking Successful" });
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ message: "Some error occured" });
        }
    });

export default app;