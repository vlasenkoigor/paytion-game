import { Game } from '@/core/Game.ts';
import {MainScene} from "@/game/scenes/main-scene.ts";


export class PaytionGame extends Game<[MainScene]> {
    constructor() {
        super([new MainScene()]);
    }
}
