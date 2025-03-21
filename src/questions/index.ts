import * as fs from 'fs/promises';
import * as readline from 'readline';

/** Lecture JSON */
const readJson = (filePath: string) => (): Promise<any> => 
  fs.readFile(filePath, 'utf-8').then(JSON.parse);

/** Écriture JSON */
const writeJson = (filePath: string) => (data: any): Promise<void> => 
  fs.writeFile(filePath, JSON.stringify(data, null, 2));

/** Crée une fonction qui pose une question */
const createAsk = (rl: readline.Interface) => (question: string) =>
  new Promise<string>(resolve => rl.question(question + ' ', resolve));

/** Recursion pour poser les questions */
const askQuestions = (ask: (q: string) => Promise<string>) => 
  (questions: string[], answers: Record<string, string> = {}): Promise<Record<string, string>> =>
    questions.length === 0
      ? Promise.resolve(answers)
      : ask(questions[0]).then(response =>
          askQuestions(ask)(questions.slice(1), { ...answers, [questions[0]]: response })
        );

/** Pipeline */
export const program = async (): Promise<void> => {
  const questionsData = await readJson('ressources/questions.json')();
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = createAsk(rl);
  const answers = await askQuestions(ask)(questionsData.questions);
  rl.close();
  await writeJson('ressources/answers.json')(answers);
  console.log('✅ Réponses sauvegardées dans answers.json');
};