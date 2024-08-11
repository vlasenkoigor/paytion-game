import {Button} from '@pixi/ui';

import {Texture, Text, Sprite, Container, TextStyle} from 'pixi.js';

type ButtonTextures = [normal: Texture, pressed: Texture];
type ButtonTexturesConfig = [normal: string, pressed: string];

export class SpriteButton extends Button {
    private buttonView = new Container();
    private textView: Text;
    private buttonBg = new Sprite();
    private action: (event: string) => void;

    textures: ButtonTextures;

    constructor(props: {
        textures: ButtonTextures | ButtonTexturesConfig;
        text?: string;
        textStyle?: Partial<TextStyle>;
        disabled?: boolean;
        action?: (event: string) => void;
    }) {
        super(/* we can set a view for button later */);

        this.textures = props.textures.map((texture) =>
            typeof texture === 'string' ? Texture.from(texture) : texture,
        ) as ButtonTextures;

        this.view = this.buttonView;

        this.buttonBg.texture = this.textures[0];

        this.buttonBg.anchor.set(0.5);

        const style = props.textStyle || {
            fontSize: 40,
            fill: 0xffffff,
        };

        this.textView = new Text(props.text || '', style);
        this.textView.y = -10;
        this.textView.anchor.set(0.5);

        this.buttonView.addChild(this.buttonBg, this.textView);

        this.enabled = !props.disabled;

        this.action = props.action || (() => {
        });
    }

    override down() {
        this.buttonBg.texture = this.textures[1];
    }

    override up() {
        this.buttonBg.texture = this.textures[0];
    }

    override upOut() {
        this.buttonBg.texture = this.textures[0];
    }

    override out() {
        if (!this.isDown) {
            this.buttonBg.texture = this.textures[0];
        }
    }

    override press() {
        this.action('onPress');
    }

    override hover() {
        if (!this.isDown) {
            this.buttonBg.texture = this.textures[1];
        }
    }

    set enabled(enabled: boolean) {
        super.enabled = enabled;
        this.buttonBg.texture = enabled ? this.textures[0] : this.textures[1];
    }
}
