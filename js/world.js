// world.js - terrain, buildings, locked areas and what each building does
// cost = power needed to use it, stage = the stage that opens it (0 = from the start)

const BUILDINGS = [
  { name: "HABITAT", x: 170, y: 155, colour: 0x397fa9, cost: 2, stage: 0, job: "Life support: +15 air" },
    { name: "POWER ARRAY", x: 480, y: 145, colour: 0xc9a84c, cost: 1, stage: 0, job: "Call Earth for advice" },
      { name: "SUPPLY DEPOT", x: 700, y: 465, colour: 0xb87555, cost: 2, stage: 0, job: "Pile regolith: +16 shield" },
        { name: "GREENHOUSE", x: 790, y: 155, colour: 0x438d66, cost: 2, stage: 1, job: "Grow food: +14 food" },
          { name: "SCIENCE LAB", x: 260, y: 465, colour: 0x8064ad, cost: 3, stage: 2, job: "Experiment: +10 science" }
          ];

          // dark rectangles that cover the areas you haven't unlocked yet
          const FOG_AREAS = {
            "GREENHOUSE": { x: 790, y: 160, w: 270, h: 200 },
              "SCIENCE LAB": { x: 260, y: 490, w: 270, h: 200 }
              };

              let radioBusy = false;

              function buildWorld(scene) {
                scene.physics.world.setBounds(0, 0, 960, 640);
                  scene.cameras.main.setBackgroundColor("#777d91");

                    const g = scene.add.graphics();
                      for (let i = 0; i < 100; i++) {
                          g.fillStyle(0x969cab, 0.55);
                              g.fillCircle(Phaser.Math.Between(15, 945), Phaser.Math.Between(15, 625), Phaser.Math.Between(2, 7));
                                }
                                  // paths between the buildings
                                    g.lineStyle(35, 0x9ca4b2, 0.7);
                                      g.strokeLineShape(new Phaser.Geom.Line(480, 220, 480, 410));
                                        g.strokeLineShape(new Phaser.Geom.Line(170, 220, 790, 220));
                                          g.strokeLineShape(new Phaser.Geom.Line(260, 410, 700, 410));
                                            // landing pad in the middle
                                              g.lineStyle(4, 0xe1d5a4);
                                                g.strokeCircle(480, 320, 70);

                                                  scene.solids = [];
                                                    BUILDINGS.forEach(b => {
                                                        const body = scene.add.rectangle(b.x, b.y, 112, 76, b.colour);
                                                            scene.physics.add.existing(body, true);
                                                                scene.solids.push(body);
                                                                    scene.add.rectangle(b.x, b.y - 26, 88, 10, 0xe8e9ed);   // roof
                                                                        scene.add.rectangle(b.x, b.y + 18, 20, 32, 0x273c52);   // door
                                                                            scene.add.text(b.x, b.y + 55, b.name, {
                                                                                  fontSize: "13px", color: "#ffffff", backgroundColor: "#26364b", padding: { x: 5, y: 4 }
                                                                                      }).setOrigin(0.5);
                                                                                        });

                                                                                          // locked areas (drawn on top of the buildings, and they block the astronaut)
                                                                                            scene.fogs = {};
                                                                                              for (const name in FOG_AREAS) {
                                                                                                  const f = FOG_AREAS[name];
                                                                                                      const b = BUILDINGS.find(x => x.name === name);
                                                                                                          const rect = scene.add.rectangle(f.x, f.y, f.w, f.h, 0x0b1020, 0.93).setDepth(10);
                                                                                                              scene.physics.add.existing(rect, true);
                                                                                                                  const label = scene.add.text(f.x, f.y, "LOCKED\nFinish Stage " + b.stage, {
                                                                                                                        fontSize: "15px", color: "#9bbbd3", align: "center"
                                                                                                                            }).setOrigin(0.5).setDepth(11);
                                                                                                                                scene.fogs[name] = { rect: rect, label: label };
                                                                                                                                    scene.solids.push(rect);
                                                                                                                                      }
                                                                                                                                      }

                                                                                                                                      // open the areas that the current stage allows
                                                                                                                                      function applyUnlocks(scene, animate) {
                                                                                                                                        BUILDINGS.forEach(b => {
                                                                                                                                            const fog = scene.fogs[b.name];
                                                                                                                                                if (!fog || b.stage > state.stage) return;
                                                                                                                                                    delete scene.fogs[b.name];
                                                                                                                                                        scene.physics.world.disableBody(fog.rect.body);   // the astronaut can walk in now
                                                                                                                                                            if (animate) {
                                                                                                                                                                  scene.tweens.add({
                                                                                                                                                                          targets: [fog.rect, fog.label], alpha: 0, duration: 1200,
                                                                                                                                                                                  onComplete: () => { fog.rect.destroy(); fog.label.destroy(); }
                                                                                                                                                                                        });
                                                                                                                                                                                            } else {
                                                                                                                                                                                                  fog.rect.destroy();
                                                                                                                                                                                                        fog.label.destroy();
                                                                                                                                                                                                            }
                                                                                                                                                                                                              });
                                                                                                                                                                                                              }

                                                                                                                                                                                                              function nearestBuilding(player) {
                                                                                                                                                                                                                let best = null, bestDist = 110;
                                                                                                                                                                                                                  BUILDINGS.forEach(b => {
                                                                                                                                                                                                                      if (b.stage > state.stage) return;   // still locked
                                                                                                                                                                                                                          const d = Phaser.Math.Distance.Between(player.x, player.y, b.x, b.y);
                                                                                                                                                                                                                              if (d < bestDist) { bestDist = d; best = b; }
                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                  return best;
                                                                                                                                                                                                                                  }

                                                                                                                                                                                                                                  function useBuilding(b) {
                                                                                                                                                                                                                                    if (b.name === "POWER ARRAY") {
                                                                                                                                                                                                                                        if (radioBusy) {
                                                                                                                                                                                                                                              message("Still waiting for Earth's reply...");
                                                                                                                                                                                                                                                    return;
                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                            if (!spendPower(b.cost)) {
                                                                                                                                                                                                                                                                  message("Not enough power to use the radio (needs " + b.cost + ").");
                                                                                                                                                                                                                                                                        return;
                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                radioBusy = true;
                                                                                                                                                                                                                                                                                    updateDashboard();
                                                                                                                                                                                                                                                                                        message("Message sent to Earth (-" + b.cost + " power). The radio takes about 1.3 seconds each way, so wait for the reply...");
                                                                                                                                                                                                                                                                                            setTimeout(() => {
                                                                                                                                                                                                                                                                                                  radioBusy = false;
                                                                                                                                                                                                                                                                                                        message(earthAdvice());
                                                                                                                                                                                                                                                                                                            }, 2600);
                                                                                                                                                                                                                                                                                                                return;
                                                                                                                                                                                                                                                                                                                  }

                                                                                                                                                                                                                                                                                                                    if (!spendPower(b.cost)) {
                                                                                                                                                                                                                                                                                                                        message("Not enough power for the " + b.name.toLowerCase() + " (needs " + b.cost + ").");
                                                                                                                                                                                                                                                                                                                            return;
                                                                                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                                                                                                if (b.name === "HABITAT") state.air = clamp(state.air + 15);
                                                                                                                                                                                                                                                                                                                                  if (b.name === "GREENHOUSE") state.food = clamp(state.food + 14);
                                                                                                                                                                                                                                                                                                                                    if (b.name === "SCIENCE LAB") state.science += 10;
                                                                                                                                                                                                                                                                                                                                      if (b.name === "SUPPLY DEPOT") state.shield = clamp(state.shield + 16);

                                                                                                                                                                                                                                                                                                                                        message(b.job + " (-" + b.cost + " power). " + FACTS[b.name]);
                                                                                                                                                                                                                                                                                                                                          updateDashboard();
                                                                                                                                                                                                                                                                                                                                          }