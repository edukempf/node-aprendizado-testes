import ExerciseThreeService from './service';

describe('ExerciseTwoService unit tests', () => {
  let service;

  beforeEach(() => {
    service = new ExerciseThreeService();
  });

  it('Should be a prime number', () => {
    expect(service.isPrimeNumber(7)).toBe(true);
  });

  it('Should not be a prime number', () => {
    expect(service.isPrimeNumber(4)).toBe(false);
  });

  it('Should sanatize word', () => {
    expect(service.sanatizeWord('palavra')).toBe('palavra');
    expect(service.sanatizeWord('1dois3')).toBe('dois');
    expect(service.sanatizeWord('1doisTres')).toBe('doisTres');
  });

  it('Should convert word in value', () => {
    expect(service.convertWordValue('abc')).toBe(6);
    expect(service.convertWordValue('abcd')).toBe(10);
  });

  it('Should return that the word is happy but is neither prime nor multiple of 3 or 5', () => {
    expect(service.validadeExpression('W')).toStrictEqual({
      isHappy: true,
      isPrime: false,
      isMultipleFiveOrThree: false,
    });
  });

  it('Should return that the word is happy and prime but not multiple of 3 or 5', () => {
    expect(service.validadeExpression('abca')).toStrictEqual({
      isHappy: true,
      isPrime: true,
      isMultipleFiveOrThree: false,
    });
  });

  it('Should return that the word is happy and multiple of 3 or 5 but not prime', () => {
    expect(service.validadeExpression('abcd')).toStrictEqual({
      isHappy: true,
      isPrime: false,
      isMultipleFiveOrThree: true,
    });
  });

  it('Should return that the word is happy and multiple of 3 or 5 but not prime', () => {
    expect(service.validadeExpression('11111')).toStrictEqual({
      isHappy: false,
      isPrime: false,
      isMultipleFiveOrThree: true,
    });
  });
});
