import BookingForm from "../components/BookingForm";

const sampleRoom = {
  title: "Modern Room near Helsinki Uni",
  city: "Helsinki",
  rent: 450,
};

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <BookingForm room={sampleRoom} />
    </div>
  );
}
