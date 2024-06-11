export class Status {
    id: number;
    descricao: string;
    color: string;

    constructor(id: number, descricao: string, color: string) {
        this.id = id;
        this.descricao = descricao;
        this.color = color;
    }
}