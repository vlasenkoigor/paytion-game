import {Scene} from "@/core/scene/Scene.ts";
import {PaytionGame} from "@/game/game.ts";
import {Text, Sprite, Texture, Assets, Container} from "pixi.js";
import {onResize, toCanvas, toCanvasCenter} from "@/core/services/resize.service.ts";
import {generateTexture} from "@/core/util/render.ts";
import {Cell} from "@/game/scenes/components/cell/cell.ts";
import {CellsController} from "@/game/scenes/components/cell/cells-controller.ts";
import {bound} from "@/core/decorators/decorators.ts";
import {CellTypes} from "@/game/scenes/components/cell/cell-item.ts";
import {getRandElement} from "@/core/util/math.ts";
import {ProgressController} from "@/game/scenes/components/progress/progress-controller.ts";
import {SummaryPopup} from "@/game/scenes/components/summary-popup.ts";
import {wait} from "@/core/util/time.ts";

const MAX_WIN = 2900;

export class MainScene extends Scene<'main', PaytionGame> {
    private progressController: ProgressController;

    protected progressData: { I: number, N: number, W: number } = {I: 0, N: 0, W: 0};

    private summaryPopup: SummaryPopup;

    constructor() {
        super('main');
    }

    async preload(): Promise<void> {
        await Assets.load([
            {alias: 'bg', src: 'bg.jpg'},
            {alias: 'ball-I', src: 'ball-I.png'},
            {alias: 'ball-N', src: 'ball-N.png'},
            {alias: 'ball-W', src: 'ball-W.png'},
            {alias: 'button', src: 'button.png'},

        ])
    }

    async create(): Promise<void> {
        super.create();

        const progressTitle = new Text('Match 3 to steal', {
            fill: 0xFFFFFF,
            fontSize: 48,
            fontWeight: 'bold',
            align: 'center',
        });
        progressTitle.anchor.set(0.5);
        toCanvas(progressTitle, data => ({x: data.canvas.width / 2, y: 100}));
        this.game.stage.addChild(progressTitle);


        // create progress container
        const progressContainer = new Container();
        toCanvas(progressContainer, data => ({x: 20, y: 220}));
        this.game.stage.addChild(progressContainer);

        this.progressController = new ProgressController(progressContainer, MAX_WIN);

        // progressContainer.pivot.set(progressContainer.width / 2, progressContainer.height / 2);


        // create cells
        const cellsContainer = new Container();
        onResize((data) => {
            cellsContainer.x = data.canvas.width / 2;
            cellsContainer.y = data.canvas.height / 2 + 200;
        });
        this.game.stage.addChild(cellsContainer);
        const cellsController = new CellsController(cellsContainer);

        cellsContainer.pivot.set(cellsContainer.width / 2, cellsContainer.height / 2);

        cellsController.onCellClick.add(this.onCellClicked);

        this.summaryPopup = new SummaryPopup();

        this.game.stage.addChild(this.summaryPopup);
    }

    @bound
    async onCellClicked({cell, controller}: { cell: Cell, controller: CellsController }) {
        const nextCellType = this.generateNextCellType();

        const newProgress = ++this.progressData[nextCellType]

        const isCompleted = newProgress === 3;

        if (isCompleted) {
            controller.disable();
        }

        await Promise.all([
            cell.reveal(nextCellType),
            this.progressController.updateProgressOf(nextCellType, newProgress)
        ]);

        if (isCompleted) {
            let totalWin = 0;

            if (nextCellType === 'I') {
                totalWin = MAX_WIN;
            } else if (nextCellType === 'N') {
                totalWin = MAX_WIN * 0.7;
            } else {
                totalWin = MAX_WIN * 0.3;
            }


            await wait(1000);
            await this.summaryPopup.show(Number(totalWin.toFixed(2)));
        }
    }


    private generateNextCellType(): CellTypes {
        const types: CellTypes[] = ['I', 'N', 'W'];

        return getRandElement(types);
    }

    static getCellTextureByType(type: CellTypes) {
        switch (type) {
            case 'I':
                return 'ball-I';
            case 'N':
                return 'ball-N';
            case 'W':
                return 'ball-W';
        }
    }

}