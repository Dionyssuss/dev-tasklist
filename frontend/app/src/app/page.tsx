import BookingList from './components/BookingList';

async function getBookings() {
  const res = await fetch('http://host.docker.internal:5000/api/bookings', { cache: 'no-store', mode: 'no-cors' });
 
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
 
  return res.json();
}

const Page: React.FC = async () => {
  const bookings = await getBookings();

  return (
    <div>
      <BookingList bookings={bookings} />
    </div>
  );
};

export default Page;
