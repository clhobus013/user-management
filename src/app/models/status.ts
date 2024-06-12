export class Status {
    id: number;
    description: string;
    color: string;

    constructor(id: number, description: string, color: string) {
        this.id = id;
        this.description = description;
        this.color = color;
    }
}