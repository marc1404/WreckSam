import Phaser from 'phaser-ce';
import { getConfig } from './config';
import TutorialState from './TutorialState';
import { modalService } from '../modals';

export default class WreckSam {

    constructor(router) {
        const config = getConfig();
        this.game = new Phaser.Game(config);
        this.game.router = router;

        this.game.state.add('tutorial', new TutorialState());

        modalService.onShow(() => this.pause());
        modalService.onHide(() => this.unpause());
    }

    start(state) {
        this.game.state.start(state);
    }

    pause(){
        if (!this.game) {
            return;
        }

        this.game.paused = true;
    }

    unpause(){
        if (!this.game) {
            return;
        }

        this.game.paused = false;
    }
    
    destroy() {
        this.game.destroy();

        this.game = null;
    }

}