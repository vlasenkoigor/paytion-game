import {Container, Graphics, Sprite, type ViewContainer} from "pixi.js";
import {generateTexture} from "@/core/util/render.ts";
import {CellItem, type CellTypes} from "@/game/scenes/components/cell/cell-item.ts";
import {getRandElement} from "@/core/util/math.ts";
import {Signal} from "@/core/util/Signal.ts";

interface TConfig {
    width: number;
    height: number;
}

export class Cell extends Container {
    public onCellClick: Signal<Cell> = new Signal();

    config = {
        width: 100,
        height: 100,
    }

    private cover: Sprite;

    private cellItem: CellItem;

    private clicked = false;

    constructor(config: TConfig) {
        super();

        this.config = config;

        this.addChild(this.createBackground());

        this.cellItem = this.addChild(new CellItem());
        this.cellItem.x = this.config.width / 2;
        this.cellItem.y = this.config.height / 2;

        this.cover = this.addChild(this.createCover());

        this.interactive = true;
        this.cursor = 'pointer';
        this.on('pointerdown', this.onClick.bind(this));

    }

    onClick(){
        this.clicked = true;

        this.disable();

        this.onCellClick.dispatch(this);
    }

    disable(){
        this.interactive = false;
    }


    public async reveal(cellType: CellTypes) {
        this.cellItem.show(cellType);

        this.cover.visible = false;
    }

    private createBackground() {
       const {width, height} = this.config
       return new Sprite(generateTexture(0x002960, 1, width, height));
    }

    private createCover() {
        const {width, height} = this.config
        return new Sprite(generateTexture(0xEDEB81, 1, width, height));
    }
}

