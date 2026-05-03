import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-display font-black text-[clamp(5rem,15vw,10rem)] text-white/10 leading-none">404</h1>
        <p className="font-inter text-lg text-white/60 mb-8">This page doesn&apos;t exist.</p>
        <Link href="/" className="btn-glow">Go home <ArrowRight className="w-4 h-4" /></Link>
      </div>
    </div>
  );
}
