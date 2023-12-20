// import { StickyNavbar } from "./components/NavBar";
import { cities, feedbacks, serverURL } from "./constants";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import FeedbackCard from "./components/FeedbackCard";
import BookingDetailCard from "./components/BookingDetailsCard";
import toast from "react-hot-toast";

function App() {
  const [bookingDetails, setBookingDetails] = useState({
    passangerName: "",
    source: "",
    destination: "",
    time: "",
  });

  const [bookingHistory, setBookingHistory] = useState([]);

  const resetBookingDetails = () => {
    setBookingDetails({
      passangerName: "",
      source: "",
      destination: "",
      time: "",
    });
  };

  const fetchBookingDetails = async () => {
    try {
      const { data } = await axios.get(`${serverURL}/api/booking`);
      setBookingHistory(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchBookingDetails();
  }, [fetchBookingDetails]);
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const handleBookTicket = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${serverURL}/api/booking`, bookingDetails);
      toast.success("Ticket booked successfully", { id: "toast" });
    } catch (error) {
      console.log(error.message);
      toast.error("Some error occurred", { id: "toast" });
    } finally {
      resetBookingDetails();
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="p-4 text-center">
          <h2 className="text-3xl text-red-500 font-extrabold">
            Booking Ticket
          </h2>
          <form
            onSubmit={handleBookTicket}
            className="flex gap-1 p-2 items-center flex-wrap justify-center"
          >
            <input
              type="text"
              id="passangerName"
              onChange={handleInputChange}
              value={bookingDetails.passangerName}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Passanger Name"
              required
            />
            <select
              required
              onChange={handleInputChange}
              id="source"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={bookingDetails.source}
            >
              <option value="" defaultValue>
                Select Source
              </option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <select
              required
              onChange={handleInputChange}
              id="destination"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={bookingDetails.destination}
            >
              <option value="" defaultValue>
                Select Destination
              </option>
              {cities
                .filter((city) => city && city !== bookingDetails.source)
                .map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>
            <input
              onChange={handleInputChange}
              type="datetime-local"
              id="time"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date"
              value={bookingDetails.time}
              required
            />
            <button
              type="submit"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Book now
            </button>
          </form>
        </div>

        <div className="p-4  text-center">
          <h2 className="text-3xl text-red-500 font-extrabold">
            Booking History
          </h2>
          {bookingHistory.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 p-2 items-center">
              {bookingHistory.map((history, index) => (
                <BookingDetailCard
                  passangerName={history.passangerName}
                  key={index}
                  source={history.source}
                  destination={history.destination}
                  time={history.time}
                />
              ))}
            </div>
          ) : (
            <p className="text-2xl text-center w-full p-4 font-extrabold text-red-300">
              No booking details found
            </p>
          )}
        </div>

        <div className="p-4 text-center">
          <h2 className="text-3xl text-red-500 font-extrabold">
            Customer's Feedback
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 p-2 items-center">
            {feedbacks.map((feedback) => (
              <FeedbackCard
                key={feedback.name}
                name={feedback.name}
                img={feedback.img}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
