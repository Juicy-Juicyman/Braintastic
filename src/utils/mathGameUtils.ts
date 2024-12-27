import type { ProblemType } from '@/types/gametypes';

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateProblem(): ProblemType {
  const operations = ["+", "-", "*"];
  const num1 = Math.floor(Math.random() * 20) + 1;
  const num2 = Math.floor(Math.random() * 20) + 1;

  const operation = operations[Math.floor(Math.random() * operations.length)];

  let question: string;
  let answer: number;

  switch (operation) {
    case "+":
      question = `${num1} + ${num2}`;
      answer = num1 + num2;
      break;
    case "-":
      question = `${Math.max(num1, num2)} - ${Math.min(num1, num2)}`;
      answer = Math.max(num1, num2) - Math.min(num1, num2);
      break;
    case "*":
      question = `${Math.min(num1, 10)} * ${Math.min(num2, 10)}`;
      answer = Math.min(num1, 10) * Math.min(num2, 10);
      break;
    default:
      question = "";
      answer = 0;
  }

  return { question, answer };
}

export function generateOptions(correctAnswer: number): number[] {
  const optionsSet = new Set<number>();
  optionsSet.add(correctAnswer);

  while (optionsSet.size < 4) {
    const distractor = correctAnswer + getRandomInt(-10, 10);
    if (distractor !== correctAnswer && distractor >= 0) {
      optionsSet.add(distractor);
    }
  }

  const optionsArray = Array.from(optionsSet);
  return optionsArray.sort(() => Math.random() - 0.5);
}

export function generateHint(problem: ProblemType): string {
  if (problem.question.includes("+")) {
    return "Try adding the numbers together.";
  }
  if (problem.question.includes("-")) {
    return "Think about how much is left after subtracting.";
  }
  if (problem.question.includes("*")) {
    return "Multiplication is repeated addition.";
  }
  return "You can solve this!";
}
