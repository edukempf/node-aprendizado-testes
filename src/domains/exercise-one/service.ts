class ExerciseOneService {
  private LIMIT = 1000;

  isMultipleOfThree(value: number): boolean {
    return !(value % 3);
  }

  isMultipleOfFive(value: number): boolean {
    return !(value % 5);
  }

  isMultipleOfSeven(value: number): boolean {
    return !(value % 7);
  }

  sumMultiplesThreeOrFive() {
    let number = 0;
    let sum = 0;

    while (number < this.LIMIT) {
      if (this.isMultipleOfFive(number) || this.isMultipleOfThree(number)) {
        sum += number;
      }

      number += 1;
    }

    return sum;
  }

  sumMultiplesThreeAndFive() {
    let number = 0;
    let sum = 0;

    while (number < this.LIMIT) {
      if (this.isMultipleOfFive(number) && this.isMultipleOfThree(number)) {
        sum += number;
      }

      number += 1;
    }

    return sum;
  }

  sumMultiplesThreeOrFiveAndSeven() {
    let number = 0;
    let sum = 0;

    while (number < this.LIMIT) {
      if (
        (this.isMultipleOfFive(number) || this.isMultipleOfThree(number)) &&
        this.isMultipleOfSeven(number)
      ) {
        sum += number;
      }

      number += 1;
    }

    return sum;
  }
}

export default ExerciseOneService;
