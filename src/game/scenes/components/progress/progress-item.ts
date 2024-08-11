import {Assets, Sprite, type Texture, ColorMatrixFilter} from "pixi.js";
import {generateTexture} from "@/core/util/render.ts";
import {MainScene} from "@/game/scenes/main-scene.ts";
import {CellTypes} from "@/game/scenes/components/cell/cell-item.ts";

export class ProgressItem extends Sprite {

    private active = true;

    constructor(protected readonly cellType: CellTypes, protected readonly level: number) {
        super(Assets.get<Texture>(MainScene.getCellTextureByType(cellType)));

        this.anchor.set(0.5);

        const basicScale = 0.6;
        this.scale.set(basicScale);

        const filter = new ColorMatrixFilter();

        this.filters = [filter];

        this.inactivate();
    }

    inactivate(){
        if (!this.active) return;

        this.active = false;

        this.filters[0].desaturate();
    }

    activate(){
        if (this.active) return;

        this.active = true;

        this.filters[0].saturate();
    }
}


