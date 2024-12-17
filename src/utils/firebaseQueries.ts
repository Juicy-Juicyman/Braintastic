import { db } from "@/lib/firebase";
import type { Game, HighScores } from "@/types/gametypes";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";



// Fetch highscores for all games
export async function fetchHighScores(): Promise<HighScores[]> {
  try {
    const highscoresCollectionRef = collection(db, "highscores");
    const snapshot = await getDocs(highscoresCollectionRef);
    const highscores: HighScores[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<HighScores, "id">),
    }));
    return highscores;
  } catch (error) {
    console.error("Error fetching highscores:", error);
    return [];
  }
}

// Fetch games info

export async function fetchGames(): Promise<Game[]> {
  try {
    const gamesCollection = collection(db, "games");
    const snapshot = await getDocs(gamesCollection);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Game, "id">),
    }));
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
}


// Save highscore's

export async function saveHighScore({
  nickname,
  score,
  attempts,
  gameName,
}: {
  nickname: string;
  score: number;
  attempts: number;
  gameName: string;
}) {
  try {
    const highscoreCollection = collection(db, "highscores");

    await addDoc(highscoreCollection, {
      nickname,
      score,
      attempts,
      game: gameName,
      timestamp: new Date(),
    });
    console.log("Highscore saved successfully");
  } catch (error) {
    console.error("Error while saving highscore", error);
  }
}
