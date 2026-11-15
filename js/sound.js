let audioCtx = null;
let master = null;
let noiseBuf = null;
let soundOn = true;
let musicWanted = false;
let musicTimer = null;
let musicStep = 0;
let musicMood = "moon";

try { soundOn = localStorage.getItem("outpostSound") !== "off"; } catch (e) { }

const MUSIC = {
  moon: [[220, 262, 330], [175, 220, 262], [262, 330, 392], [196, 247, 294]],
    mars: [[196, 233, 294], [165, 196, 247], [220, 262, 330], [147, 185, 220]]
    };

    function initAudio() {
      if (audioCtx) return;
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                master = audioCtx.createGain();
                    master.gain.value = 0.9;
                        master.connect(audioCtx.destination);
                            noiseBuf = audioCtx.createBuffer(1, audioCtx.sampleRate, audioCtx.sampleRate);
                                const data = noiseBuf.getChannelData(0);
                                    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
                                      } catch (e) { }
                                      }

                                      window.addEventListener("pointerdown", () => {
                                        initAudio();
                                          if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
                                            if (musicWanted) startMusic();
                                            });
                                            window.addEventListener("keydown", initAudio);

                                            document.addEventListener("click", e => {
                                              if (e.target.closest && e.target.closest("button")) playSound("click");
                                              });

                                              function tone(freq, start, len, type, vol, slideTo) {
                                                const osc = audioCtx.createOscillator();
                                                  const gain = audioCtx.createGain();
                                                    osc.type = type;
                                                      osc.frequency.setValueAtTime(freq, start);
                                                        if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, start + len);
                                                          gain.gain.setValueAtTime(vol, start);
                                                            gain.gain.exponentialRampToValueAtTime(0.0001, start + len);
                                                              osc.connect(gain);
                                                                gain.connect(master);
                                                                  osc.start(start);
                                                                    osc.stop(start + len + 0.02);
                                                                    }

                                                                    function noise(start, len, vol, freq, type, sweepTo) {
                                                                      const src = audioCtx.createBufferSource();
                                                                        src.buffer = noiseBuf;
                                                                          const filter = audioCtx.createBiquadFilter();
                                                                            filter.type = type;
                                                                              filter.frequency.setValueAtTime(freq, start);
                                                                                if (sweepTo) filter.frequency.exponentialRampToValueAtTime(sweepTo, start + len);
                                                                                  filter.Q.value = 2;
                                                                                    const gain = audioCtx.createGain();
                                                                                      gain.gain.setValueAtTime(vol, start);
                                                                                        gain.gain.exponentialRampToValueAtTime(0.0001, start + len);
                                                                                          src.connect(filter);
                                                                                            filter.connect(gain);
                                                                                              gain.connect(master);
                                                                                                src.start(start);
                                                                                                  src.stop(start + len + 0.02);
                                                                                                  }

                                                                                                  function pad(freq, start, len, vol) {
                                                                                                    const osc = audioCtx.createOscillator();
                                                                                                      const gain = audioCtx.createGain();
                                                                                                        osc.type = "sine";
                                                                                                          osc.frequency.value = freq;
                                                                                                            gain.gain.setValueAtTime(0.0001, start);
                                                                                                              gain.gain.linearRampToValueAtTime(vol, start + len * 0.35);
                                                                                                                gain.gain.linearRampToValueAtTime(0.0001, start + len);
                                                                                                                  osc.connect(gain);
                                                                                                                    gain.connect(master);
                                                                                                                      osc.start(start);
                                                                                                                        osc.stop(start + len + 0.02);
                                                                                                                        }

                                                                                                                        function playSound(name) {
                                                                                                                          if (!soundOn) return;
                                                                                                                            initAudio();
                                                                                                                              if (!audioCtx) return;
                                                                                                                                if (audioCtx.state === "suspended") audioCtx.resume();
                                                                                                                                  const t = audioCtx.currentTime;

                                                                                                                                    if (name === "click") {
                                                                                                                                        tone(900, t, 0.03, "square", 0.02);
                                                                                                                                          } else if (name === "step") {
                                                                                                                                              noise(t, 0.05, 0.03, 500, "lowpass");
                                                                                                                                                } else if (name === "air") {
                                                                                                                                                    noise(t, 0.55, 0.09, 400, "bandpass", 2500);
                                                                                                                                                        tone(500, t, 0.4, "sine", 0.04, 900);
                                                                                                                                                          } else if (name === "plant") {
                                                                                                                                                              [0, 0.09, 0.18].forEach(d => {
                                                                                                                                                                    const f = 400 + Math.random() * 300;
                                                                                                                                                                          tone(f, t + d, 0.08, "sine", 0.06, f + 400);
                                                                                                                                                                              });
                                                                                                                                                                                } else if (name === "thud") {
                                                                                                                                                                                    tone(120, t, 0.28, "sine", 0.2, 45);
                                                                                                                                                                                        noise(t, 0.08, 0.08, 300, "lowpass");
                                                                                                                                                                                            tone(220, t + 0.05, 0.15, "square", 0.03);
                                                                                                                                                                                              } else if (name === "lab") {
                                                                                                                                                                                                  [880, 1175, 1480, 1175].forEach((f, i) => tone(f, t + i * 0.07, 0.06, "triangle", 0.05));
                                                                                                                                                                                                    } else if (name === "radio") {
                                                                                                                                                                                                        noise(t, 0.25, 0.05, 1800, "bandpass");
                                                                                                                                                                                                            tone(1000, t + 0.25, 0.06, "sine", 0.05);
                                                                                                                                                                                                              } else if (name === "alert") {
                                                                                                                                                                                                                  [700, 500, 700, 500].forEach((f, i) => tone(f, t + i * 0.14, 0.12, "square", 0.04));
                                                                                                                                                                                                                    } else if (name === "storm") {
                                                                                                                                                                                                                        noise(t, 0.9, 0.2, 160, "lowpass");
                                                                                                                                                                                                                            tone(70, t, 0.9, "sawtooth", 0.1, 35);
                                                                                                                                                                                                                              } else if (name === "fail") {
                                                                                                                                                                                                                                  tone(220, t, 0.35, "sawtooth", 0.06, 110);
                                                                                                                                                                                                                                    } else if (name === "chime") {
                                                                                                                                                                                                                                        [660, 880, 1320].forEach((f, i) => tone(f, t + i * 0.12, 0.5, "sine", 0.05));
                                                                                                                                                                                                                                          } else if (name === "win") {
                                                                                                                                                                                                                                              [523, 659, 784, 1047, 784, 1047, 1319].forEach((f, i) => tone(f, t + i * 0.12, 0.3, "triangle", 0.07));
                                                                                                                                                                                                                                                } else if (name === "count") {
                                                                                                                                                                                                                                                    tone(660, t, 0.15, "square", 0.05);
                                                                                                                                                                                                                                                      } else if (name === "go") {
                                                                                                                                                                                                                                                          tone(1320, t, 0.4, "square", 0.06);
                                                                                                                                                                                                                                                              noise(t, 1.2, 0.1, 200, "bandpass", 3000);
                                                                                                                                                                                                                                                                  tone(80, t, 1.2, "sawtooth", 0.05, 300);
                                                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                                                        tone(520, t, 0.08, "square", 0.05);
                                                                                                                                                                                                                                                                            tone(780, t + 0.09, 0.12, "square", 0.05);
                                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                                                              function playBar() {
                                                                                                                                                                                                                                                                                const t = audioCtx.currentTime + 0.05;
                                                                                                                                                                                                                                                                                  const chord = MUSIC[musicMood][musicStep % 4];
                                                                                                                                                                                                                                                                                    musicStep++;
                                                                                                                                                                                                                                                                                      chord.forEach(f => pad(f / 2, t, 3.4, 0.025));
                                                                                                                                                                                                                                                                                        const order = [0, 1, 2, 1, 2, 1, 0, 1];
                                                                                                                                                                                                                                                                                          order.forEach((n, i) => tone(chord[n] * 2, t + i * 0.4, 0.35, "triangle", 0.012));
                                                                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                                                                          function startMusic() {
                                                                                                                                                                                                                                                                                            if (!soundOn || musicTimer) return;
                                                                                                                                                                                                                                                                                              initAudio();
                                                                                                                                                                                                                                                                                                if (!audioCtx) return;
                                                                                                                                                                                                                                                                                                  if (audioCtx.state === "suspended") audioCtx.resume();
                                                                                                                                                                                                                                                                                                    playBar();
                                                                                                                                                                                                                                                                                                      musicTimer = setInterval(playBar, 3200);
                                                                                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                                                                                      function stopMusic() {
                                                                                                                                                                                                                                                                                                        clearInterval(musicTimer);
                                                                                                                                                                                                                                                                                                          musicTimer = null;
                                                                                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                                                                                          function setMusicMood(m) {
                                                                                                                                                                                                                                                                                                            musicMood = m;
                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                            function updateSoundButton() {
                                                                                                                                                                                                                                                                                                              const text = soundOn ? "Sound: on" : "Sound: off";
                                                                                                                                                                                                                                                                                                                document.getElementById("sound-btn").textContent = text;
                                                                                                                                                                                                                                                                                                                  document.getElementById("title-sound").textContent = text;
                                                                                                                                                                                                                                                                                                                  }

                                                                                                                                                                                                                                                                                                                  function toggleSound() {
                                                                                                                                                                                                                                                                                                                    soundOn = !soundOn;
                                                                                                                                                                                                                                                                                                                      try { localStorage.setItem("outpostSound", soundOn ? "on" : "off"); } catch (e) { }
                                                                                                                                                                                                                                                                                                                        updateSoundButton();
                                                                                                                                                                                                                                                                                                                          if (soundOn) {
                                                                                                                                                                                                                                                                                                                              if (musicWanted) startMusic();
                                                                                                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                                                                                                    stopMusic();
                                                                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                                                                      }