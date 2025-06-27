import Hero from '../components/Hero';
import Features from '../components/Feature';
import CTA from '../components/CTA';

export default function HomePage() {
  return (
    <div className="bg-gray-50">
      <Hero/>
      <Features />
      <CTA />
    </div>
  );
}
