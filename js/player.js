// player.js - the astronaut
// The sprite is drawn from the little text maps below, so there are no image files to load.
// Each letter is a colour and each character is one pixel (12 wide, 16 tall).

const PLAYER_SPEED = 155;
const PIXEL = 2;   // how big each pixel is on screen

const COLOURS = {
  w: 0xf0eee5,   // white suit
    g: 0xb8bcc8,   // grey shading
      v: 0x3d9fc4,   // visor
        V: 0x9fe0f2,   // visor shine
          o: 0xe8883a,   // orange stripe
            k: 0x273c52    // gloves and boots
            };

            const TOP = [
              "....wwww....",
                "...wwwwww...",
                  "..wwvvvvww..",
                    "..wwvVvvww..",
                      "..wwvvvvww..",
                        "...wwwwww...",
                          "..gwwwwwwg..",
                            ".gwwwooowwg.",
                              ".gwwwwwwwwg.",
                                ".kwwwwwwwwk.",
                                  "..wwwwwwww..",
                                    "..wwwwwwww.."
                                    ];

                                    const FRAMES = {
                                      "astro-idle": TOP.concat(["...ww..ww...", "...ww..ww...", "...kk..kk...", "............"]),
                                        "astro-a":    TOP.concat(["...ww..ww...", "...ww..kk...", "...ww.......", "...kk......."]),
                                          "astro-b":    TOP.concat(["...ww..ww...", "...kk..ww...", ".......ww...", ".......kk..."])
                                          };

                                          function drawFrame(scene, key, rows) {
                                            const g = scene.make.graphics({ x: 0, y: 0, add: false });
                                              rows.forEach((row, y) => {
                                                  row.split("").forEach((c, x) => {
                                                        if (COLOURS[c]) {
                                                                g.fillStyle(COLOURS[c]);
                                                                        g.fillRect(x * PIXEL, y * PIXEL, PIXEL, PIXEL);
                                                                              }
                                                                                  });
                                                                                    });
                                                                                      g.generateTexture(key, 12 * PIXEL, 16 * PIXEL);
                                                                                        g.destroy();
                                                                                        }

                                                                                        function createPlayer(scene) {
                                                                                          for (const key in FRAMES) drawFrame(scene, key, FRAMES[key]);

                                                                                            scene.anims.create({
                                                                                                key: "walk",
                                                                                                    frames: [{ key: "astro-a" }, { key: "astro-idle" }, { key: "astro-b" }, { key: "astro-idle" }],
                                                                                                        frameRate: 8,
                                                                                                            repeat: -1
                                                                                                              });

                                                                                                                // soft shadow under the feet
                                                                                                                  scene.shadow = scene.add.ellipse(480, 336, 20, 7, 0x000000, 0.25);

                                                                                                                    const player = scene.physics.add.sprite(480, 320, "astro-idle");
                                                                                                                      player.setCollideWorldBounds(true);
                                                                                                                        // only the feet collide, so he can walk close to buildings
                                                                                                                          player.body.setSize(16, 12);
                                                                                                                            player.body.setOffset(4, 20);
                                                                                                                              return player;
                                                                                                                              }

                                                                                                                              function stopPlayer(scene) {
                                                                                                                                scene.player.setVelocity(0, 0);
                                                                                                                                  scene.player.anims.stop();
                                                                                                                                    scene.player.setTexture("astro-idle");
                                                                                                                                    }

                                                                                                                                    function movePlayer(scene) {
                                                                                                                                      const k = scene.keys;
                                                                                                                                        let vx = 0, vy = 0;

                                                                                                                                          if (k.left.isDown || k.left2.isDown || controls.left) vx = -1;
                                                                                                                                            if (k.right.isDown || k.right2.isDown || controls.right) vx = 1;
                                                                                                                                              if (k.up.isDown || k.up2.isDown || controls.up) vy = -1;
                                                                                                                                                if (k.down.isDown || k.down2.isDown || controls.down) vy = 1;

                                                                                                                                                  const v = new Phaser.Math.Vector2(vx, vy);
                                                                                                                                                    if (v.length() > 0) v.normalize().scale(PLAYER_SPEED);
                                                                                                                                                      scene.player.setVelocity(v.x, v.y);

                                                                                                                                                        // face the way we're walking, and animate only while moving
                                                                                                                                                          if (vx < 0) scene.player.setFlipX(true);
                                                                                                                                                            if (vx > 0) scene.player.setFlipX(false);
                                                                                                                                                              if (vx !== 0 || vy !== 0) {
                                                                                                                                                                  scene.player.anims.play("walk", true);
                                                                                                                                                                    } else {
                                                                                                                                                                        scene.player.anims.stop();
                                                                                                                                                                            scene.player.setTexture("astro-idle");
                                                                                                                                                                              }

                                                                                                                                                                                scene.shadow.setPosition(scene.player.x, scene.player.y + 16);
                                                                                                                                                                                }