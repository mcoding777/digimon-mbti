export interface Question {
    id: number;
    question: string;
    options: {
        text: string;
        value: string;
    }[];
    img: string;
}