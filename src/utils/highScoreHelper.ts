import { toast } from 'react-hot-toast';
import { saveHighScore } from '@/utils/firebaseQueries';

interface HandleSaveHighScoreProps {
  nickname: string;
  score: number;
  attempts: number;
  gameName: string;
  setIsSaving: (val: boolean) => void;
  resetGame: () => void;
}

export async function handleSaveHighScoreCommon(props: HandleSaveHighScoreProps) {
  const { nickname, score, attempts, gameName, setIsSaving, resetGame } = props;

  if (nickname.trim() === "") {
    toast.error("Please enter a nickname!");
    return;
  }

  setIsSaving(true);
  await saveHighScore({ nickname, score, attempts, gameName });
  setIsSaving(false);

  toast.success("Highscore saved!");
  resetGame();
}
