export default function Hero() {
  return (
    <section className="text-center px-4 py-20 bg-white shadow-sm">
      <h1 className="text-4xl md:text-5xl font-bold text-pink-800 mb-4 leading-tight">
        Find Student Housing in Finland with Ease
      </h1>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
        Discover verified rooms near your university. Affordable, secure, and perfect for international students.
      </p>
      <a
        href="/listings"
        className="inline-block bg-pink-800 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-pink-700 transition"
      >
        🔍 Explore Rooms
      </a>
    </section>
  );
}
