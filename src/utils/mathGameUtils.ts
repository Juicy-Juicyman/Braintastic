import type { ProblemType } from '@/types/gametypes';

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateProblem(): ProblemType {
  const operations = ['+', '-', '*', '/'];
  const operation = operations[getRandomInt(0, operations.length - 1)];

  let num1 = getRandomInt(1, 20);
  let num2 = getRandomInt(1, 20);

  if (operation === '/') {
    num2 = getRandomInt(1, 10);
    num1 = num2 * getRandomInt(1, 10);
  }

  const question = `${num1} ${operation} ${num2}`;
  let answer: number;

  switch (operation) {
    case '+':
      answer = num1 + num2;
      break;
    case '-':
      answer = num1 - num2;
      break;
    case '*':
      answer = num1 * num2;
      break;
    case '/':
      answer = num1 / num2;
      break;
    default:
      answer = 0;
      break;
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
  const [num1Str, operation, num2Str] = problem.question.split(' ');
  const num1 = parseInt(num1Str);
  const num2 = parseInt(num2Str);

  switch (operation) {
    case '+':
      return `Add ${num1} and ${num2}.`;
    case '-':
      return `Subtract ${num2} from ${num1}.`;
    case '*':
      return `Multiply ${num1} by ${num2}.`;
    case '/':
      return `Divide ${num1} by ${num2}.`;
    default:
      return '';
  }
}
