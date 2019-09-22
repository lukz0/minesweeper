import Game from "./Game";

//type coords = [number, number];
class Coords {
    row: number; col: number;

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
    }

    neighbours(game: Game): Coords[] {
        let result: Coords[] = [],
            isntFirstRow: boolean = this.row !== 0,
            isntLastRow: boolean = this.row !== game.rows - 1,
            isntFirstCol: boolean = this.col !== 0,
            isntLastCol: boolean = this.col !== game.cols - 1;

        if (isntFirstRow) {
            if (isntFirstCol) {
                result.push(new Coords(this.row - 1, this.col - 1));
            }
            result.push(new Coords(this.row - 1, this.col));
            if (isntLastCol) {
                result.push(new Coords(this.row - 1, this.col + 1));
            }
        }
        if (isntFirstCol) {
            result.push(new Coords(this.row, this.col-1));
        }
        if (isntLastCol) {
            result.push(new Coords(this.row, this.col+1));
        }
        if (isntLastRow) {
            if (isntFirstCol) {
                result.push(new Coords(this.row + 1, this.col - 1));
            }
            result.push(new Coords(this.row+1, this.col));
            if (isntLastCol) {
                result.push(new Coords(this.row + 1, this.col + 1));
            }
        }

        return result;
    }

    static isInCoordList(row: number, col: number, list: Coords[]): boolean {
        for (let coord of list) {
            if (coord.row === row && coord.col === col) {
                return true;
            }
        }
        return false;
    }
}

export default Coords;