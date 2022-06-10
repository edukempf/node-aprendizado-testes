class ExerciseTwoService {

    squaredValue(value: number): number {
        return value ** 2;
    }

    generateArrayOfDigitsFromNumber(value: number): number[] {
        return Array.from(String(value), Number);
    }

    sumSquaredValueFromNumber(value: number): number {
        const arrayOfDigits = this.generateArrayOfDigitsFromNumber(value);

        return arrayOfDigits.reduce((sumOfSquaredValues, digit) => {
            const digitSquaredValue = this.squaredValue(digit);
            return sumOfSquaredValues + digitSquaredValue;
        }, 0);
    }

    isHappyNumber(value: number) {
        let sumOfSquaredValues = this.sumSquaredValueFromNumber(value);

        if (sumOfSquaredValues === 1) {
            return true;
        }

        const numberAlredyGenerated = new Set<number>();
        numberAlredyGenerated.add(sumOfSquaredValues);
        // eslint-disable-next-line no-constant-condition
        while (true) {
            sumOfSquaredValues = this.sumSquaredValueFromNumber(sumOfSquaredValues);
            if (numberAlredyGenerated.has(sumOfSquaredValues)) {
                return false;
            }

            if (sumOfSquaredValues === 1) {
                return true;
            }

            numberAlredyGenerated.add(sumOfSquaredValues);
        }
    }

}

export default ExerciseTwoService;
