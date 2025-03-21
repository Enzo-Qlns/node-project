import { program as progQ } from "./questions";

// Ask to user program to run
const program = async (): Promise<void> => {
    console.log('Quel programme voulez-vous executer ?');
    console.log('1. Questions');
    console.log('2. Autre');
    const ask = require('readline').createInterface({ input: process.stdin, output: process.stdout });
    ask.question('Votre choix : ', (response: string) => {
        if (response === '1') {
            progQ();
        } else {
            console.log('Programme non trouvé');
        }
        ask.close();
    });
};

program();