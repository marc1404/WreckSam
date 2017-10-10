import Phaser from 'phaser-ce';

export function getConfig() {
    const gameElement = document.getElementById('game');
    const { offsetWidth, offsetHeight } = gameElement;

    return {
        width: offsetWidth,
        height: offsetHeight,
        renderer: Phaser.AUTO,
        antialias: true,
        parent: gameElement
    };
}