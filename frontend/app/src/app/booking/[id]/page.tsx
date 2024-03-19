// pages/booking/[id].tsx
import Link from 'next/link';
import './details.css';

async function getBookingById(id: string) {
  const res = await fetch(`http://host.docker.internal:5000/api/booking/${id}`, { cache: 'no-store', mode: 'no-cors' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function BookingDetailsPage({ params }: { params: { id: string } }) {
  let booking = null;
  let error = null;

  try {
    booking = await getBookingById(params.id);
  } catch (err) {
    error = 'Error fetching booking details. Please try again later.';
    console.error('Error fetching booking details:', err);
  }

  // Function to format date to YYYY-MM-DD
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="booking-details-container">
      <h1>Booking Details</h1>
      {booking ? (
        <div className="booking-details">
          <p><strong>Doctor:</strong> {booking.doctor_name}</p>
          <p><strong>Service:</strong> {booking.service}</p>
          <p><strong>Start Time:</strong> {booking.start_time}</p>
          <p><strong>End Time:</strong> {booking.end_time}</p>
          <p><strong>Date:</strong> {formatDate(booking.date)}</p> {/* Format date here */}
        </div>
      ) : (
        <div className="error-message">{error}</div>
      )}
      <Link href="/" className="back-link">
        Back to Main Page
      </Link>
    </div>
  );
}
