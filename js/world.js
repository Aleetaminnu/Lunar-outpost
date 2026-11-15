const BUILDINGS = [
      { name: "HABITAT", x: 170, y: 155, colour: 0x397fa9, cost: 2, job: "Life support: +15 air" },
        { name: "POWER ARRAY", x: 480, y: 145, colour: 0xc9a84c, cost: 0, job: "Check the power forecast" },
          { name: "GREENHOUSE", x: 790, y: 155, colour: 0x438d66, cost: 2, job: "Grow food: +14 food" },
            { name: "SCIENCE LAB", x: 260, y: 465, colour: 0x8064ad, cost: 3, job: "Experiment: +10 science" },
              { name: "SUPPLY DEPOT", x: 700, y: 465, colour: 0xb87555, cost: 2, job: "Pile regolith: +16 shield" }
              ];

              function buildWorld(scene) {
                scene.physics.world.setBounds(0, 0, 960, 640);
                  scene.cameras.main.setBackgroundColor("#777d91");

                    const g = scene.add.graphics();
                      for (let i = 0; i < 100; i++) {
                          g.fillStyle(0x969cab, 0.55);
                              g.fillCircle(Phaser.Math.Between(15, 945), Phaser.Math.Between(15, 625), Phaser.Math.Between(2, 7));
                                }
                                  g.lineStyle(35, 0x9ca4b2, 0.7);
                                    g.strokeLineShape(new Phaser.Geom.Line(480, 220, 480, 410));
                                      g.strokeLineShape(new Phaser.Geom.Line(170, 220, 790, 220));
                                        g.strokeLineShape(new Phaser.Geom.Line(260, 410, 700, 410));
                                          g.lineStyle(4, 0xe1d5a4);
                                            g.strokeCircle(480, 320, 70);

                                              scene.solids = [];
                                                BUILDINGS.forEach(b => {
                                                    const body = scene.add.rectangle(b.x, b.y, 112, 76, b.colour);
                                                        scene.physics.add.existing(body, true);
                                                            scene.solids.push(body);
                                                                scene.add.rectangle(b.x, b.y - 26, 88, 10, 0xe8e9ed);
                                                                    scene.add.rectangle(b.x, b.y + 18, 20, 32, 0x273c52);
                                                                        scene.add.text(b.x, b.y + 55, b.name, {
                                                                              fontSize: "13px", color: "#ffffff", backgroundColor: "#26364b", padding: { x: 5, y: 4 }
                                                                                  }).setOrigin(0.5);
                                                                                    });
                                                                                    }

                                                                                    function nearestBuilding(player) {
                                                                                      let best = null, bestDist = 110;
                                                                                        BUILDINGS.forEach(b => {
                                                                                            const d = Phaser.Math.Distance.Between(player.x, player.y, b.x, b.y);
                                                                                                if (d < bestDist) { bestDist = d; best = b; }
                                                                                                  });
                                                                                                    return best;
                                                                                                    }

                                                                                                    function floatText(scene, text, x, y, colour) {
                                                                                                      const t = scene.add.text(x, y, text, {
                                                                                                          fontSize: "18px", fontStyle: "bold", color: colour, stroke: "#101827", strokeThickness: 4
                                                                                                            }).setOrigin(0.5).setDepth(20);
                                                                                                              scene.tweens.add({ targets: t, y: y - 45, alpha: 0, duration: 1400, onComplete: () => t.destroy() });
                                                                                                              }

                                                                                                              function useBuilding(scene, b) {
                                                                                                                if (b.name === "POWER ARRAY") {
                                                                                                                    playSound("use");
                                                                                                                        message("Power left today: " + state.power + ". Your shield blocks " + state.shield +
                                                                                                                              "% of radiation. Panels only work in sunlight, so power is limited each day.");
                                                                                                                                  return;
                                                                                                                                    }

                                                                                                                                      if (!spendPower(b.cost)) {
                                                                                                                                          playSound("fail");
                                                                                                                                              message("Not enough power for the " + b.name.toLowerCase() + " (needs " + b.cost + ").");
                                                                                                                                                  return;
                                                                                                                                                    }

                                                                                                                                                      let gain = "";
                                                                                                                                                        if (b.name === "HABITAT") { state.air = clamp(state.air + 15); gain = "+15 air"; }
                                                                                                                                                          if (b.name === "GREENHOUSE") { state.food = clamp(state.food + 14); gain = "+14 food"; }
                                                                                                                                                            if (b.name === "SCIENCE LAB") { state.science += 10; gain = "+10 science"; }
                                                                                                                                                              if (b.name === "SUPPLY DEPOT") { state.shield = clamp(state.shield + 16); gain = "+16 shield"; }

                                                                                                                                                                playSound("use");
                                                                                                                                                                  floatText(scene, gain, b.x, b.y - 30, "#7cfc9a");
                                                                                                                                                                    floatText(scene, "-" + b.cost + " power", b.x, b.y - 8, "#ff8a80");
                                                                                                                                                                      message(b.job + " (-" + b.cost + " power). " + FACTS[b.name]);
                                                                                                                                                                        updateDashboard();
                                                                                                                                                                        }
