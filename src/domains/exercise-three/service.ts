import ExerciseOneService from '../exercise-one/service';
import ExerciseTwoService from '../exercise-two/service';

type ResponseExpressionValidate = {
  isHappy: boolean;
  isPrime: boolean;
  isMultipleFiveOrThree: boolean;
};

class ExerciseThreeoService {
  private letterValues: Map<string, number>;

  constructor() {
    this.letterValues = new Map<string, number>();
    const indexAlphabet = 10;
    const alphabet = [...Array(26)].map((_, index) => {
      return (index + indexAlphabet).toString(36);
    });

    alphabet.forEach((letter, index) =>
      this.letterValues.set(letter, index + 1),
    );
    alphabet.forEach((letter, index) =>
      this.letterValues.set(letter.toUpperCase(), index + 27),
    );
  }

  isPrimeNumber(value: number): boolean {
    let numberDivisors = 0;
    for (let divider = 1; divider <= value; divider += 1) {
      if (value % divider === 0) {
        numberDivisors += 1;
      }
    }

    return numberDivisors === 2;
  }

  sanatizeWord(word: string): string {
    return word.replace(/[^a-zA-Z]/gi, '');
  }

  convertWordValue(word: string): number {
    const arrayLetters = Array.from(word);
    return arrayLetters.reduce((value, letter) => {
      const letterValue = this.letterValues.get(letter)!;
      return value + letterValue;
    }, 0);
  }

  validadeExpression(expression: string): ResponseExpressionValidate {
    const exerciseTwoService = new ExerciseTwoService();
    const exerciseOneService = new ExerciseOneService();

    const sanatizedWord = this.sanatizeWord(expression);
    const valueOfExpression = this.convertWordValue(sanatizedWord);

    const isPrime = this.isPrimeNumber(valueOfExpression);
    const isHappy = exerciseTwoService.isHappyNumber(valueOfExpression);
    const isMultipleFiveOrThree =
      exerciseOneService.isMultipleOfFive(valueOfExpression) ||
      exerciseOneService.isMultipleOfThree(valueOfExpression);

    return {
      isHappy,
      isMultipleFiveOrThree,
      isPrime,
    };
  }
}

export default ExerciseThreeoService;
