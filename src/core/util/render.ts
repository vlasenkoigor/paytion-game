import {Game} from "@/core/Game.ts";

import {RenderTexture, Graphics, Texture} from "pixi.js";

export function generateTexture(color, opacity = 1, width = 1, height = 1) {
    const renderer = Game.getInstance().pixiApp.renderer;

    const renderTexture = RenderTexture.create({ width: width, height: height });

    const graphics = new Graphics();



    graphics.rect(0, 0, width, height);

    graphics.fill({
        color: color,
        alpha: opacity,
    });

    renderer.render({
        container : graphics,
        target: renderTexture,
    });

    return renderTexture;
}


export function createTextureFromGraphics(graphics: Graphics): Texture {
    const renderer = Game.getInstance().pixiApp.renderer;

    const renderTexture = RenderTexture.create({ width: graphics.width, height: graphics.height });

    renderer.render({
        container : graphics,
        target: renderTexture,
    });

    return renderTexture;
}