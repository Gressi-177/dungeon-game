import { Scene } from "phaser";

export class Preloader extends Scene {
    constructor() {
        super("Preloader");
    }

    preload() {
        this.load.image("tiles", "tiles/dungeon_tiles.png");
        this.load.tilemapTiledJSON("dungeon", "dungeons/dungeon.json");

        this.load.atlas(
            "fauna",
            "characters/fauna.png",
            "characters/fauna.json"
        );
    }

    create() {
        this.scene.start("MainMenu");
    }
}
