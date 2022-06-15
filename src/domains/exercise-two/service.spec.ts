import ExerciseTwoService from './service';

describe('ExerciseTwoService unit tests', () => {
  let service;

  beforeEach(() => {
    service = new ExerciseTwoService();
  });

  it('Should calculate the squared value', () => {
    expect(service.squaredValue(7)).toBe(49);
    expect(service.squaredValue(2)).toBe(4);
  });

  it('Should transform number in array of digits', () => {
    expect(service.generateArrayOfDigitsFromNumber(49)).toEqual(
      expect.arrayContaining([4, 9]),
    );
    expect(service.generateArrayOfDigitsFromNumber(103)).toEqual(
      expect.arrayContaining([1, 0, 3]),
    );
  });

  it('Should sum the squared value from all digits of number', () => {
    expect(service.sumSquaredValueFromNumber(7)).toBe(49);
    expect(service.sumSquaredValueFromNumber(49)).toBe(97);
  });

  it('Should validate if the value is a happy number', () => {
    expect(service.isHappyNumber(7)).toBe(true);
  });

  it('Should validate if the value is a not happy number', () => {
    expect(service.isHappyNumber(4)).toBe(false);
  });
});
