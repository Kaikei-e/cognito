export type TheOpinion = {
    Mode: number,
    ID: number,
    Text: string
}

type GroupedOpinions = Map<number, TheOpinion[]>;

export type TheOpinionResponse = {
    Mode: string,
    ID: number,
    Text: string
}

export function ModeNumToText(mode: number): string {
    switch (mode) {
        case 0:
            return "Healthy Adult Mode";
        case 1:
            return "Vulnerable Child Mode";
        case 2:
            return "Dysfunctional Parent Mode";
        default:
            return "Unknown";
    }
}

export function GroupByMode(statements: TheOpinion[]): Map<number, TheOpinion[]> {
    const grouped = new Map<number, TheOpinion[]>();


    for (let i = 0; i < statements.length; i++){
        const v = statements[i];
        if (grouped.has(v.Mode)) {
            grouped.get(v.Mode)!.push(v);
        } else {
            grouped.set(v.Mode, [v]);
        }
    }

    return grouped;
}