<script>
        /* ─────────────────────────────────────────────
           DATA
        ─────────────────────────────────────────────── */
        const ROUTES = {
            bus: [{
                id: 0,
                name: "21G — Broadway → Tambaram",
                stops: ["Broadway", "Central", "Guindy", "Chrompet", "Tambaram"],
                baseEta: 522,
                nextStop: "Central Station",
                vehicle: "Bus 21G · TN09 AM 4421"
            }, {
                id: 1,
                name: "5C — Broadway → K.K. Nagar",
                stops: ["Broadway", "Park Town", "T.Nagar", "K.K.Nagar"],
                baseEta: 410,
                nextStop: "Park Town Bus Stop",
                vehicle: "Bus 5C · TN09 BK 7832"
            }, {
                id: 2,
                name: "M70 — CMBT → Sholinganallur",
                stops: ["CMBT", "Guindy", "Velachery", "Sholinganallur"],
                baseEta: 680,
                nextStop: "Guindy TASMAC Jn",
                vehicle: "Bus M70 · TN09 CJ 1190"
            }, {
                id: 3,
                name: "11B — Central → Guindy",
                stops: ["Central", "Egmore", "T.Nagar", "Guindy"],
                baseEta: 350,
                nextStop: "Egmore Bus Stop",
                vehicle: "Bus 11B · TN09 DL 3345"
            }, {
                id: 4,
                name: "47A — T.Nagar → Perambur",
                stops: ["T.Nagar", "Vadapalani", "Koyambedu", "Perambur"],
                baseEta: 490,
                nextStop: "Vadapalani Signal",
                vehicle: "Bus 47A · TN09 ER 9023"
            }, ],
            train: [{
                id: 0,
                name: "EMU — Beach → Tambaram",
                stops: ["Beach", "Park", "Guindy", "Chrompet", "Tambaram"],
                baseEta: 312,
                nextStop: "Park Station",
                vehicle: "Train 56102 · 12 coaches"
            }, {
                id: 1,
                name: "Metro — Wimco → Airport",
                stops: ["Wimco", "Washermanpet", "Central", "Airport"],
                baseEta: 228,
                nextStop: "Washermanpet Metro",
                vehicle: "Metro L1 · Blue Line"
            }, {
                id: 2,
                name: "EMU — Central → Avadi",
                stops: ["Central", "Basin Br.", "Ambattur", "Avadi"],
                baseEta: 438,
                nextStop: "Basin Bridge Jn",
                vehicle: "Train 66011 · 8 coaches"
            }, {
                id: 3,
                name: "MRTS — Velachery → Beach",
                stops: ["Velachery", "Guindy", "Park", "Beach"],
                baseEta: 270,
                nextStop: "Guindy MRTS",
                vehicle: "MRTS · 4 coaches"
            }, {
                id: 4,
                name: "Local — Tambaram → Beach",
                stops: ["Tambaram", "Chrompet", "Guindy", "Beach"],
                baseEta: 380,
                nextStop: "Chrompet Station",
                vehicle: "Train 56104 · 12 coaches"
            }, ]
        };

        const TRAFFIC_MULTIPLIERS = {
            smooth: 1.0,
            moderate: 1.45,
            heavy: 2.1
        };
        const TRAFFIC_DELAY_MSGS = {
            smooth: ["Running on schedule", "Clear roads ahead", "No delays reported"],
            moderate: ["Moderate traffic on Anna Salai", "Slow near Kathipara Flyover", "Minor delay at T.Nagar signal"],
            heavy: ["Heavy jam at Kathipara Junction", "Standstill near Koyambedu bus stop", "Major congestion on GST Road"]
        };

        /* ─────────────────────────────────────────────
           STATE
        ─────────────────────────────────────────────── */
        let state = {
            mode: 'bus',
            routeIdx: 0,
            traffic: 'smooth',
            secondsLeft: 0,
            timerInterval: null,
            progress: 0.38,
        };

        /* ─────────────────────────────────────────────
           INIT
        ─────────────────────────────────────────────── */
        function getRoutes() {
            return ROUTES[state.mode];
        }

        function currentRoute() {
            return getRoutes()[state.routeIdx];
        }

        function init() {
            rebuildRouteSelect();
            resetRoute();
        }

        function rebuildRouteSelect() {
            const sel = document.getElementById('routeSelect');
            sel.innerHTML = '';
            getRoutes().forEach((r, i) => {
                const opt = document.createElement('option');
                opt.value = i;
                opt.textContent = r.name;
                sel.appendChild(opt);
            });
            sel.value = state.routeIdx;
        }

        function resetRoute() {
            const r = currentRoute();
            const mult = TRAFFIC_MULTIPLIERS[state.traffic];
            state.secondsLeft = Math.round(r.baseEta * mult);
            state.progress = 0.38 + Math.random() * 0.25;
            renderETA();
            renderTrack();
            renderStatus();
            renderSubtext();
            startCountdown();
        }

        /* ─────────────────────────────────────────────
           COUNTDOWN
        ─────────────────────────────────────────────── */
        function startCountdown() {
            if (state.timerInterval) clearInterval(state.timerInterval);
            state.timerInterval = setInterval(() => {
                if (state.secondsLeft > 0) {
                    state.secondsLeft--;
                    renderETA();
                } else {
                    clearInterval(state.timerInterval);
                    document.getElementById('etaSub').textContent = '🚌 Vehicle has arrived!';
                }
            }, 1000);
        }

        function renderETA() {
            const m = Math.floor(state.secondsLeft / 60);
            const s = state.secondsLeft % 60;
            const mm = String(m).padStart(2, '0');
            const ss = String(s).padStart(2, '0');
            document.getElementById('etaValue').textContent = `${mm}:${ss}`;
        }

        /* ─────────────────────────────────────────────
           STATUS
        ─────────────────────────────────────────────── */
        function renderStatus() {
            const pill = document.getElementById('statusPill');
            const txt = document.getElementById('statusText');
            pill.className = 'status-pill';
            if (state.traffic === 'smooth') {
                pill.classList.add('on-time');
                txt.textContent = 'On Time';
            } else if (state.traffic === 'moderate') {
                pill.classList.add('delayed');
                txt.textContent = 'Slight Delay';
            } else {
                pill.classList.add('heavy');
                txt.textContent = 'Heavily Delayed';
            }
        }

        function renderSubtext() {
            const msgs = TRAFFIC_DELAY_MSGS[state.traffic];
            const r = currentRoute();
            const msg = msgs[Math.floor(Math.random() * msgs.length)];
            document.getElementById('etaSub').textContent =
                state.traffic === 'smooth' ?
                `Next stop: ${r.nextStop}` :
                `⚠ ${msg}`;
        }

        /* ─────────────────────────────────────────────
           TRACK
        ─────────────────────────────────────────────── */
        function renderTrack() {
            const r = currentRoute();
            const stops = r.stops;
            const progress = state.progress;

            const container = document.getElementById('trackStops');
            container.innerHTML = '';

            const lineWrap = document.createElement('div');
            lineWrap.className = 'track-line-wrap';
            const lineFill = document.createElement('div');
            lineFill.className = 'track-line-fill';
            lineFill.style.width = '0%';
            const vehicle = document.createElement('div');
            vehicle.className = 'track-vehicle';
            lineFill.appendChild(vehicle);
            lineWrap.appendChild(lineFill);
            container.appendChild(lineWrap);

            stops.forEach((name, i) => {
                const frac = i / (stops.length - 1);
                const div = document.createElement('div');
                div.className = 'stop';
                if (frac < progress - 0.05) div.classList.add('passed');
                else if (Math.abs(frac - progress) < 0.15) div.classList.add('current');

                const dot = document.createElement('div');
                dot.className = 'stop-dot';
                const label = document.createElement('div');
                label.className = 'stop-name';
                label.textContent = name;
                div.appendChild(dot);
                div.appendChild(label);
                container.appendChild(div);
            });

            requestAnimationFrame(() => {
                lineFill.style.width = `${progress * 100}%`;
            });
        }

        /* ─────────────────────────────────────────────
           USER ACTIONS
        ─────────────────────────────────────────────── */
        function setMode(m) {
            state.mode = m;
            state.routeIdx = 0;
            document.getElementById('btn-bus').classList.toggle('active', m === 'bus');
            document.getElementById('btn-train').classList.toggle('active', m === 'train');
            rebuildRouteSelect();
            resetRoute();
        }

        function onRouteChange() {
            state.routeIdx = parseInt(document.getElementById('routeSelect').value, 10);
            resetRoute();
        }

        function setTraffic(t) {
            state.traffic = t;
            ['smooth', 'moderate', 'heavy'].forEach(k => {
                const btn = document.getElementById(`t-${k}`);
                btn.className = 'traffic-btn' + (k === t ? ` active-${k}` : '');
            });
            const r = currentRoute();
            const newSecs = Math.round(r.baseEta * TRAFFIC_MULTIPLIERS[t]);
            animateETA(newSecs);
            renderStatus();
            renderSubtext();
        }

        function animateETA(target) {
            const start = state.secondsLeft;
            const delta = target - start;
            const dur = 600;
            const startTime = performance.now();

            const el = document.getElementById('etaValue');
            el.classList.remove('bump');
            void el.offsetWidth;
            el.classList.add('bump');

            if (state.timerInterval) clearInterval(state.timerInterval);

            function step(now) {
                const elapsed = now - startTime;
                const t = Math.min(elapsed / dur, 1);
                const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                state.secondsLeft = Math.round(start + delta * ease);
                renderETA();
                if (t < 1) requestAnimationFrame(step);
                else startCountdown();
            }
            requestAnimationFrame(step);
        }

        function doRefresh() {
            const btn = document.getElementById('refreshBtn');
            btn.classList.add('spinning');
            btn.addEventListener('animationend', () => btn.classList.remove('spinning'), {
                once: true
            });

            const nudge = Math.floor(Math.random() * 31) - 15;
            state.secondsLeft = Math.max(10, state.secondsLeft + nudge);
            state.progress = Math.min(0.95, state.progress + 0.02);
            renderETA();
            renderTrack();
            renderSubtext();

            const el = document.getElementById('etaValue');
            el.classList.remove('bump');
            void el.offsetWidth;
            el.classList.add('bump');
        }

        /* ─────────────────────────────────────────────
           BOOT
        ─────────────────────────────────────────────── */
        init();
    </script>
