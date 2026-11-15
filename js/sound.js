let audioCtx = null;
let soundOn = true;

try { soundOn = localStorage.getItem("outpostSound") !== "off"; } catch (e) { }

function initAudio() {
  if (audioCtx) return;
    try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          } catch (e) { }
          }
          window.addEventListener("pointerdown", initAudio);
          window.addEventListener("keydown", initAudio);

          function beep(freq, start, len, type, vol) {
            const osc = audioCtx.createOscillator();
              const gain = audioCtx.createGain();
                osc.type = type;
                  osc.frequency.value = freq;
                    gain.gain.setValueAtTime(vol, start);
                      gain.gain.exponentialRampToValueAtTime(0.0001, start + len);
                        osc.connect(gain);
                          gain.connect(audioCtx.destination);
                            osc.start(start);
                              osc.stop(start + len);
                              }

                              function playSound(name) {
                                if (!soundOn) return;
                                  initAudio();
                                    if (!audioCtx) return;
                                      if (audioCtx.state === "suspended") audioCtx.resume();
                                        const t = audioCtx.currentTime;

                                          if (name === "use") {
                                              beep(520, t, 0.08, "square", 0.05);
                                                  beep(780, t + 0.09, 0.12, "square", 0.05);
                                                    } else if (name === "fail") {
                                                        beep(180, t, 0.25, "sawtooth", 0.06);
                                                          } else if (name === "event") {
                                                              beep(440, t, 0.15, "square", 0.05);
                                                                  beep(330, t + 0.18, 0.2, "square", 0.05);
                                                                    } else if (name === "caution") {
                                                                        beep(700, t, 0.12, "square", 0.05);
                                                                            beep(500, t + 0.15, 0.12, "square", 0.05);
                                                                                beep(700, t + 0.3, 0.12, "square", 0.05);
                                                                                  } else if (name === "day") {
                                                                                      beep(660, t, 0.15, "sine", 0.06);
                                                                                          beep(880, t + 0.15, 0.25, "sine", 0.06);
                                                                                            } else if (name === "win") {
                                                                                                [523, 659, 784, 1047].forEach((f, i) => beep(f, t + i * 0.12, 0.25, "triangle", 0.07));
                                                                                                  } else if (name === "lose") {
                                                                                                      [440, 349, 262].forEach((f, i) => beep(f, t + i * 0.2, 0.3, "sawtooth", 0.05));
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