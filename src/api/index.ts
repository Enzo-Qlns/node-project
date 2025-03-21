import {
    createServer,
    IncomingMessage,
    ServerResponse
} from "http";
import { readFile } from "fs";
import { resolve } from "path";

export const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "GET" && req.url === "/questions") {
        const filePath = resolve("./ressources/questions.json");
        sendFile(res, filePath);
    } else if (req.method === "GET" && req.url === "/answers") {
        const filePath = resolve("./ressources/answers.json");
        sendFile(res, filePath);
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
});

function sendFile(res: ServerResponse, filePath: string): void {
    readFile(filePath, "utf8", (err, data) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Error reading file");
        } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(data);
        }
    });
}