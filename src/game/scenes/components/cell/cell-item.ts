import {Assets, Sprite, type Texture} from "pixi.js";
import {generateTexture} from "@/core/util/render.ts";
import {MainScene} from "@/game/scenes/main-scene.ts";

export class CellItem extends Sprite {
    constructor() {
        super(Assets.get<Texture>(MainScene.getCellTextureByType('I')));

        this.anchor.set(0.5);

        this.visible = false;
    }

    async show(cellType: CellTypes) {
        this.setId(cellType);

        this.visible = true;
    }

    private setId(cellType: CellTypes) {
        this.texture = Assets.get<Texture>(MainScene.getCellTextureByType(cellType));
    }
}


export type CellTypes = 'I' | 'N' | 'W';
