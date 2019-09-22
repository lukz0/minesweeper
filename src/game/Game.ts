import Board from "../graphics/Board";
import { EMPTY_OPEN } from '../graphics/emojis';
import coords from './Coords';
import Coords from "./Coords";

class Game {
    board: Board;
    rows: number; cols: number;
    bombLocations: boolean[][]; // [row][col]
    openedTiles: boolean[][]; // [row][col]
    flaggedTiles: boolean[][];
    bombAmount: number;

    constructor(rows: number, cols: number, bombAmount: number) {
        this.rows = rows;
        this.cols = cols;
        this.bombAmount = bombAmount;
        this.board = new Board(this.rows, this.cols, this.handleColClick.bind(this));
    }

    handleColClick(evt: MouseEvent) {
        let eventCoords: coords = new Coords(
            parseInt((evt.currentTarget as HTMLDivElement).getAttribute('ri')),
            parseInt((evt.currentTarget as HTMLDivElement).getAttribute('ci'))
        );
        switch (evt.button) {
            case 0: // left click
                evt.preventDefault();
                if (typeof this.bombLocations === 'undefined') {
                    this.plantBombs(eventCoords);
                }

                if (this.openTile(eventCoords)) {
                    console.log('lost the game');
                    this.looseGame();
                } else if (this.testIfWin()) {
                    console.log('won the game');
                    this.winGame();
                } else {
                    console.log('didn\'t win or loose');
                }
                break;
            case 2: // right click
                evt.preventDefault();
                this.flagTile(eventCoords);
                break;
        }
    }

    plantBombs(firstCoords: coords) {
        let invalidCoords: coords[] = [firstCoords, ...firstCoords.neighbours(this)],
            validBombLocationAmount: number = this.rows * this.cols - invalidCoords.length,
            unplantedBombs: number = this.bombAmount;

        this.bombLocations = [];
        this.openedTiles = Array(this.rows).fill(null).map(() => Array(this.cols).fill(false));
        this.flaggedTiles = Array(this.rows).fill(null).map(() => Array(this.cols).fill(false));

        for (let ri = 0; ri < this.rows; ri++) {
            let bombLocationsRow: boolean[] = [];
            for (let ci = 0; ci < this.cols; ci++) {
                if (Coords.isInCoordList(ri, ci, invalidCoords)) {
                    bombLocationsRow.push(false);
                } else {
                    if (Math.random() < unplantedBombs / validBombLocationAmount) {
                        bombLocationsRow.push(true);
                        unplantedBombs--;
                    } else {
                        bombLocationsRow.push(false);
                    }
                    validBombLocationAmount--;
                }
            }
            this.bombLocations.push(bombLocationsRow);
        }
    }

    openTile(tileCoords: coords): boolean {//true on game over
        if (
            this.openedTiles[tileCoords.row][tileCoords.col] ||
            this.flaggedTiles[tileCoords.row][tileCoords.col]
        ) {
            return false;
        } else {
            if (this.bombLocations[tileCoords.row][tileCoords.col]) {
                this.openedTiles[tileCoords.row][tileCoords.col] = true;
                this.board.setAtCoords(tileCoords, -1);
                return true;
            } else {
                let toBeOpened: Coords[] = [tileCoords];
                while (toBeOpened.length !== 0) {
                    let current: Coords = toBeOpened.pop();
                    if (!this.openedTiles[current.row][current.col]) {
                        this.openedTiles[current.row][current.col] = true;
                        let neighbours = current.neighbours(this),
                            neighbourBombAmount = neighbours.reduce(
                                (acc: number, tile: Coords) => this.bombLocations[tile.row][tile.col] ? acc + 1 : acc,
                                0
                            );

                        this.board.setAtCoords(current, neighbourBombAmount);

                        if (neighbourBombAmount === 0) {
                            toBeOpened = toBeOpened.concat(neighbours);
                        }
                    }
                }
            }
        }
    }

    flagTile(tileCoords: Coords) {
        if (!this.openedTiles[tileCoords.row][tileCoords.col]) {
            if (this.flaggedTiles[tileCoords.row][tileCoords.col]) {
                this.flaggedTiles[tileCoords.row][tileCoords.col] = false;
                this.board.setAtCoords(tileCoords, -2);
            } else {
                this.flaggedTiles[tileCoords.row][tileCoords.col] = true;
                this.board.setAtCoords(tileCoords, -3);
            }
        }
    }

    looseGame() {
        this.showBombs();
        alert('You lost');
    }

    winGame() {
        this.showBombs();
        alert('You won');
    }

    showBombs() {
        this.bombLocations.forEach((row: boolean[], ri: number) => row.forEach((hasBomb: boolean, ci: number) =>
            this.bombLocations[ri][ci] ? this.board.setAtCoords(new Coords(ri, ci), -1) : undefined
        ));
    }

    testIfWin(): boolean {
        for (let ri = 0; ri < this.rows; ri++) {
            for (let ci = 0; ci < this.cols; ci++) {
                if (!this.bombLocations[ri][ci] && !this.openedTiles[ri][ci]) {
                    return false;
                }
            }
        }
        return true;
    }
}

export default Game;