import Phaser from 'phaser-ce';
import { getConfig } from './config';
import TutorialState from './TutorialState';
import { modalService } from '../modals';

export default class WreckSam {

    constructor() {
        const config = getConfig();
        this.game = new Phaser.Game(config);

        this.game.state.add('tutorial', new TutorialState());

        modalService.onShow(() => this.pause());
        modalService.onHide(() => this.unpause());
    }

    start(state) {
        this.game.state.start(state);
    }

    pause(){
        this.game.paused = true;
    }

    unpause(){
        this.game.paused = false;
    }
    
    destroy() {
        this.game.destroy();

        this.game = null;
    }

}