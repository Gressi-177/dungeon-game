import { Scene } from "phaser";
import { EventBus } from "../EventBus";

export class MainMenu extends Scene {
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private fauna?: Phaser.Physics.Arcade.Sprite;

    constructor() {
        super("MainMenu");
    }

    preload() {
        this.cursors = this.input.keyboard?.createCursorKeys();
    }

    create() {
        const map = this.make.tilemap({ key: "dungeon" });
        const tileset = map.addTilesetImage("dungeon", "tiles", 16, 16);
        map.createLayer("Ground", tileset!);
        const wallsLayer = map.createLayer("Walls", tileset!);

        wallsLayer?.setCollisionByProperty({ collides: true });

        // debugDraw(wallsLayer!, this);

        this.fauna = this.physics.add.sprite(
            128,
            128,
            "fauna",
            "walk-down-3.png"
        );
        if (this.fauna.body) {
            this.fauna.body.setSize(
                this.fauna.width * 0.5,
                this.fauna.height * 0.8
            );
        }
        this.anims.create({
            key: "fauna-idle-down",
            frames: [{ key: "fauna", frame: "walk-down-3.png" }],
        });

        this.anims.create({
            key: "fauna-idle-up",
            frames: [{ key: "fauna", frame: "walk-up-3.png" }],
        });

        this.anims.create({
            key: "fauna-idle-side",
            frames: [{ key: "fauna", frame: "walk-side-3.png" }],
        });

        this.anims.create({
            key: "fauna-run-down",
            frames: this.anims.generateFrameNames("fauna", {
                start: 1,
                end: 8,
                prefix: "run-down-",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 15,
        });

        this.anims.create({
            key: "fauna-run-up",
            frames: this.anims.generateFrameNames("fauna", {
                start: 1,
                end: 8,
                prefix: "run-up-",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 15,
        });

        this.anims.create({
            key: "fauna-run-side",
            frames: this.anims.generateFrameNames("fauna", {
                start: 1,
                end: 8,
                prefix: "run-side-",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 15,
        });

        this.anims.create({
            key: "fauna-faint",
            frames: this.anims.generateFrameNames("fauna", {
                start: 1,
                end: 4,
                prefix: "faint-",
                suffix: ".png",
            }),
            frameRate: 15,
        });

        this.fauna.anims.play("fauna-idle-down");

        this.physics.add.collider(this.fauna, wallsLayer!);

        this.cameras.main.startFollow(this.fauna, true);

        EventBus.emit("current-scene-ready", this);
    }

    update(time: number, detal: number) {
        if (!this.cursors || !this.fauna) {
            return;
        }

        const speed = 100;

        if (this.cursors.left?.isDown) {
            this.fauna.play("fauna-run-side", true);
            this.fauna.setVelocity(-speed, 0);
            this.fauna.scaleX = -1;
            if (this.fauna.body) {
                this.fauna.body.offset.x = 24;
            }
        } else if (this.cursors.right?.isDown) {
            this.fauna.play("fauna-run-side", true);
            this.fauna.setVelocity(speed, 0);
            this.fauna.scaleX = 1;
            if (this.fauna.body) {
                this.fauna.body.offset.x = 8;
            }
        } else if (this.cursors.up?.isDown) {
            this.fauna.play("fauna-run-up", true);
            this.fauna.setVelocity(0, -speed);
        } else if (this.cursors.down?.isDown) {
            this.fauna.play("fauna-run-down", true);
            this.fauna.setVelocity(0, speed);
        } else {
            const parts = this.fauna.anims.currentAnim?.key.split("-")!!;
            parts[1] = "idle";
            const animationKey = parts?.join("-");
            if (animationKey) {
                this.fauna.play(animationKey);
            }
            this.fauna.setVelocity(0, 0);
        }
    }
}
