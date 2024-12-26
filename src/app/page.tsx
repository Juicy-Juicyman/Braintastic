import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-80 h-80 mb-6 rounded-full overflow-hidden">
          <Image
            src="/Hero.jpg"
            alt="Braintastic Hero"
            fill
            className="object-cover"
          />
        </div>
        <h1 className="text-5xl font-extrabold text-pink-500 mb-4 drop-shadow-md text-center">
          Welcome to Braintastic!
        </h1>
        <p className="text-lg font-medium text-blue-600 mb-8 text-center">
          Fun games to learn and grow while having a blast!
        </p>
      </div>
      <Link
        href="/games"
        className="px-6 py-3 bg-purple-500 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-purple-600 transition-all transform hover:scale-105"
      >
        Play Games
      </Link>
    </div>
  );
}
