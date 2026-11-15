const EVENT_POOL = [
      {
          title: "Big solar flare",
              text: "A flare is on its way. Fast particles can reach the base.",
                  source: "NASA DONKI / NOAA: X9.0 flare on 3 Oct 2024, the strongest of Solar Cycle 25 at that time.",
                      a: { label: "Everyone shelters inside", note: "Safe, but lab work stops.", fx: { science: -10, shield: -6 } },
                          b: { label: "Keep working", note: "More science, but the crew gets dosed.", fx: { storm: 40, science: 10 } }
                            },
                              {
                                  title: "Radio blackout",
                                      text: "A geomagnetic storm is scrambling the radio.",
                                          source: "NASA DONKI archive: G5 storm, 10-11 May 2024.",
                                              a: { label: "Use the backup radio", note: "Costs 2 power today.", fx: { power: -2 } },
                                                  b: { label: "Wait it out", note: "Saves power, but the stale air builds up.", fx: { science: -8, air: -5 } }
                                                    },
                                                      {
                                                          title: "Radiation spike",
                                                              text: "The radiation monitor is reading higher than normal.",
                                                                  source: "NASA JPL: a Sept 2017 solar storm gave Mars surface radiation more than double anything Curiosity's RAD had measured before.",
                                                                      a: { label: "Boost the shield", note: "Costs 1 power today.", fx: { shield: 15, power: -1 } },
                                                                          b: { label: "Risk it", note: "1 extra power, but radiation gets through.", fx: { storm: 30, power: 1 } }
                                                                            },
                                                                              {
                                                                                  title: "Lunar night is coming",
                                                                                      text: "The Sun is setting. Solar panels make less power in the dark.",
                                                                                          source: "Real fact: much of the Moon has about 14 Earth days of night at a time.",
                                                                                              a: { label: "Run on batteries", note: "Lose 3 power today.", fx: { power: -3, shield: 5 } },
                                                                                                  b: { label: "Dim the lights", note: "Lose 1 power, air gets stale.", fx: { power: -1, air: -6, science: -8 } }
                                                                                                    },
                                                                                                      {
                                                                                                          title: "Computer glitch",
                                                                                                              text: "The base computer froze.",
                                                                                                                  source: "",
                                                                                                                      a: { label: "Ask Earth for help", note: "The radio delay is about 1.3 seconds, but you lose some time.", fx: { science: -5 } },
                                                                                                                          b: { label: "Fix it yourself", note: "Faster, but you might break something.", fx: { air: -8, food: -5 } }
                                                                                                                            },
                                                                                                                              {
                                                                                                                                  title: "Plants are blooming",
                                                                                                                                      text: "The greenhouse crop is ready early.",
                                                                                                                                          source: "",
                                                                                                                                              a: { label: "Harvest now", note: "Dinner sorted.", fx: { food: 18 } },
                                                                                                                                                  b: { label: "Study the plants", note: "Good science, not much food.", fx: { science: 20, food: 5 } }
                                                                                                                                                    },
                                                                                                                                                      {
                                                                                                                                                          title: "Airlock leak",
                                                                                                                                                              text: "A small crack is letting air out.",
                                                                                                                                                                  source: "",
                                                                                                                                                                      a: { label: "Patch it", note: "Costs 1 power and a little air.", fx: { power: -1, air: -3 } },
                                                                                                                                                                          b: { label: "Ignore it", note: "Saves power, but air escapes.", fx: { air: -16 } }
                                                                                                                                                                            }
                                                                                                                                                                            ];

                                                                                                                                                                            let eventPlan = {};

                                                                                                                                                                            function planEvents() {
                                                                                                                                                                              const pool = EVENT_POOL.slice();
                                                                                                                                                                                pool.sort(() => Math.random() - 0.5);
                                                                                                                                                                                  eventPlan = {};
                                                                                                                                                                                    for (let d = 2; d <= 6; d++) {
                                                                                                                                                                                        eventPlan[d] = pool[d - 2];
                                                                                                                                                                                          }
                                                                                                                                                                                          }

                                                                                                                                                                                          function todaysEvent() {
                                                                                                                                                                                            return eventPlan[state.day] || null;
                                                                                                                                                                                            }

                                                                                                                                                                                            const FACTS = {
                                                                                                                                                                                              HABITAT: "The ISS recycles about 98% of its water, because shipping supplies from Earth is expensive.",
                                                                                                                                                                                                GREENHOUSE: "Astronauts on the ISS have already grown lettuce and chile peppers.",
                                                                                                                                                                                                  "SUPPLY DEPOT": "Piling moon soil (regolith) over a habitat is one idea for blocking radiation.",
                                                                                                                                                                                                    "SCIENCE LAB": "Power is limited, so science has to wait its turn after life support."
                                                                                                                                                                                                    };

                                                                                                                                                                                                    let dayStart = { science: 0 };

                                                                                                                                                                                                    function dayComment(report) {
                                                                                                                                                                                                      const gained = state.science - dayStart.science;
                                                                                                                                                                                                        const lines = [];

                                                                                                                                                                                                          if (state.health >= 90 && state.air >= 40 && state.food >= 40) {
                                                                                                                                                                                                              lines.push("Great work! The crew is healthy and safe.");
                                                                                                                                                                                                                } else if (state.health >= 60) {
                                                                                                                                                                                                                    lines.push("The crew is okay, but watch the low meters.");
                                                                                                                                                                                                                      } else {
                                                                                                                                                                                                                          lines.push("The crew is struggling. Look after them first tomorrow.");
                                                                                                                                                                                                                            }

                                                                                                                                                                                                                              lines.push("Science today: +" + gained + " (total " + state.science + " / " + SCIENCE_GOAL + ").");
                                                                                                                                                                                                                                if (gained === 0) lines.push("Tip: once the crew is safe, use spare power in the Science Lab.");

                                                                                                                                                                                                                                  const low = [["air", "Habitat"], ["food", "Greenhouse"], ["shield", "Supply Depot"]]
                                                                                                                                                                                                                                      .filter(m => state[m[0]] < 35)
                                                                                                                                                                                                                                          .sort((a, b) => state[a[0]] - state[b[0]])[0];
                                                                                                                                                                                                                                            if (low) lines.push("Your " + low[0] + " is low. Visit the " + low[1] + " early tomorrow.");

                                                                                                                                                                                                                                              lines.push(report);
                                                                                                                                                                                                                                                return lines.join("\n");
                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                const HELP_TEXT =
                                                                                                                                                                                                                                                  "Keep your crew alive for " + DAYS + " days and collect " + SCIENCE_GOAL + " science points.\n\n" +
                                                                                                                                                                                                                                                    "1. Walk with the arrow keys, WASD or the buttons on the screen.\n" +
                                                                                                                                                                                                                                                      "2. Stand next to a building and press E, Space or INTERACT.\n" +
                                                                                                                                                                                                                                                        "3. You get " + DAILY_POWER + " power each day and every building uses some.\n" +
                                                                                                                                                                                                                                                          "4. Press END DAY when you're done. Air, food and shield go down overnight.\n\n" +
                                                                                                                                                                                                                                                            "Habitat: air. Greenhouse: food. Supply Depot: shield. Science Lab: points. Power Array: info.";
]