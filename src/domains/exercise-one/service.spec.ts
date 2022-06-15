import ExerciseOneService from './service';

describe('ExerciseOneService unit tests', () => {
  let service;

  beforeEach(() => {
    service = new ExerciseOneService();
  });

  it('Should be multiple of 3', () => {
    expect(service.isMultipleOfThree(6)).toBe(true);
  });

  it('Should not be multiple of 3', () => {
    expect(service.isMultipleOfThree(2)).toBe(false);
  });

  it('Should be multiple of 5', () => {
    expect(service.isMultipleOfFive(10)).toBe(true);
  });

  it('Should not be multiple of 5', () => {
    expect(service.isMultipleOfFive(4)).toBe(false);
  });

  it('Should be multiple of 7', () => {
    expect(service.isMultipleOfSeven(21)).toBe(true);
  });

  it('Should not be multiple of 7', () => {
    expect(service.isMultipleOfSeven(5)).toBe(false);
  });

  it('Sum multiples of 3 or 5 below 1000 must be equal to 233168', () => {
    expect(service.sumMultiplesThreeOrFive()).toBe(233168);
  });

  it('Sum multiples of 3 and 5 below 1000 must be equal to 33165', () => {
    expect(service.sumMultiplesThreeAndFive()).toBe(33165);
  });

  it('Sum multiples of (3 or 5) and 7 below 1000 must be equal to 33173', () => {
    expect(service.sumMultiplesThreeOrFiveAndSeven()).toBe(33173);
  });
});
