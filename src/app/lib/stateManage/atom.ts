import {atom} from "recoil";

export type opinionState = {
    Id: number;
    Mode: number;
    Text: string;
};

export const opinionsState = atom<opinionState[]>({
    key: "opinionState",
    default: [],
});

export const countState = atom({
    key: "count",
    default: 0,
});
