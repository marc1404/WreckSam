import Phaser from 'phaser-ce';
import { getConfig } from './config';
import TutorialState from './TutorialState';
import LevelState from './LevelState';

export default class WreckSam {

    constructor() {
        const config = getConfig();
        this.game = new Phaser.Game(config);

        this.game.state.add('tutorial', new TutorialState());
    }

    start(state) {
        this.game.state.start(state);
    }

    destroy() {
        this.game.destroy();

        this.game = null;
    }

}