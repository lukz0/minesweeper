import { NOT_OPEN, EMPTY_OPEN, BOMB, FLAG } from './emojis';
import Coords from '../game/Coords';

class Board {
    mainHTMLElement: HTMLDivElement = document.createElement('div');
    rows: number;
    cols: number;

    constructor(rows: number, cols: number, clickHandler: (evt: Event) => void) {
        this.rows = rows;
        this.cols = cols;
        Board.setStyleProps(this.mainHTMLElement, Board.mainElemProps);

        for (let ri = 0; ri < this.rows; ri++) {
            let row = document.createElement('div');
            Board.setStyleProps(row, Board.rowElemProps);

            for (let ci = 0; ci < this.cols; ci++) {
                let col = document.createElement('div');
                Board.setStyleProps(col, Board.colElemProps);

                col.setAttribute('ri', String(ri));
                col.setAttribute('ci', String(ci));

                let text = document.createElement('p');
                text.style.fontWeight = 'bolder';
                text.style.fontFamily = 'sans-serif';
                text.style.webkitTextStroke = '0.3px black';
                text.innerText = NOT_OPEN;
                Board.setStyleProps(text, Board.pColElemProps);

                ['click', 'contextmenu'].forEach(
                    v => col.addEventListener(v, clickHandler)
                );

                col.appendChild(text);
                row.appendChild(col);
            }

            this.mainHTMLElement.appendChild(row);
        }

        document.body.appendChild(this.mainHTMLElement);
    }

    getTileAtIndex(coords: Coords): HTMLDivElement {
        return this.mainHTMLElement.children[coords.row].children[coords.col] as HTMLDivElement;
    }

    setAtCoords(coords: Coords, value: number) {
        let text: string,
            tile: HTMLDivElement = this.getTileAtIndex(coords);
        switch (value) {
            case -1:
                text = BOMB;
                break;
            case -2:
                tile.style.removeProperty('background');
                text = NOT_OPEN;
                break;
            case -3:
                tile.style.removeProperty('background');
                text = FLAG;
                break;
            case 0:
                text = EMPTY_OPEN;
                break;
            default:
                text = value.toString();
                break;
        }

        if (value !== -2 && value !== -3) {
            tile.style.setProperty('background', '#999');
        }

        if (value > 0) {
            switch (value) {
                case 1:
                    (tile.children[0] as HTMLParagraphElement).style.color = 'blue';
                    (tile.children[0] as HTMLParagraphElement).style.webkitTextStroke = '0.3px black';
                    break;
                case 2:
                    (tile.children[0] as HTMLParagraphElement).style.color = 'green';
                    (tile.children[0] as HTMLParagraphElement).style.webkitTextStroke = '0.3px black';
                    break;
                case 3:
                    (tile.children[0] as HTMLParagraphElement).style.color = 'red';
                    (tile.children[0] as HTMLParagraphElement).style.webkitTextStroke = '0.3px black';
                    break;
                case 4:
                    (tile.children[0] as HTMLParagraphElement).style.color = 'purple';
                    (tile.children[0] as HTMLParagraphElement).style.webkitTextStroke = '0.3px black';
                    break;
                case 5:
                    (tile.children[0] as HTMLParagraphElement).style.color = 'maroon';
                    (tile.children[0] as HTMLParagraphElement).style.webkitTextStroke = '0.3px #400000';
                    break;
                case 6:
                    (tile.children[0] as HTMLParagraphElement).style.color = 'turquoise';
                    (tile.children[0] as HTMLParagraphElement).style.webkitTextStroke = '0.3px #207068';
                    break;
                case 7:
                    (tile.children[0] as HTMLParagraphElement).style.color = 'darkslategray';
                    (tile.children[0] as HTMLParagraphElement).style.webkitTextStroke = '0.3px #181818';
                    break;
                case 8:
                    (tile.children[0] as HTMLParagraphElement).style.color = 'gray';
                    (tile.children[0] as HTMLParagraphElement).style.webkitTextStroke = '0.3px #404040';
                    break;
            }
        } else {
            (tile.children[0] as HTMLParagraphElement).style.webkitTextStroke = '0.3px black';
        }

        (this.getTileAtIndex(coords).children[0] as HTMLParagraphElement).innerText = text;
    }

    static setStyleProps(elem: HTMLElement, properties: string[][]) {
        properties.forEach((args: string[]) => (elem.style.setProperty as any)(...args));
    }

    static mainElemProps: string[][] = [
        ['display', 'flex'],
        ['flex-direction', 'column'],
        ['background', '#333'],
        ['height', '100%'],
        ['width', '100%']
    ];

    static rowElemProps: string[][] = [
        ['display', 'flex'],
        ['flex', '1 1 0px']
    ];

    static colElemProps: string[][] = [
        ['flex', '1 0 0px'],
        ['display', 'flex'],
        ['justify-content', 'center'],
        ['align-items', 'center'],
        ['border', 'solid 1px']
    ];

    static pColElemProps: string[][] = [
        ['margin', '0'],
        ['font-size', '2vh'],
        ['color', '#ddd']
    ];
}

export default Board;