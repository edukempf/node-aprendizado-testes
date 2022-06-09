export default {
    clearMocks: true,
    preset: 'ts-jest',
    moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/src/$1',
    },
};
