"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import './list.css';
import { FaTrash } from 'react-icons/fa';

interface Booking {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
}

interface Props {
  bookings: Booking[];
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; // Extract only the date part
};

const BookingList: React.FC<Props> = ({ bookings: initialBookings }) => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 10;

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleDelete = async (id: number) => {
    // Display confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to delete this booking?');
    
    // If user confirms, proceed with deletion
    if (isConfirmed) {
      try {
        const response = await fetch(`http://host.docker.internal:5000/api/booking/${id}`, {
          method: 'DELETE'
        });
  
        if (response.ok) {
          console.log('Booking deleted successfully');
          // Remove the deleted booking from the current bookings state
          const updatedBookings = bookings.filter(booking => booking.id !== id);
          setBookings(updatedBookings); // Update the state to trigger re-render
        } else {
          console.error('Failed to delete booking');
        }
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    }
  };

  return (
    <div className="booking-list-container">
      <table className="booking-table">
        <thead>
          <tr>
            <th colSpan={5}>All Bookings</th>
          </tr>
          <tr>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBookings.map((booking) => (
            <tr key={booking.id}>
              <td>{formatDate(booking.date)}</td>
              <td>{booking.start_time}</td>
              <td>{booking.end_time}</td>
              <td className='center'>
                <Link href={`/booking/${booking.id}`}>
                  <button className="details-button">Details</button>
                </Link>
              </td>
              <td className='center'>
                <button className="delete-button" onClick={() => handleDelete(booking.id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={4}>
              <ul className="pagination">
                {Array.from({ length: Math.ceil(bookings.length / bookingsPerPage) }, (_, i) => (
                  <li key={i} onClick={() => paginate(i + 1)}>
                    <a>{i + 1}</a>
                  </li>
                ))}
              </ul>
            </td>
            <td>
              <Link href={`/booking/form`}>
                <button className="create-button">CREATE</button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;
