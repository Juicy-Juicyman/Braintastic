import { db } from "@/lib/firebase";
import type { Game } from "@/types/gametypes";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";



// Just a test query
export async function fetchHighScore() {
  try {
    const highscoreDocRef = doc(db, "highscore", "Highscore");
    const docSnap = await getDoc(highscoreDocRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching high score:", error);
    return null;
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
