import { program as progQ } from "./questions";
import { server } from "./api";

// Ask to user program to run
const program = async (): Promise<void> => {
    console.log('Quel programme voulez-vous executer ?');
    console.log('1. Questions');
    console.log('2. Serveur');
    console.log('3. Autre');
    const ask = require('readline').createInterface({ input: process.stdin, output: process.stdout });
    ask.question('Votre choix : ', (response: string) => {
        if (response === '1') {
            progQ();
        } else if (response === "2") {
            const PORT = 3000;
            server.listen(PORT, () => {
                console.log(`Server running at http://localhost:${PORT}/`);
            });
        } else {
            console.log('Programme non trouvé');
        }
        ask.close();
    });
};

program();