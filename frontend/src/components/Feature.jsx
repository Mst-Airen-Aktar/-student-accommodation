const features = [
  {
    title: "🏡 Verified Listings",
    desc: "All listings are verified and approved for international students.",
  },
  {
    title: "📍 Map-Based Search",
    desc: "Easily locate housing options near your campus.",
  },
  {
    title: "💬 Instant Chat",
    desc: "Communicate directly with landlords or roommates securely.",
  },
];

export default function Features() {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
      {features.map((feature, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition-all duration-300"
        >
          <h3 className="text-xl font-semibold text-pink-800 mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.desc}</p>
        </div>
      ))}
    </section>
  );
}
