import {Container, Graphics, Point, Sprite, Text} from "pixi.js";
import {createTextureFromGraphics} from "@/core/util/render.ts";
import {Resize, toCanvasCenter} from "@/core/services/resize.service.ts";
import {SpriteButton} from "@/core/ui/sprite-button.ts";
import {bound} from "@/core/decorators/decorators.ts";

const WIDTH = 700;
const HEIGHT = 1000;

export class SummaryPopup extends Container {
    private amountText: Text;

    private button: SpriteButton;

    private continueResolver: () => void | null = null;

    constructor() {
        super();
        this.createBackground();

        const title = new Text('Summary', {
            fill: 0x000000,
            fontSize: 69,
            fontWeight: 'bold',
            align: 'center',
        });
        title.anchor.set(0.5);
        title.x = WIDTH/2;
        title.y = 100;
        this.addChild(title);


        const text = new Text('You have stolen:', {
            fill: 0x000000,
            fontSize: 48,
            fontWeight: 'bold',
            align: 'center',
        });
        text.anchor.set(0.5);
        text.x = WIDTH/2;
        text.y = 400;
        this.addChild(text);

        const amount = new Text('1000', {
            fill: 0x38ED00,
            fontSize: 69,
            fontWeight: 'bold',
            align: 'center',
        });
        amount.anchor.set(0.5);
        amount.x = WIDTH/2;
        amount.y = 500;
        this.amountText = amount;
        this.addChild(amount);

        this.button = new SpriteButton({
            textures: ['button', 'button'],
            text: 'Continue',
            action: this.onClick,
            textStyle : {
                fill: 0xffffff,
                fontSize: 48,
                fontWeight: 'bold',
            }
        });

        this.button.view.x = WIDTH/2;
        this.button.view.y = 800;
        this.addChild(this.button.view);

        this.visible = false;
    }

    show(amount:number): Promise<void> {
        return new Promise<void>((resolve) => {
            this.visible = true;

            this.amountText.text = amount.toString();

            this.continueResolver = resolve;
        });
    }

    hide(){
        this.visible = false;

        if(this.continueResolver){
            this.continueResolver();
            this.continueResolver = null;
        }
    }


    @bound
    onClick(){
        this.button.enabled = false;

        this.hide();
    }

    createBackground() {
        const g = new Graphics();
        g.roundRect(0, 0, WIDTH, HEIGHT, 30);
        g.stroke({
            color: 0x000000,
            width: 10,
        })

        g.fill({
            color: 0xE4EDCD,
            alpha: 1,
        });

        this.addChild(g);
    }

    @Resize()
    private onResize(data) {
        const centerPoint = new Point();
        toCanvasCenter(centerPoint)(data);

        this.position.set(centerPoint.x - WIDTH/2, centerPoint.y - HEIGHT/2);
    }

}