import { fetchHighScores } from "../../utils/firebaseQueries";
import { HighScores } from "@/types/gametypes";

export default async function HighScorePage() {
  const data: HighScores[] = await fetchHighScores();

  const highScoresByGame = data.reduce(
    (acc: { [key: string]: HighScores[] }, highScore: HighScores) => {
      const gameName = highScore.game || "Unknown Game";
      if (!acc[gameName]) {
        acc[gameName] = [];
      }
      acc[gameName].push(highScore);
      return acc;
    },
    {}
  );
  for (const game in highScoresByGame) {
    highScoresByGame[game].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.attempts - b.attempts;
    });
  }

  return (
    <div className="min-h-screen p-6 bg-blue-50">
      <h1 className="text-4xl font-bold text-purple-700 mb-6 text-center">
        High Scores
      </h1>
      {Object.keys(highScoresByGame).length === 0 ? (
        <p className="text-2xl text-gray-700 text-center">
          No high scores available.
        </p>
      ) : (
        Object.entries(highScoresByGame).map(([gameName, scores]) => (
          <div key={gameName} className="mb-8 w-full max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {gameName}
            </h2>
            <div className="overflow-x-auto rounded shadow">
              <table className="min-w-full bg-white">
                <thead className="bg-purple-700 text-white">
                  <tr>
                    <th className="py-3 px-4 text-left font-semibold">Rank</th>
                    <th className="py-3 px-4 text-left font-semibold">
                      Nickname
                    </th>
                    <th className="py-3 px-4 text-left font-semibold">Score</th>
                    <th className="py-3 px-4 text-left font-semibold">
                      Attempts
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scores.map((hs, index) => (
                    <tr
                      key={hs.id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100 transition-colors`}
                    >
                      <td className="py-3 px-4 text-gray-800">{index + 1}</td>
                      <td className="py-3 px-4 text-gray-800">{hs.nickname}</td>
                      <td className="py-3 px-4 text-gray-800">{hs.score}</td>
                      <td className="py-3 px-4 text-gray-800">{hs.attempts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
