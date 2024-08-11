import {Cell} from "@/game/scenes/components/cell/cell.ts";
import {Container} from "pixi.js";
import {Signal} from "@/core/util/Signal.ts";

export class CellsController {
    public onCellClick: Signal<{cell: Cell, controller: CellsController}> = new Signal();
    cells: Cell[] = [];

    config = {
        rows: 3,
        columns: 4,
        cellWidth: 160,
        cellHeight: 200,
        wGap: 20,
        hGap: 20,
    }

    constructor(protected readonly container: Container) {
        this.createCells();
    }

    createCells() {
        for (let i = 0; i < this.config.rows; i++) {
            for (let j = 0; j < this.config.columns; j++) {
                const cell = new Cell({
                    width : this.config.cellWidth,
                    height: this.config.cellHeight,
                });
                cell.x = j * (this.config.cellWidth +  this.config.wGap);
                cell.y = i * (this.config.cellHeight + this.config.hGap);
                cell.onCellClick.add((cell)=>{
                    this.onCellClick.dispatch({cell, controller: this});
                })

                this.container.addChild(cell);
                this.cells.push(cell);
            }
        }
    }


    disable(){
        this.cells.forEach(cell => cell.disable());
    }
}
