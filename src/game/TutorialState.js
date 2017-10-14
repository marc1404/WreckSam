import Phaser from 'phaser-ce';
import { tissueColor, bacteriaColor } from './constants';

export default class TutorialState extends Phaser.State {

    bacteria = null;

    tissue = {
        bacteria: null,
        macrophage: null,
        neutrophil: null
    };

    boneMarrow = {
        macrophage: null,
        neutrophil: null
    };

    preload() {
        this.game.load.image('bacteria', 'assets/sprites/bacteria.png');
        this.game.load.image('macrophage', 'assets/sprites/macrophage.png');
        this.game.load.image('macrophage_active', 'assets/sprites/macrophage_active.png');
        this.game.load.image('neutrophil', 'assets/sprites/neutrophil.png');
    }

    create() {
        console.log(this);

        this.stage.backgroundColor = tissueColor;

        this.bacteria = this.game.add.sprite(this.world.centerX, this.world.centerY, 'bacteria');

        this.bacteria.anchor.set(0.5);
        this.bacteria.scale.setTo(0.2);
    }

    update() {
        this.bacteria.rotation += 0.01;
    }

}

/*
    const graphics = this.game.add.graphics(0, 0);

    graphics.beginFill(bacteriaColor);
    graphics.drawEllipse(0, 0, 50, 30);
    graphics.endFill();

    this.bacteria = this.game.add.sprite(this.world.centerX, this.world.centerY, graphics.generateTexture());

    graphics.destroy();
 */