import Phaser from 'phaser-ce';
import { tissueColor, boneMarrowColor } from './constants';
import { modalService } from '../modals';

export default class TutorialState extends Phaser.State {

    timerFactor = 1;

    health = {
        bar: null,
        text: null,
        percent: 100
    };

    tissue = {
        bacteria: null,
        macrophage: null,
        neutrophil: null
    };

    boneMarrow = {
        backdrop: null,
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

        this.createHealth();
        this.createTissue();
        this.createBoneMarrow();
        this.startBacteriaTimer();
    }

    createHealth() {
        this.health.bar = this.game.add.graphics(0, 0);
        this.health.text = this.game.add.text(1, 0, '100%', { font: 'normal 12pt Arial' });
    }

    createSprite(x, y, key) {
        const sprite = this.game.add.sprite(x, y, key);

        sprite.anchor.set(0.5);

        return sprite;
    }

    createBacteria(x, y) {
        return this.createSprite(x, y, 'bacteria');
    }

    createMacrophage(x, y) {
        return this.createSprite(x, y, 'macrophage');
    }

    createNeutrophil(x, y) {
        return this.createSprite(x, y, 'neutrophil');
    }

    createTissue() {
        this.stage.backgroundColor = tissueColor;

        this.createTissueBacteria();
        this.createTissueMacrophageAnimation();

        this.createTissueMacrophage();
        this.createTissueNeutrophil();
    }

    createTissueBacteria() {
        const bacteria = this.createBacteria(this.world.centerX, 100);
        bacteria.rotation += 0.5;
        bacteria.data.rotation = 0.01;

        const scale = (this.world.width * 0.6) / bacteria.width;
        bacteria.scale.setTo(scale);

        bacteria.visible = false;

        this.tissue.bacteria = bacteria;
    }

    createTissueMacrophage() {
        const x = this.world.centerX * 0.6;
        const macrophage = this.createMacrophage(x, this.world.centerY);
        macrophage.rotation -= 0.8;

        const scale = (this.world.width * 0.5) / macrophage.width;
        macrophage.scale.setTo(scale);

        macrophage.visible = false;

        this.tissue.macrophage = macrophage;
    }

    createTissueMacrophageAnimation() {
        this.time.events.loop(Phaser.Timer.QUARTER * 2, () => {
            const { macrophage } = this.tissue;
            const key = macrophage.key === 'macrophage' ? 'macrophage_active' : 'macrophage';

            macrophage.loadTexture(key);
        });
    }

    createTissueNeutrophil() {
        const x = this.world.centerX * 1.4;
        const y = this.world.centerY * 1.25;
        const neutrophil = this.createNeutrophil(x, y);

        const scale = (this.world.width * 0.4) / neutrophil.width;
        neutrophil.scale.setTo(scale);

        neutrophil.visible = false;

        this.tissue.neutrophil = neutrophil;
    }

    createBoneMarrow() {
        this.createBoneMarrowBackdrop();
        this.createBoneMarrowMacrophage();
        this.createBoneMarrowNeutrophil();
    }

    createBoneMarrowBackdrop() {
        const graphics = this.game.add.graphics(0, 0);

        graphics.beginFill(boneMarrowColor);
        graphics.drawRect(0, 0, this.world.width, this.world.height / 5);
        graphics.endFill();

        this.boneMarrow.backdrop = this.game.add.sprite(0, this.world.height - this.world.height / 5, graphics.generateTexture());
        this.boneMarrow.backdrop.visible = false;

        graphics.destroy();
    }

    createBoneMarrowMacrophage() {
        const { backdrop } = this.boneMarrow;
        const x = backdrop.centerX / 2;
        const macrophage = this.createMacrophage(x, backdrop.centerY);

        const scale = (backdrop.height * 0.8) / macrophage.height;
        macrophage.scale.setTo(scale);

        macrophage.visible = false;
        macrophage.inputEnabled = true;

        macrophage.events.onInputDown.add(() => this.addMacrophageToTissue());

        this.boneMarrow.macrophage = macrophage;
    }

    createBoneMarrowNeutrophil() {
        const { backdrop, macrophage } = this.boneMarrow;
        const x = backdrop.width - macrophage.x;
        const neutrophil = this.createNeutrophil(x, backdrop.centerY);

        const scale = (backdrop.height * 0.9) / neutrophil.height;
        neutrophil.scale.setTo(scale);

        neutrophil.visible = false;
        neutrophil.inputEnabled = true;

        neutrophil.events.onInputDown.add(() => this.addNeutrophilToTissue());

        this.boneMarrow.neutrophil = neutrophil;
    }

    startBacteriaTimer() {
        this.time.events.add(Phaser.Timer.SECOND * 2 * this.timerFactor, () => {
            this.tissue.bacteria.visible = true;

            this.startBacteriaModalTimer();
        });
    }

    startBacteriaModalTimer() {
        this.time.events.add(Phaser.Timer.SECOND * 2 * this.timerFactor, () => {
           this.showBacteriaModal();
        });
    }

    showBacteriaModal() {
        modalService.showBacteriaModal()
            .then(() => this.startMacrophageModalTimer());
    }

    startMacrophageModalTimer() {
        this.time.events.add(Phaser.Timer.SECOND * 2 * this.timerFactor, () => {
            this.showMacrophageModal();
        });
    }

    showMacrophageModal() {
        modalService.showMacrophageModal()
            .then(() => {
                this.boneMarrow.backdrop.visible = true;
                this.boneMarrow.macrophage.visible = true;
            });
    }

    update() {
        this.tissue.neutrophil.rotation += 0.02;

        const { bacteria } = this.tissue;
        bacteria.rotation += bacteria.data.rotation;

        if (bacteria.rotation < 0.25 || bacteria.rotation > 0.75) {
            bacteria.data.rotation *= -1;
        }

        if (this.health.percent < 0) {
            this.health.percent = 0;
        }

        this.health.text.text = Math.floor(this.health.percent) + '%';

        this.health.bar.clear();
        this.health.bar.beginFill(0xaf111c);
        this.health.bar.drawRect(0, 0, this.world.width * (this.health.percent / 100), 20);
        this.health.bar.endFill();
    }

    addMacrophageToTissue() {
        const { macrophage } = this.tissue;

        if (!macrophage.visible) {
            macrophage.visible = true;

            this.startNeutrophilModalTimer();
        }
    }

    startNeutrophilModalTimer() {
        this.time.events.add(Phaser.Timer.SECOND * 5 * this.timerFactor, () => {
            this.showNeutrophilModal();
        });
    }

    showNeutrophilModal() {
        modalService.showNeutrophilModal()
            .then(() => {
                this.boneMarrow.neutrophil.visible = true;
            });
    }

    addNeutrophilToTissue() {
        this.tissue.neutrophil.visible = true;
    }

}