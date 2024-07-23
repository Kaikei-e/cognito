import path from 'path';
import * as fs from 'node:fs';
import { GroupByMode, ModeNumToText, TheOpinion, TheOpinionResponse } from "@/types/schemaSession";
import { NextResponse } from "next/server";

type ResponseData = {
    dirPath: string,
}

export async function POST(request: Request) {
    try {
        // Parse JSON and log type and content
        let sessionStatements: TheOpinion[] = await request.json();
        if (Array.isArray(sessionStatements)) {
            console.log('sessionStatements is an array');
            sessionStatements.forEach((statement, index) => {
                console.log(`Statement ${index}:`, statement);
            });
        } else {
            console.log('sessionStatements is not an array');
        }

        let groupedStatements = GroupByMode(sessionStatements);


        let sessionStatementsResponse: Array<{ mode: string, statements: TheOpinionResponse[] }> = [];
        groupedStatements.forEach((statements, mode) => {
            const sessionStatement = statements.map((v) => ({
                Mode: ModeNumToText(v.Mode),
                ID: v.ID,
                Text: v.Text,
            }));
            sessionStatementsResponse.push({
                mode: ModeNumToText(mode),
                statements: sessionStatement,
            });
        });

        const currentWorkingDirectory = process.cwd();
        const targetSessionDir = path.join(currentWorkingDirectory, "CBT");

        if (!checkExistenceOfTargetDir(targetSessionDir)) {
            try {
                fs.mkdirSync(targetSessionDir);
            } catch (err) {
                console.error(`Error creating directory: ${targetSessionDir}`, err);
                return NextResponse.json({ dirPath: "Error creating directory" }, { status: 500 });
            }
        }

        const tNow = new Date();
        const tNowRFC3339 = tNow.toISOString();
        const targetFilePath = path.join(targetSessionDir, `cbt_session_${tNowRFC3339}.json`);

        if (checkExistenceOfTargetFile(targetFilePath)) {
            return NextResponse.json({ dirPath: targetFilePath });
        }

        try {
            fs.writeFileSync(targetFilePath, JSON.stringify(sessionStatementsResponse));
            return NextResponse.json({ dirPath: targetFilePath });
        } catch (err) {
            console.error(`Error creating file: ${targetFilePath}`, err);
            return NextResponse.json({ dirPath: "Error creating file" }, { status: 500 });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ dirPath: "Error processing request" }, { status: 500 });
    }
}

function checkExistenceOfTargetDir(filePath: string): boolean {
    try {
        return fs.existsSync(filePath);
    } catch (err) {
        console.error(`Error checking existence of file: ${filePath}`, err);
        return false;
    }
}

function checkExistenceOfTargetFile(filePath: string): boolean {
    try {
        return fs.existsSync(filePath);
    } catch (err) {
        console.error(`Error checking existence of file: ${filePath}`, err);
        return false;
    }
}