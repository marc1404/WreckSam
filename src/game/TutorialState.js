import Phaser from 'phaser-ce';
import swal from 'sweetalert2';
import { tissueColor, boneMarrowColor, bloodColor, bloodColorCSS } from './constants';
import { modalService } from '../modals';

export default class TutorialState extends Phaser.State {

    modalFactor = 1;
    isDead = false;

    health = {
        bar: null,
        text: null,
        percent: 100
    };

    tissue = {
        bacteria: {
            amount: 0,
            group: null,
            sprite: null,
            text: null
        },
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

        const text = this.game.add.text(bacteria.centerX, bacteria.centerY / 2, 'x' + this.tissue.bacteria.amount, { font: 'normal 12pt Arial' });

        const group = this.game.add.group();
        group.visible = false;

        group.add(bacteria);
        group.add(text);

        this.tissue.bacteria.group = group;
        this.tissue.bacteria.sprite = bacteria;
        this.tissue.bacteria.text = text;
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
        this.time.events.add(Phaser.Timer.SECOND * 2 * this.modalFactor, () => {
            const { bacteria } = this.tissue;
            bacteria.group.visible = true;
            bacteria.amount = 1;

            this.startBacteriaGrowthTimer();
            this.startHealthTimer();
            this.startBacteriaModalTimer();
        });
    }

    startBacteriaGrowthTimer() {
        this.time.events.loop(Phaser.Timer.QUARTER, () => {
            const { bacteria } = this.tissue;
            const growth = Math.floor(1 + Math.log(bacteria.amount));
            bacteria.amount += growth;
        });
    }

    startHealthTimer() {
        this.time.events.loop(Phaser.Timer.QUARTER, () => {
            const { bacteria } = this.tissue;
            const damage = 0.1 + Math.log10(bacteria.amount) * 0.1;
            this.health.percent -= damage;
        });
    }

    startBacteriaModalTimer() {
        this.time.events.add(Phaser.Timer.SECOND * 2 * this.modalFactor, () => {
           this.showBacteriaModal();
        });
    }

    showBacteriaModal() {
        modalService.showBacteriaModal()
            .then(() => this.startMacrophageModalTimer());
    }

    startMacrophageModalTimer() {
        this.time.events.add(Phaser.Timer.SECOND * 3 * this.modalFactor, () => {
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

        this.updateBacteria();
        this.updateHealth();
    }

    updateBacteria() {
        const { bacteria } = this.tissue;
        const { sprite } = bacteria;
        sprite.rotation += sprite.data.rotation;

        if (sprite.rotation < 0.25 || sprite.rotation > 0.75) {
            sprite.data.rotation *= -1;
        }

        bacteria.text.text = 'x' + bacteria.amount;
    }

    updateHealth() {
        if (this.health.percent < 0) {
            this.health.percent = 0;
        }

        const { percent } = this.health;

        let rounded = Math.floor(percent);

        if (percent > 0 && rounded === 0) {
            rounded = 1;
        }

        this.health.text.text = rounded + '%';

        this.health.bar.clear();
        this.health.bar.beginFill(bloodColor);
        this.health.bar.drawRect(0, 0, this.world.width * (this.health.percent / 100), 20);
        this.health.bar.endFill();

        if (!this.isDead && rounded === 0) {
            this.isDead = true;

            this.time.events.add(Phaser.Timer.QUARTER, () => this.gameOver());
        }
    }

    addMacrophageToTissue() {
        const { macrophage } = this.tissue;

        if (!macrophage.visible) {
            macrophage.visible = true;

            this.startNeutrophilModalTimer();
        }
    }

    startNeutrophilModalTimer() {
        this.time.events.add(Phaser.Timer.SECOND * 5 * this.modalFactor, () => {
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

    gameOver() {
        this.gameOver = true;
        this.game.paused = true;
        const toMainMenu = () => this.game.router.push({ name: 'MainMenuScreen' });

        swal({
            title: 'Game Over',
            text: 'The body suffered fatal damage from bacteria cells.',
            type: 'error',
            confirmButtonText: 'Sorry 😰',
            confirmButtonColor: bloodColorCSS
        }).then(toMainMenu).catch(toMainMenu);
    }

}