import Phaser from 'phaser-ce';
import config from './config';
import TutorialState from './TutorialState';
import LevelState from './LevelState';

export default class WreckSam {

    constructor() {
        this.game = new Phaser.Game(config);

        this.game.state.add('tutorial', new TutorialState());
        this.game.state.add('level', new LevelState());
    }

    start(state) {
        this.game.state.start(state);
    }

    destroy() {
        this.game.destroy();

        this.game = null;
    }

}