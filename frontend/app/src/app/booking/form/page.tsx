"use client"
// pages/createBooking.tsx
import React, { useState } from 'react';
import './create.css';
import Link from 'next/link';

const CreateBooking = () => {
  const [formData, setFormData] = useState({
    service: '',
    doctor_name: '',
    start_time: '',
    end_time: '',
    date: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://host.docker.internal:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log('Booking inserted successfully');
        window.location.href = '/'; // Redirect to the main page
      } else {
        console.error('Failed to insert booking');
      }
    } catch (error) {
      console.error('Error inserting booking:', error);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-container">
        <h1 className="title">Create Booking</h1>

          <div className="form-group">
            <label htmlFor="service" className="label">Service:</label>
            <input type="text" id="service" name="service" className="input" required
              value={formData.service} onChange={handleChange} placeholder='Service A'/>
          </div>
          <div className="form-group">
            <label htmlFor="doctor_name" className="label">Doctor Name:</label>
            <input type="text" id="doctor_name" name="doctor_name" className="input" required
              value={formData.doctor_name} onChange={handleChange} placeholder='Dr. Smith'/>
          </div>
          <div className="form-group">
            <label htmlFor="start_time" className="label">Start Time:</label>
            <input type="text" id="start_time" name="start_time" className="input" required
              value={formData.start_time} onChange={handleChange} placeholder="HH:MM AM/PM" />
          </div>
          <div className="form-group">
            <label htmlFor="end_time" className="label">End Time:</label>
            <input type="text" id="end_time" name="end_time" className="input" required
              value={formData.end_time} onChange={handleChange} placeholder="HH:MM AM/PM" />
          </div>
          <div className="form-group">
            <label htmlFor="date" className="label">Date:</label>
            <input type="date" id="date" name="date" className="input" required
              value={formData.date} onChange={handleChange} />
          </div>
          <button type="submit" className="button">Submit</button>
          <Link href="/" className="back-link">
                Back to Main Page
            </Link>
        </div>
        
      </form>
    </div>
  );
};

export default CreateBooking;
