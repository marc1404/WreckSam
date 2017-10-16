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
        macrophage: {
            amount: 0,
            group: null,
            sprite: null,
            text: null
        },
        neutrophil: {
            amount: 0,
            group: null,
            sprite: null,
            text: null
        }
    };

    boneMarrow = {
        backdrop: null,
        macrophage: {
            amount: 1000,
            group: null,
            sprite: null,
            text: null
        },
        neutrophil: {
            amount: 1000,
            group: null,
            sprite: null,
            text: null
        }
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
        modalService.showInitialExplanationModal();
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

        const text = this.game.add.text(macrophage.centerX, macrophage.bottom + 25, 'x' + this.tissue.macrophage.amount, { font: 'normal 12pt Arial' });

        const group = this.game.add.group();
        group.visible = false;

        group.add(macrophage);
        group.add(text);

        this.tissue.macrophage.group = group;
        this.tissue.macrophage.sprite = macrophage;
        this.tissue.macrophage.text = text;
    }

    createTissueMacrophageAnimation() {
        this.time.events.loop(Phaser.Timer.QUARTER * 2, () => {
            const macrophage = this.tissue.macrophage.sprite;
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

        const text = this.game.add.text(neutrophil.centerX, neutrophil.bottom, 'x' + this.tissue.neutrophil.amount, { font: 'normal 12pt Arial' });

        const group = this.game.add.group();
        group.visible = false;

        group.add(neutrophil);
        group.add(text);

        this.tissue.neutrophil.group = group;
        this.tissue.neutrophil.sprite = neutrophil;
        this.tissue.neutrophil.text = text;
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

        macrophage.inputEnabled = true;

        macrophage.events.onInputDown.add(() => this.addMacrophageToTissue());

        const text = this.game.add.text(macrophage.centerX, macrophage.bottom - 5, 'x' + this.boneMarrow.macrophage.amount, { font: 'normal 12pt Arial' });

        const group = this.game.add.group();
        group.visible = false;

        group.add(macrophage);
        group.add(text);

        this.boneMarrow.macrophage.group = group;
        this.boneMarrow.macrophage.sprite = macrophage;
        this.boneMarrow.macrophage.text = text;
    }

    createBoneMarrowNeutrophil() {
        const { backdrop, macrophage } = this.boneMarrow;
        const x = backdrop.width - macrophage.sprite.x;
        const neutrophil = this.createNeutrophil(x, backdrop.centerY);

        const scale = (backdrop.height * 0.9) / neutrophil.height;
        neutrophil.scale.setTo(scale);

        neutrophil.inputEnabled = true;

        neutrophil.events.onInputDown.add(() => this.addNeutrophilToTissue());

        const text = this.game.add.text(neutrophil.centerX, neutrophil.bottom - 10, 'x' + this.boneMarrow.neutrophil.amount, { font: 'normal 12pt Arial' });

        const group = this.game.add.group();
        group.visible = false;

        group.add(neutrophil);
        group.add(text);

        this.boneMarrow.neutrophil.group = group;
        this.boneMarrow.neutrophil.sprite = neutrophil;
        this.boneMarrow.neutrophil.text = text;
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
            bacteria.amount += this.calculateBacteriaGrowth();

            if (bacteria.amount < 0) {
                bacteria.amount = 0;
            }
        });
    }

    startHealthTimer() {
        this.time.events.loop(Phaser.Timer.QUARTER, () => {
            this.health.percent -= this.calculateDamage();
        });
    }

    startBacteriaModalTimer() {
        this.time.events.add(Phaser.Timer.SECOND * 2 * this.modalFactor, () => {
           this.showBacteriaModal();
        });
    }

    showBacteriaModal() {
        modalService.showBacteriaModal()
            .then(() => this.startBacteriaOverloadModalTimer());
    }

    startBacteriaOverloadModalTimer() {
        this.time.events.add(Phaser.Timer.SECOND * 3 * this.modalFactor, () => {
            this.showBacteriaOverloadModal();
        });
    }

    showBacteriaOverloadModal() {
        modalService.showBacteriaOverloadModal()
            .then(() => this.showMacrophageModal());
    }

    // startMacrophageModalTimer() {
    //     this.time.events.add(Phaser.Timer.SECOND * 3 * this.modalFactor, () => {
    //         this.showBacteriaOverloadModal();
    //         this.showMacrophageModal();
    //     });
    // }

    showMacrophageModal() {
        modalService.showMacrophageModal()
            .then(() => {
                this.boneMarrow.backdrop.visible = true;
                this.boneMarrow.macrophage.group.visible = true;
            });
    }

    update() {
        this.tissue.neutrophil.sprite.rotation += 0.02;

        this.updateBacteria();
        this.updateHealth();
        this.updateMacrophage();
        this.updateNeutrophil();
    }

    updateBacteria() {
        const { bacteria } = this.tissue;
        const { sprite } = bacteria;
        sprite.rotation += sprite.data.rotation;

        if (sprite.rotation < 0.25 || sprite.rotation > 0.75) {
            sprite.data.rotation *= -1;
        }

        bacteria.text.text = 'x' + bacteria.amount;

        if (bacteria.group.visible && bacteria.amount <= 0) {
            bacteria.group.visible = false;

            this.time.events.add(Phaser.Timer.SECOND, () => this.win());
        }
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

            this.time.events.add(Phaser.Timer.SECOND, () => this.gameOver());
        }
    }

    updateMacrophage() {
        this.tissue.macrophage.text.text = 'x' + this.tissue.macrophage.amount;
        this.boneMarrow.macrophage.text.text = 'x' + this.boneMarrow.macrophage.amount;
    }

    updateNeutrophil() {
        this.tissue.neutrophil.text.text = 'x' + this.tissue.neutrophil.amount;
        this.boneMarrow.neutrophil.text.text = 'x' + this.boneMarrow.neutrophil.amount;
    }

    addMacrophageToTissue() {
        const inTissue = this.tissue.macrophage;
        const inBoneMarrow = this.boneMarrow.macrophage;

        if (inBoneMarrow.amount <= 0) {
            return;
        }

        if (!inTissue.group.visible) {
            inTissue.group.visible = true;
        }

        inTissue.amount += 100;
        inBoneMarrow.amount -= 100;
        inBoneMarrow.group.visible = inBoneMarrow.amount > 0;

        if (inBoneMarrow.amount === 0) {
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
                this.boneMarrow.neutrophil.group.visible = true;
            });
    }

    addNeutrophilToTissue() {
        const inTissue = this.tissue.neutrophil;
        const inBoneMarrow = this.boneMarrow.neutrophil;

        if (inBoneMarrow.amount <= 0) {
            return;
        }

        inTissue.group.visible = true;
        inTissue.amount += 100;
        inBoneMarrow.amount -= 100;
        inBoneMarrow.group.visible = inBoneMarrow.amount > 0;
    }

    calculateBacteriaGrowth() {
        const bacterias = this.tissue.bacteria.amount;
        const macrophages = this.tissue.macrophage.amount;
        const neutrophils = this.tissue.neutrophil.amount;
        let growth = 1;

        if (bacterias > 0) {
            growth += Math.log(bacterias);
        }

        if (macrophages > 0) {
            growth *= 1 - 0.9 * (macrophages / 1000);

            if (growth < 1) {
                growth = 1;
            }
        }

        if (neutrophils > 0) {
            const factor = 2 + 2 * (neutrophils / 1000);
            growth *= -factor;
        }

        return Math.floor(growth);
    }

    calculateDamage() {
        const bacterias = this.tissue.bacteria.amount;
        const neutrophils = this.tissue.neutrophil.amount;
        let damage = 0.1;

        if (bacterias > 0) {
            damage += Math.log10(bacterias) * 0.1;
        }

        if (neutrophils > 0) {
            damage += neutrophils / 300;
        }

        return damage;
    }

    gameOver() {
        this.gameOver = true;
        this.game.paused = true;

        swal({
            title: 'Game Over',
            text: 'You deployed too many Neutrophils, causing the body to take too much damage. Remember: Their toxins cause damage to bacteria, but also to the human body!',
            type: 'error',
            confirmButtonText: 'Sorry 😰',
            confirmButtonColor: bloodColorCSS
        }).then(() => this.toMainMenu()).catch(() => this.toMainMenu());
    }

    win() {
        this.game.paused = true;

        swal({
            title: 'Infection healed!',
            text: 'The immune system eradicated all bacteria cells.',
            type: 'success',
            confirmButtonText: 'Well done 🎉'
        }).then(() => this.toMainMenu()).catch(() => this.toMainMenu());
    }

    toMainMenu() {
        this.game.router.push({ name: 'MainMenuScreen' });
    }

}