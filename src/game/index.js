import Phaser from 'phaser-ce';
import { getConfig } from './config';
import TutorialState from './TutorialState';

export default class WreckSam {

    constructor() {
        const config = getConfig();
        this.game = new Phaser.Game(config);

        this.game.state.add('tutorial', new TutorialState());
    }

    start(state) {
        this.game.state.start(state);
    }

    pause(){
        this.game.lockRender = true;
    }

    unpause(){
        this.game.lockRender = false;
    }
    
    destroy() {
        this.game.destroy();

        this.game = null;
    }

}