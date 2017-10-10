import Phaser from 'phaser-ce';
import { tissueColor, bacteriaColor } from './constants';

export default class TutorialState extends Phaser.State {

    preload() {

    }

    create() {
        console.log(this);

        this.stage.backgroundColor = tissueColor;

        const graphics = this.game.add.graphics(0, 0);

        graphics.beginFill(bacteriaColor);
        graphics.drawEllipse(0, 0, 50, 30);
        graphics.endFill();

        this.bacteria = this.game.add.sprite(this.world.centerX, this.world.centerY, graphics.generateTexture());

        graphics.destroy();
        this.bacteria.anchor.set(0.5);
    }

    update() {
        this.bacteria.rotation += 0.01;
    }

}