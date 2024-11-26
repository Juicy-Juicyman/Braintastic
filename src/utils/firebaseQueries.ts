import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";



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
