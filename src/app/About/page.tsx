import { localGames } from "@/data/games";
import Image from "next/image";

export const metadata = {
  title: "About | Braintastic",
  description:
    "Learn more about the mini-games and the idea behind Braintastic.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 text-purple-700">
      <section className="relative isolate overflow-hidden py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100/70 via-white/70 to-transparent" />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-5xl font-extrabold text-purple-600 drop-shadow-sm">
            Welcome to <span className="text-blue-600">Braintastic</span>
          </h1>
          <p className="mt-6 text-xl leading-relaxed">
            A pocket-sized playground of cognitive mini-games designed to keep
            your mind sharp and your smile wide.
          </p>
        </div>
      </section>

      {/* Games overview */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="mb-8 text-3xl font-bold text-center">What’s inside?</h2>

        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {localGames.map((game) => (
            <li
              key={game.slug}
              className="group relative overflow-hidden rounded-2xl bg-white/80 p-6 shadow-lg transition hover:shadow-xl"
            >
              <div className="relative mx-auto mb-4 h-24 w-24">
                <Image
                  src={game.imgSrc}
                  alt={game.name}
                  fill
                  className="rounded-full object-cover shadow group-hover:scale-110 transition-transform"
                />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-blue-600">
                {game.name}
              </h3>
              <p className="text-sm text-gray-700">{game.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
