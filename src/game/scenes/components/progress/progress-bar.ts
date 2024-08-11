import {Container, Graphics, Text} from "pixi.js";
import {CellTypes} from "@/game/scenes/components/cell/cell-item.ts";
import {ProgressItem} from "@/game/scenes/components/progress/progress-item.ts";
import {clamp} from "@/core/util/math.ts";

const WIDTH = 760;
const HEIGHT = 100;

type LevelOptions = {
    total : number
}

export class ProgressBar extends Container {

    items?: [ProgressItem, ProgressItem, ProgressItem]

    constructor(protected readonly cellType: CellTypes, protected readonly level: number, protected readonly opt: LevelOptions) {
        super();

        this.creteBackground();
        this.createTitle();
        this.createItems();
    }


    updateProgress(level:number){
        level = clamp(level, 0, 3);

        this.items[level-1].activate();
    }

    private createTitle(){
        const title = new Text(this.getText(), {
            fill: 0xFFFFFF,
            fontSize: 48,
            fontWeight: 'bold',
            align: 'center',
        });
        title.anchor.set(0, 0.5);
        title.x = 370;
        title.y = 0;
        this.addChild(title);
    }

    private createItems(){
        this.items = [new ProgressItem(this.cellType, this.level), new ProgressItem(this.cellType, this.level), new ProgressItem(this.cellType, this.level)];

        this.items.forEach((item, index) => {
            item.x = 50 + (index * 120);
            item.y = 0;
        })

        this.addChild(...this.items);
    }

    private creteBackground(){
        const bg = new Graphics();

        const width = this.getWidth();
        const height = this.getHeight();

        bg.roundRect(0, -height /2, width, height, 10);
        bg.fill({
            color: 0x005688,
        });
        this.addChild(bg);
    }

    private getWidth(){
        // return WIDTH - (this.level - 1) * 80;
        return  WIDTH
    }

    private getHeight(){
        // return HEIGHT - (this.level - 1) * 20;
        return HEIGHT;
    }

    private getText(): string{
        if (this.level === 1){
            return String(this.opt.total);
        }

        if (this.level === 2){
            return 'Large heist'.toUpperCase();
        }

        if (this.level === 3){
            return 'Small heist'.toUpperCase();
        }
    }

}