import readline from 'readline';

import ExerciseTwoService from './service';

const consoleReadWrite = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

consoleReadWrite.question('Digite o número a ser validado se se trata de um número feliz:', number => {
    const service = new ExerciseTwoService();
    const isHappyNumber = service.isHappyNumber(Number(number));
    if (isHappyNumber) {
        console.info(`O número ${number} se trata de um número feliz`);
    }

    console.info(`O número ${number} não se trata de um número feliz`);

    consoleReadWrite.close();
});
