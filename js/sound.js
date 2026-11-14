// sound.js - tiny sound effects made in the browser, so there are no audio files to load

let audioCtx = null;
let soundOn = true;
try { soundOn = localStorage.getItem("outpostSound") !== "off"; } catch (e) { }

// browsers only allow audio after the player has touched the page
function initAudio() {
  if (audioCtx) return;
    try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          } catch (e) { }
          }
          window.addEventListener("pointerdown", initAudio);
          window.addEventListener("keydown", initAudio);

          function tone(freq, start, length, type, volume) {
            const osc = audioCtx.createOscillator();
              const gain = audioCtx.createGain();
                osc.type = type;
                  osc.frequency.value = freq;
                    gain.gain.setValueAtTime(volume, start);
                      gain.gain.exponentialRampToValueAtTime(0.0001, start + length);
                        osc.connect(gain);
                          gain.connect(audioCtx.destination);
                            osc.start(start);
                              osc.stop(start + length);
                              }

                              function playSound(name) {
                                if (!soundOn) return;
                                  initAudio();
                                    if (!audioCtx) return;
                                      if (audioCtx.state === "suspended") audioCtx.resume();
                                        const t = audioCtx.currentTime;

                                          if (name === "use") {
                                              tone(520, t, 0.08, "square", 0.05);
                                                  tone(780, t + 0.09, 0.12, "square", 0.05);
                                                    } else if (name === "fail") {
                                                        tone(180, t, 0.25, "sawtooth", 0.06);
                                                          } else if (name === "alert") {
                                                              tone(440, t, 0.15, "square", 0.06);
                                                                  tone(330, t + 0.18, 0.2, "square", 0.06);
                                                                    } else if (name === "radio") {
                                                                        tone(900, t, 0.06, "sine", 0.06);
                                                                            tone(700, t + 0.1, 0.06, "sine", 0.06);
                                                                              } else if (name === "chime") {
                                                                                  tone(660, t, 0.15, "sine", 0.06);
                                                                                      tone(880, t + 0.15, 0.25, "sine", 0.06);
                                                                                        } else if (name === "win") {
                                                                                            [523, 659, 784, 1047].forEach((f, i) => tone(f, t + i * 0.12, 0.25, "triangle", 0.07));
                                                                                              }
                                                                                              }

                                                                                              function updateSoundButton() {
                                                                                                document.getElementById("sound-btn").textContent = soundOn ? "Sound: on" : "Sound: off";
                                                                                                }

                                                                                                function toggleSound() {
                                                                                                  soundOn = !soundOn;
                                                                                                    try { localStorage.setItem("outpostSound", soundOn ? "on" : "off"); } catch (e) { }
                                                                                                      updateSoundButton();
                                                                                                        playSound("use");
                                                                                                        }