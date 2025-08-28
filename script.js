class EnhancedDigitalClockGift {
    constructor() {
        this.initializeProperties();
        this.initializeElements();
        this.loadSettings();
        this.setupEventListeners();
        this.startClock();
        this.setupChimeScheduler();
        this.animateBike();
        // this.updateThemeByTime();
        // setInterval(() => this.updateThemeByTime(), 60000 * 5);
    }

    initializeProperties() {
        this.testTime = null; 
        // Für Echtzeit. Zum Testen mit Hochkomma: '23:59:50'
        // this.testTime = '22:59:50'; 

        this.realTimeStart = null;
        this.fakeTimeStart = null;
        this.lastChimeHour = -1;
        this.chimeEnabled = true;
        this.landscapeInterval = null;
        this.landscapeAnimationId = null;
        // NEU: Eigenschaften für den Sekundenschlag
        this.tickTockEnabled = false;
        this.isTick = true;
        this.currentPeriod = null; // Speichert die aktuelle Tagesphase
        // NEU: Zentrale Liste für alle Bilder der Slideshow
        // Hier pflegst du alle Bilder, die du im Ordner hast und zeigen möchtest.
        this.slideshowImages = [
            'assets/img/cycling-landscape.webp', 
            'assets/img/Highlights_Eurobike_REEVO.webp', 
            'assets/img/woman-in-red_1920.jpg',
            'assets/img/sunset-bike_1280.jpg',
            'assets/img/snow-bord-bike_1280.jpg', 
            'assets/img/singletrail-bike_1280.jpg', 
            'assets/img/pexels-sunset-bike.jpg', 
            'assets/img/old_Tandem.jpg', 
            'assets/img/landscape-MORNING-bike_1280.jpg', 
            'assets/img/cycling-turn_1280.jpg', 
            'assets/img/historical-bicycle-image.jpg', 
            'assets/img/bike-cyclist-top-of-mountain-garda.jpg', 
            'assets/img/bike_OhneNabe.jpg', 
            'assets/img/bg-night.jpg', 
            'assets/img/modern_rad.jpg', 
            'assets/img/cycling-landscape.png',
            'assets/img/birthday_cake_62_watch_mtb.png',
            'assets/img/ai-generated-motorbike_1280.png',
            'assets/img/Men-Wife_rad.jpg', 
            'assets/img/bg-morning.jpg', 
            'assets/img/Hochrad.jpg', 
            'assets/img/bg-evening.jpg', 
            'assets/img/bg-day.jpg', 
            'assets/img/ai-generated-mtb-cross_1920.jpg', 
            'assets/img/alps-south-island-new-zealand-lake-pukaki.jpg', 
            'assets/img/Alte_Raeder_Sammlung.jpg'
            // Füge hier einfach neue Dateinamen hinzu, z.B. 'assets/img/mein-neues-bild.jpg',
        ];

        this.sprueche = [
            "Wer sein Rad liebt, der schiebt 🚲",
            "Ein Leben ohne Rad ist möglich, aber sinnlos 😅",
            "Radfahren = Glück auf 2 Rädern ✨",
            "In die Pedale treten statt in die Tasten! 💻➡️🚴",
            "Radfahren ist wie fliegen, nur näher am Boden 🚴‍♂️",
            "Zwei Räder bewegen die Seele ✨",
            "Ohne Fahrrad? Ohne mich! 😎",
            "Jeder Tritt in die Pedale ist ein kleiner Sieg 💪",
            "Das Leben ist wie Fahrradfahren – Balance halten! ⚖️",
            "Radler haben immer Rückenwind (im Herzen) ❤️",
            "Fahrradfahren verlängert das Leben – gefühlt um jede Tour 🕰️",
            "Radeln ist die beste Medizin 🌿",
            "Ein Radler kennt keine Grenzen 🌍",
            "Radfahrer sind die wahren Entdecker 🌲",
            "Jede Tour beginnt mit dem ersten Tritt 👣",
            "Der Kopf wird frei, die Beine fahren 🚴",
            "Radeln ist Urlaub für den Alltag 🏞️",
            "Manche sammeln Münzen, andere Kilometer 🛣️",
            "Das Rad kennt keine Staus 🚦",
            "Auf dem Rad ist jeder Kilometer ein Geschenk 🎁",
            "Radeln ist Freiheit pur 🕊️",
            "Ein echter Radler fährt auch gegen den Wind 🌬️",
            "Radler altern nicht – sie sammeln Höhenmeter ⛰️",
            "Radfahren hält jung (und manchmal schmutzig) 😅",
            "Jeder Anstieg hat eine Abfahrt 🎢",
            "Lieber Kette ölen als Couch drücken 🛋️",
            "Zwei Räder, ein Herzschlag ❤️‍🔥",
            "Ohne Rad kein Sonntag ☀️",
            "Radlerwege sind die besten Abkürzungen 🚴‍♀️",
            "Radeln ist Meditation in Bewegung 🧘",
            "Wenn nichts mehr geht, geh Rad fahren 🚴",
            "Freude ist, wenn die Schaltung leise schnurrt ⚙️",
            "Ein Radler hat immer ein Ziel – manchmal nur die Eisdiele 🍦",
            "Das schönste Geräusch? Surrende Reifen auf Asphalt 🎶"
        ];
        this.fragen = [
            {q: "Wie viele Speichen hat ein Standardfahrrad-Rad?", a: "36"},
            {q: "Welches Land erfand das moderne Fahrrad?", a: "Deutschland"},
            {q: "In welchem Land wurde das erste Fahrrad (Laufmaschine) erfunden?", a: "Deutschland"},
            {q: "Wie heißt die bekannteste Rad-Rundfahrt der Welt?", a: "Tour de France"},
            {q: "Wie viele Räder hat ein Tandem?", a: "2"},
            {q: "Wie nennt man ein Fahrrad ohne Gangschaltung?", a: "Singlespeed"},
            {q: "Welche Stadt ist bekannt für ihre Fahrradinfrastruktur?", a: "Amsterdam"},
            {q: "Wie nennt man das Teil, das die Kette spannt?", a: "Schaltwerk"},
            {q: "Welches Getränk teilt seinen Namen mit einem Radfahrer-Mix?", a: "Radler"},
            {q: "Wie viele Tage dauert die Tour de France ungefähr?", a: "21"},
            {q: "Welches Fahrrad ist für Tricks und Sprünge gebaut?", a: "BMX"},
            {q: "Wie nennt man den längsten Teil des Fahrradrahmens?", a: "Oberrohr"},
            {q: "Welches Bauteil bremst das Rad durch Reibung an der Felge?", a: "Felgenbremse"},
            {q: "Wie viele Gänge haben moderne Rennräder ungefähr?", a: "22"},
            {q: "Welche Farbe trägt das Führungstrikot der Tour de France?", a: "Gelb"},
            {q: "Wie heißt die längste Radfernroute in Deutschland?", a: "Elberadweg"},
            {q: "Was ist kleiner: Ritzel oder Kettenblatt?", a: "Ritzel"},
            {q: "Wie nennt man ein Fahrrad mit nur einem Rad?", a: "Einrad"},
            {q: "Wer gilt als Erfinder der Laufmaschine (1817)?", a: "Karl Drais"},
            {q: "Wie heißt die schwerste Bergetappe der Tour de France mit 21 Kehren?", a: "Alpe d'Huez"},
            {q: "Welcher Radprofi gewann die Tour de France siebenmal (später aberkannt)?", a: "Lance Armstrong"},
            {q: "Wie nennt man die Windschatten-Technik im Peloton?", a: "Echelons"},
            {q: "Welche Leistungseinheit nutzen Radprofis, um Wattwerte zu messen?", a: "Watt"},
            {q: "Wie hoch ist der berühmte Passo dello Stelvio?", a: "2758 m"},
            {q: "Welcher Klassiker trägt den Spitznamen 'L’Enfer du Nord'?", a: "Paris-Roubaix"},
            {q: "Wie heißt der leichteste Gang am Rennrad?", a: "Klettergang"},
            {q: "Welche Carbonfaser-Bauweise sorgt für extreme Leichtigkeit?", a: "Monocoque"},
            {q: "Wie heißt die Disziplin auf der Bahn, bei der man im Windschatten eines Motorrads fährt?", a: "Derny"},
            {q: "Welche Komponente am Rennrad wird mit Di2 oder eTap gesteuert?", a: "Elektronische Schaltung"},
            {q: "Wie viele Fahrer starten normalerweise in einem Tour-de-France-Team?", a: "8"},
            {q: "Was bedeutet 'VO2max' in der Trainingslehre?", a: "Maximale Sauerstoffaufnahme"},
            {q: "Wie heißt die 3-wöchige Landesrundfahrt in Italien?", a: "Giro d’Italia"},
            {q: "Wer gewann 1987 als letzter Nicht-Europäer den Giro d’Italia?", a: "Andrew Hampsten"},
            {q: "Wie nennt man die Bergwertungstrikots bei der Tour de France?", a: "Das gepunktete Trikot"},
            {q: "Welches Material löste Stahl in hochwertigen Rennrädern ab?", a: "Carbon"},
            {q: "Wie hoch ist der Col du Tourmalet?", a: "2115 m"},
            {q: "Welches Radrennen ist das älteste noch bestehende Eintagesrennen?", a: "Lüttich-Bastogne-Lüttich"},
            {q: "Wie nennt man die Trittfrequenz beim Radfahren?", a: "Kadenz"},
            {q: "Wie heißt der Messwert, der Watt auf Körpergewicht bezieht?", a: "Watt pro Kilogramm"},
            {q: "Welcher Fahrer gewann 5-mal die Tour de France zwischen 1969–1974?", a: "Eddy Merckx"},
            {q: "Welches spezielle Rad wird für Zeitfahren genutzt?", a: "Zeitfahrrad"},
            {q: "Welche Rennserie heißt offiziell 'UCI WorldTour'?", a: "Die höchste Profi-Rennserie"},
            {q: "Was ist der maximale Luftdruck bei Rennradreifen (in bar)?", a: "ca. 8 bar"},
            {q: "Wie heißt die Radmarathon-Legende in Italien mit 1200 km?", a: "Paris–Brest–Paris"},
            {q: "Wie nennt man ein Rad mit besonders kleinem Rahmen und Laufrädern (z.B. Brompton)?", a: "Faltrad"},
            {q: "Welche Funktion hat ein Powermeter?", a: "Misst Leistung in Watt"},
            {q: "Welcher deutsche Fahrer gewann die Tour de France 1997?", a: "Jan Ullrich"},
            {q: "Wie nennt man den Steigbügel am Pedal für festen Halt?", a: "Cleats"},
            {q: "Welche drei Grand Tours gibt es im Radsport?", a: "Tour de France, Giro d’Italia, Vuelta a España"},
            {q: "Wie heißt das berühmte Rennen über Kopfsteinpflaster in Flandern?", a: "Ronde van Vlaanderen"}
        ];
    }

    initializeElements() {
        this.hourHand = document.getElementById('hour-hand');
        this.minuteHand = document.getElementById('minute-hand');
        this.secondHand = document.getElementById('second-hand');
        this.digitalTime = document.getElementById('digital-time');
        this.clockFace = document.querySelector('.clock-face');
        this.chimeToggle = document.getElementById('chime-toggle');
        this.testChime = document.getElementById('test-chime');
        this.playMessage = document.getElementById('play-message');
        this.volumeControl = document.getElementById('volume');
        this.volumeDisplay = document.getElementById('volume-display');
        this.chimeAudio = document.getElementById('chime-sound');
        this.messageAudio = document.getElementById('birthday-message');
        this.midnightAudio = document.getElementById('midnight-sound');
        this.ambientMorningAudio = document.getElementById('ambient-morning');
        this.ambientDayAudio = document.getElementById('ambient-day');
        this.ambientEveningAudio = document.getElementById('ambient-evening');
        this.ambientNightAudio = document.getElementById('ambient-night');
        this.ambientSounds = [this.ambientMorningAudio, this.ambientDayAudio, this.ambientEveningAudio, this.ambientNightAudio];
        // NEU: Audio-Elemente für Tick und Tack
        this.tickAudio = document.getElementById('tick-sound');
        this.tackAudio = document.getElementById('tack-sound');
        // NEU: Button für Tick und Tack
        this.tickTockToggle = document.getElementById('tick-tock-toggle');
    }
    
    loadSettings() {
        const savedVolume = localStorage.getItem('clockVolume');
        const volume = savedVolume ? parseInt(savedVolume, 10) : 50;
        this.volumeControl.value = volume;
        this.setVolume(volume);
        const savedChime = localStorage.getItem('chimeEnabled');
        this.chimeEnabled = savedChime !== 'false';
        this.updateChimeButton();
        // NEU: Lädt die Einstellung für den Sekundenschlag
        const savedTickTock = localStorage.getItem('tickTockEnabled');
        this.tickTockEnabled = savedTickTock === 'true';
        this.updateTickTockButton();
    }
    
    setVolume(value) {
        const mainVolume = value / 100;
        const ambientVolume = mainVolume * 0.4;
        if (this.chimeAudio) this.chimeAudio.volume = mainVolume;
        if (this.messageAudio) this.messageAudio.volume = mainVolume;
        if (this.midnightAudio) this.midnightAudio.volume = mainVolume;
        // NEU: Lautstärke für Tick und Tack setzen
        if (this.tickAudio) this.tickAudio.volume = mainVolume * 0.5; // Etwas leiser
        if (this.tackAudio) this.tackAudio.volume = mainVolume * 0.5; // Etwas leiser
        this.ambientSounds.forEach(sound => { if (sound) sound.volume = ambientVolume; });
        if (this.volumeDisplay) this.volumeDisplay.textContent = `${value}%`;
        localStorage.setItem('clockVolume', value);
    }
    
    setupEventListeners() {
        if(this.chimeToggle) this.chimeToggle.addEventListener('click', () => this.toggleChime());
        if(this.testChime) this.testChime.addEventListener('click', () => this.playChime());
        if(this.playMessage) this.playMessage.addEventListener('click', () => this.playBirthdayMessage());
        if(this.volumeControl) this.volumeControl.addEventListener('input', (e) => this.setVolume(e.target.value));
        document.querySelectorAll('.view-btn').forEach(btn => btn.addEventListener('click', (e) => this.changeView(e.target.dataset.view)));
        const closeJourneyBtn = document.getElementById('close-journey');
        if(closeJourneyBtn) closeJourneyBtn.addEventListener('click', () => {
            const frame = document.getElementById('journey-frame');
            if(frame) frame.src = 'about:blank';
            this.changeView('standard');
        });
        // NEU: Event Listener für den Tick-Tack-Schalter
        if (this.tickTockToggle) this.tickTockToggle.addEventListener('click', () => this.toggleTickTock());
        this.setupKeyboardShortcuts();
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            switch(e.key.toLowerCase()) {
                case 'c': this.toggleChime(); break;
                case 't': this.playChime(); break;
                case 'm': this.playBirthdayMessage(); break;
                // NEU: Tastenkürzel 'S' für Sekundenschlag
                case 's': this.toggleTickTock(); break;
                case 'arrowup': this.adjustVolume(10); break;
                case 'arrowdown': this.adjustVolume(-10); break;
                case '1': this.changeView('standard'); break;
                case '2': this.changeView('landscape'); break;
                case '3': this.changeView('journey'); break;
                case '4': this.changeView('fun'); break;
            }
        });
    }

    adjustVolume(change) {
        const currentVolume = parseInt(this.volumeControl.value, 10);
        const newVolume = Math.max(0, Math.min(100, currentVolume + change));
        this.volumeControl.value = newVolume;
        this.setVolume(newVolume);
    }

    getNow() {
        if (this.testTime) {
            if (!this.realTimeStart) {
                this.realTimeStart = new Date();
                const parts = this.testTime.split(':');
                const fakeNow = new Date();
                fakeNow.setHours(parseInt(parts[0], 10), parseInt(parts[1], 10), parseInt(parts[2], 10));
                this.fakeTimeStart = fakeNow;
            }
            const realElapsedTime = new Date() - this.realTimeStart;
            return new Date(this.fakeTimeStart.getTime() + realElapsedTime);
        }
        return new Date();
    }
    
    startClock() {
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
    }

    updateClock() {
        const now = this.getNow();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        this.digitalTime.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        const secondAngle = seconds * 6;
        const minuteAngle = minutes * 6 + seconds * 0.1;
        const hourAngle = (hours % 12) * 30 + minutes * 0.5;

        this.secondHand.style.transform = `rotate(${secondAngle}deg)`;
        this.minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
        this.hourHand.style.transform = `rotate(${hourAngle}deg)`;
        
        // NEU: Sekundengenaue Prüfung für Theme-Wechsel
        let expectedPeriod = 'day';
        if (hours >= 5 && hours <= 7) { expectedPeriod = 'morning'; }
        else if (hours >= 18 && hours <= 22) { expectedPeriod = 'evening'; }
        else if (hours >= 23 || hours <= 4) { expectedPeriod = 'night'; }
        
        if (expectedPeriod !== this.currentPeriod) {
            this.setTheme(expectedPeriod); // Wechsel nur auslösen, wenn nötig
        }

        this.checkSpecialTimes(hours, minutes, seconds);
        // NEU: Spielt den Tick-Tack-Sound ab, wenn aktiviert
        if (this.tickTockEnabled) {
            this.playTickTock();
        }
    }

    // Umbenannt von updateThemeByTime zu setTheme für mehr Klarheit
    setTheme(period) {
        this.currentPeriod = period; // Neuen Zustand sofort speichern
        let themeClass = 'theme-day';

        switch(period) {
            case 'morning': themeClass = 'theme-morning'; break;
            case 'evening': themeClass = 'theme-evening'; break;
            case 'night': themeClass = 'theme-night'; break;
        }
        
        document.body.className = themeClass;
        this.playAmbientSound(period);
    }

    // NEU: Eigene Methode zum Abspielen des Tick-Tack
    playTickTock() {
        const soundToPlay = this.isTick ? this.tickAudio : this.tackAudio;
        if (soundToPlay && soundToPlay.readyState >= 2) {
            soundToPlay.currentTime = 0;
            soundToPlay.play().catch(e => {}); // Fehler unterdrücken, da sie unwichtig sind
        }
        this.isTick = !this.isTick; // Zustand für den nächsten Schlag umkehren
    }

    // NEU: Eigene Methode zum Umschalten des Tick-Tack
    toggleTickTock() {
        this.tickTockEnabled = !this.tickTockEnabled;
        localStorage.setItem('tickTockEnabled', this.tickTockEnabled);
        this.updateTickTockButton();
    }

    // NEU: Eigene Methode zum Aktualisieren des Button-Textes
    updateTickTockButton() {
        if (this.tickTockToggle) {
            this.tickTockToggle.textContent = this.tickTockEnabled ? '🔔 Sekundenschlag: AN' : '🔕 Sekundenschlag: AUS';
            this.tickTockToggle.classList.toggle('disabled', !this.tickTockEnabled);
        }
    }

    setupChimeScheduler() {
        setInterval(() => {
            const now = this.getNow();
            if (this.chimeEnabled && now.getMinutes() === 0 && now.getSeconds() === 0 && now.getHours() !== this.lastChimeHour) {
                this.lastChimeHour = now.getHours();
                this.playChime();
                if(this.clockFace) this.showChimeAnimation();
            } else if (now.getMinutes() !== 0) {
                this.lastChimeHour = -1;
            }
        }, 1000);
    }

    playChime() {
        const hour = this.getNow().getHours(); // z.B. 13
        
        // Korrigierte Logik zur Umrechnung in 12-Stunden-Schläge
        let chimeCount = hour;
        if (chimeCount > 12) {
            chimeCount = chimeCount - 12; // aus 13 wird 1, aus 14 wird 2, etc.
        }
        if (chimeCount === 0) {
            chimeCount = 12; // aus 0 (Mitternacht) wird 12
        }

        let count = 0;
        const play = () => {
            if (count < chimeCount) {
                if (this.chimeAudio && this.chimeAudio.readyState >= 2) {
                    this.chimeAudio.currentTime = 0;
                    this.chimeAudio.play();
                }
                count++;
                setTimeout(play, 1500);
            }
        };
        play();
    }
    
    playBirthdayMessage() {
        if(this.messageAudio && this.messageAudio.readyState >= 2) {
            this.messageAudio.currentTime = 0;
            this.messageAudio.play();
        }
    }
    
    showChimeAnimation() {
        if(this.clockFace) {
            this.clockFace.classList.add('chiming');
            setTimeout(() => this.clockFace.classList.remove('chiming'), 2000);
        }
    }

    toggleChime() {
        this.chimeEnabled = !this.chimeEnabled;
        localStorage.setItem('chimeEnabled', this.chimeEnabled);
        this.updateChimeButton();
    }
    
    updateChimeButton() {
        if(this.chimeToggle) {
            this.chimeToggle.textContent = this.chimeEnabled ? '🔔 Stundenschlag: AN' : '🔕 Stundenschlag: AUS';
            this.chimeToggle.classList.toggle('disabled', !this.chimeEnabled);
        }
    }

    showSpecialAnimation(message, duration = 4000) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(46,204,113,0.95), rgba(39,174,96,0.95));
            color: white; padding: 30px 50px; border-radius: 25px; font-size: 26px;
            font-weight: bold; z-index: 6000; text-align: center; max-width: 80%;
            animation: fadeInOut ${duration / 1000}s ease-in-out;`;
        overlay.textContent = message;
        document.body.appendChild(overlay);
        setTimeout(() => overlay.remove(), duration);
    }
    
    checkSpecialTimes(hours, minutes, seconds) {
        if (hours === 0 && minutes === 0 && seconds === 0) {
            this.showSpecialAnimation('🌙 Mitternacht! 🌙');
            this.playMidnightSound();
        }
        if (hours === 12 && minutes === 0 && seconds === 0) {
            this.showSpecialAnimation('☀️ Mittag! ☀️');
        }
    }

    playMidnightSound() {
        if (this.midnightAudio && this.midnightAudio.readyState >= 2) {
            this.midnightAudio.currentTime = 0;
            this.midnightAudio.play();
        }
    }
    
    playAmbientSound(period) {
        this.ambientSounds.forEach(sound => { if(sound) sound.pause(); });
        let soundToPlay = null;

        if (period === 'morning') soundToPlay = this.ambientMorningAudio;
        else if (period === 'day') soundToPlay = this.ambientDayAudio;
        else if (period === 'evening') soundToPlay = this.ambientEveningAudio;
        else if (period === 'night') soundToPlay = this.ambientNightAudio; // NEU
        
        if (soundToPlay && soundToPlay.readyState >= 2) {
            soundToPlay.currentTime = 0;
            soundToPlay.play().catch(e => {});
        }
    }

    animateBike() {
        const bike = document.getElementById('bike-decoration');
        const clockFace = this.clockFace;
        if (!bike || !clockFace) return;
        let angle = 0;
        const animate = () => {
            const radius = clockFace.getBoundingClientRect().width / 2 + 30;
            const x = Math.cos(angle * Math.PI / 180) * radius;
            const y = Math.sin(angle * Math.PI / 180) * radius;
            bike.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle + 90}deg) scaleX(-1)`;
            angle = (angle + 0.5) % 360;
            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }
    
    changeView(viewName) {
        document.querySelectorAll('.view-container').forEach(c => c.style.display = 'none');
        document.getElementById('journey-container').style.display = 'none';
        document.querySelectorAll('.view-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.view === viewName));

        this.startOrStopLandscapeAnimation(false);

        switch (viewName) {
            case 'standard':
                document.getElementById('main-container').style.display = 'block';
                break;
            case 'landscape':
                const landscapeContainer = document.getElementById('landscape-container');
                landscapeContainer.style.display = 'block';
                this.startLandscapeSlideshow();
                requestAnimationFrame(() => {
                    this.startOrStopLandscapeAnimation(true);
                });
                break;
            case 'journey':
                const journeyContainer = document.getElementById('journey-container');
                journeyContainer.style.display = 'block';
                document.getElementById('journey-frame').src = "https://jkegithub.github.io/Klangreise_Radler/";
                break;
            case 'fun':
                this.showRandomSurprise();
                document.getElementById('main-container').style.display = 'block';
                document.querySelector('.view-btn[data-view="standard"]').classList.add('active');
                break;
        }
    }
    
    startLandscapeSlideshow() {
        if (this.landscapeInterval) clearInterval(this.landscapeInterval);
        const container = document.getElementById('landscape-slideshow');
        // Greift jetzt auf die zentrale Bild-Liste zu
        const images = this.slideshowImages; 
        if (!container || images.length === 0) return; // Bricht ab, wenn keine Bilder da sind

        let currentIndex = 0;
        const showNextImage = () => {
            currentIndex = (currentIndex + 1) % images.length;
            container.style.backgroundImage = `url(${images[currentIndex]})`;
        };
        
        container.style.backgroundImage = `url(${images[0]})`;
        this.landscapeInterval = setInterval(showNextImage, 8000);
    }
    
    startOrStopLandscapeAnimation(start) {
        const cyclist = document.getElementById('landscape-cyclist');
        const container = document.getElementById('landscape-slideshow');

        if (this.landscapeAnimationId) {
            cancelAnimationFrame(this.landscapeAnimationId);
            this.landscapeAnimationId = null;
        }

        if (!start || !cyclist || !container) {
            if(cyclist) cyclist.style.opacity = '0';
            return;
        }
        
        const rect = container.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        cyclist.style.opacity = '1';

        // --- KORREKTUR ABSTAND ---
        // Dies ist jetzt der exakte, gleichmäßige Abstand auf allen 4 Seiten
        const margin = 48; 

        // Symmetrische Pfadberechnung
        const pathTop = margin - 13;
        const pathBottom = rect.height - margin; 
        const pathLeft = margin - 13;
        const pathRight = rect.width - margin; 

        const pathWidth = pathRight - pathLeft;
        const pathHeight = pathBottom - pathTop;
        const perimeter = (pathWidth + pathHeight) * 2;
        
        let distance = 0;
        const speed = 3;
        let currentRotation = 180; // Startwinkel für einen gespiegelten Radler, der nach rechts fährt

        const animate = () => {
            distance = (distance + speed) % perimeter;

            let x = 0, y = 0;
            let targetRotation = 0;

            if (distance < pathWidth) {
                // Etappe 1: Unten, fährt nach rechts
                x = pathLeft + distance;
                y = pathBottom;
                targetRotation = 0; // KORRIGIERTE DREHUNG
            } else if (distance < pathWidth + pathHeight) {
                // Etappe 2: Rechts, fährt nach oben
                x = pathRight;
                y = pathBottom - (distance - pathWidth);
                targetRotation = 270; // KORRIGIERTE DREHUNG
            } else if (distance < (pathWidth * 2) + pathHeight) {
                // Etappe 3: Oben, fährt nach links
                x = pathRight - (distance - (pathWidth + pathHeight));
                y = pathTop;
                targetRotation = 180; // KORRIGIERTE DREHUNG
            } else {
                // Etappe 4: Links, fährt nach unten
                x = pathLeft;
                y = pathTop + (distance - (pathWidth * 2 + pathHeight));
                targetRotation = 90; // KORRIGIERTE DREHUNG
            }

            // Sanfte Drehung
            let diff = targetRotation - currentRotation;
            if (diff > 180) diff -= 360;
            if (diff < -180) diff += 360;
            currentRotation += diff * 0.1;

            // Wende die Transformation an: IMMER gespiegelt, dann gedreht.
            // Das translate(-50%,-50%) zentriert den Radler auf dem berechneten Pfadpunkt.
            cyclist.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${currentRotation}deg) scaleX(-1)`;

            this.landscapeAnimationId = requestAnimationFrame(animate);
        };
        this.landscapeAnimationId = requestAnimationFrame(animate);
    }

    showRandomSurprise() {
        if (Math.random() < 0.5) {
            const spruch = this.sprueche[Math.floor(Math.random() * this.sprueche.length)];
            this.showSpecialAnimation(spruch);
        } else {
            const frage = this.fragen[Math.floor(Math.random() * this.fragen.length)];
            const antwort = prompt(frage.q);
            if (antwort !== null) {
                // Die beiden Antworten für den Vergleich normalisieren
                const nutzerAntwort = antwort.trim().toLowerCase();
                const richtigeAntwort = frage.a.trim().toLowerCase();
                
                // Fuzzy-Logik anwenden
                const aehnlichkeit = this.calculateStringSimilarity(nutzerAntwort, richtigeAntwort);
                const toleranz = 0.8; // 80% Ähnlichkeit wird als richtig akzeptiert

                if (aehnlichkeit >= toleranz) {
                    this.showSpecialAnimation("Richtig! 🎉");
                } else {
                    this.showSpecialAnimation(`Leider falsch. Richtig ist: ${frage.a}`);
                }
            }
        }
    }
    
    // NEU: Diese Methode komplett hinzufügen
    calculateStringSimilarity(str1, str2) {
        // Levenshtein-Distanz-Algorithmus zur Berechnung der Wortähnlichkeit
        const track = Array(str2.length + 1).fill(null).map(() =>
            Array(str1.length + 1).fill(null));
        for (let i = 0; i <= str1.length; i += 1) {
            track[0][i] = i;
        }
        for (let j = 0; j <= str2.length; j += 1) {
            track[j][0] = j;
        }
        for (let j = 1; j <= str2.length; j += 1) {
            for (let i = 1; i <= str1.length; i += 1) {
                const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
                track[j][i] = Math.min(
                    track[j][i - 1] + 1,      // Deletion
                    track[j - 1][i] + 1,      // Insertion
                    track[j - 1][i - 1] + indicator, // Substitution
                );
            }
        }
        const distance = track[str2.length][str1.length];
        const longer = Math.max(str1.length, str2.length);
        // Gibt einen Ähnlichkeits-Score von 0.0 bis 1.0 zurück
        return (longer - distance) / longer;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new EnhancedDigitalClockGift();
});