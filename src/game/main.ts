import { AUTO, Game } from "phaser";
import { MainMenu } from "./scenes/MainMenu";
import { Preloader } from "./scenes/Preloader";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 400,
    height: 250,
    scale: {
        zoom: 2,
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: true,
        },
    },
    parent: "game-container",
    scene: [Preloader, MainMenu],
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
};

export default StartGame;
