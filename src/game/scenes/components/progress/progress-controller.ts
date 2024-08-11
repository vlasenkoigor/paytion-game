import {Container} from "pixi.js";
import {ProgressBar} from "@/game/scenes/components/progress/progress-bar.ts";

export class ProgressController {
    iBar: ProgressBar;

    nBar: ProgressBar;

    wBar: ProgressBar;

    constructor(protected readonly container: Container, totalWin: number) {
        this.createBars(totalWin);
    }

    private createBars(totalWin: number){
        const opt = {
            total: totalWin
        }
        this.iBar = this.container.addChild(new ProgressBar('I', 1, opt));
        this.iBar.x = 0;
        this.iBar.y = 0;

        this.nBar = this.container.addChild(new ProgressBar('N', 2, opt));
        this.nBar.x = 0;
        this.nBar.y = 140;

        this.wBar = this.container.addChild(new ProgressBar('W', 3, opt));
        this.wBar.x = 0;
        this.wBar.y = 280;
    }

    updateProgressOf(cellType: string, level: number){
        let bar: ProgressBar;

        switch (cellType) {
            case 'I':
                bar = this.iBar;
                break;
            case 'N':
                bar = this.nBar;
                break;
            case 'W':
                bar = this.wBar;
                break;
        }

        bar.updateProgress(level);
    }
}