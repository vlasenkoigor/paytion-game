import { Application } from 'pixi.js';
import { ResizeData, ResizeService } from './services/resize.service';
import { SceneManager } from './scene/SceneManager';
import { Scene } from './scene/Scene';

interface ApplicationConfig {
  background: string;
  width?: number;
  height?: number;
}

export class Game<S extends readonly Scene<any>[]> {
  protected static instance: Game<any>;

  pixiApp: Application;

  config: ApplicationConfig;

  sceneManager: SceneManager<S>;

  scenes: S;

  public readonly resizeService = new ResizeService();

  constructor(scenes: S) {
    if (Game.instance) return Game.instance;

    this.pixiApp = new Application();


    this.scenes = scenes;

    Game.instance = this;
  }

  get stage() {
    return this.pixiApp.stage;
  }

  async start() {
    await this.pixiApp.init({ background: '#aab0ee' });

    document.querySelector('#game')?.appendChild(this.pixiApp.canvas);
    // document.body.appendChild(this.pixiApp.canvas);

    this.resizeService.add((data) => {
      this.pixiApp.renderer.resize(data.canvas.width, data.canvas.height);

      this.resize(data);
    });

    this.resizeService.init(this.pixiApp.canvas, {
      width: 800,
      height: 1600,
    });

    const scene = this.scenes[0];

    scene.game = this;

    await scene.preload();

    await scene.create();

    await this.create();
  }

  protected async create() {}

  protected resize(resizeData: ResizeData) {}

  static getInstance() {
    return this.instance;
  }
}
