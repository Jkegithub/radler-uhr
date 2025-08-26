// Erweiterte Digitale Uhr mit Uhrenklängen und Fahrrad-Thema
class EnhancedDigitalClockGift {
    constructor() {
        this.initializeProperties();
        this.initializeElements();
        this.loadSettings();
        this.setupEventListeners();
        this.startClock();
        this.setupChimeScheduler();
        this.animateBike();
    }

    initializeProperties() {
        this.testTime = null; 
        // Für Echtzeit. Zum Testen mit Hochkomma: '23:59:50'
        // this.testTime = '23:59:50'; 

        this.realTimeStart = null;  // NEU
        this.fakeTimeStart = null;  // NEU
        this.lastChimeHour = -1;
        this.chimeEnabled = true; // Standardwert, wird von loadSettings überschrieben
        this.landscapeInterval = null;

        // Sprüche und Fragen nur einmal definieren
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

    getNow() {
        if (this.testTime) {
            // Wenn der Testmodus zum ersten Mal gestartet wird, setzen wir die Startpunkte
            if (!this.realTimeStart) {
                this.realTimeStart = new Date(); // Echte Startzeit merken
                
                const parts = this.testTime.split(':');
                const fakeNow = new Date();
                fakeNow.setHours(parseInt(parts[0], 10), parseInt(parts[1], 10), parseInt(parts[2], 10));
                this.fakeTimeStart = fakeNow; // Simulierte Startzeit merken
            }
            
            // Berechne die seit dem Teststart vergangene echte Zeit
            const realElapsedTime = new Date() - this.realTimeStart;
            
            // Addiere die vergangene Zeit zur simulierten Startzeit hinzu
            return new Date(this.fakeTimeStart.getTime() + realElapsedTime);
        }
        
        // Wenn kein Testmodus aktiv ist, gib die normale Zeit zurück
        return new Date();
    }

    initializeElements() {
        this.hourHand = document.getElementById('hour-hand');
        this.minuteHand = document.getElementById('minute-hand');
        this.secondHand = document.getElementById('second-hand');
        this.digitalTime = document.getElementById('digital-time');
        this.chimeToggle = document.getElementById('chime-toggle');
        this.testChime = document.getElementById('test-chime');
        this.playMessage = document.getElementById('play-message');
        this.volumeControl = document.getElementById('volume');
        this.volumeDisplay = document.getElementById('volume-display');
        this.clockFace = document.querySelector('.clock-face');
        this.chimeAudio = document.getElementById('chime-sound');
        this.messageAudio = document.getElementById('birthday-message');
        this.journeyFrame = document.getElementById('journey-frame');
        this.midnightAudio = document.getElementById('midnight-sound');
    }
    
    loadSettings() {
        const savedVolume = localStorage.getItem('clockVolume');
        const volume = savedVolume ? parseInt(savedVolume, 10) : 50;
        this.volumeControl.value = volume;
        this.setVolume(volume);
        
        const savedChime = localStorage.getItem('chimeEnabled');
        this.chimeEnabled = savedChime !== 'false';
        this.updateChimeButton();
    }
    
    setVolume(value) {
        const volumeLevel = value / 100;
        this.chimeAudio.volume = volumeLevel;
        this.messageAudio.volume = volumeLevel;
        this.midnightAudio.volume = volumeLevel;
        this.volumeDisplay.textContent = `${value}%`;
        localStorage.setItem('clockVolume', value);
    }

    setupEventListeners() {
        this.chimeToggle.addEventListener('click', () => this.toggleChime());
        this.testChime.addEventListener('click', () => this.playChime());
        this.playMessage.addEventListener('click', () => this.playBirthdayMessage());
        this.volumeControl.addEventListener('input', (e) => this.setVolume(e.target.value));

        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.changeView(e.target.dataset.view));
        });
        
        document.getElementById('close-journey').addEventListener('click', () => {
            this.journeyFrame.src = 'about:blank'; // Stoppt Audio/Video im iFrame
            this.changeView('standard');
        });
        
        this.setupKeyboardShortcuts();
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            switch(e.key.toLowerCase()) {
                case 'c': this.toggleChime(); break;
                case 't': this.playChime(); break;
                case 'm': this.playBirthdayMessage(); break;
                case 'arrowup': this.adjustVolume(10); break;
                case 'arrowdown': this.adjustVolume(-10); break;
                case '1': this.changeView('standard'); break;
                case '2': this.changeView('landscape'); break;
                case '3': this.changeView('journey'); break;
                case '4': this.changeView('fun'); break;
            }
        });
    }

    // Diese zwei neuen Methoden komplett zur Klasse hinzufügen

playMidnightSound() {
    if (this.midnightAudio.readyState >= 2) { // Prüft, ob der Sound geladen ist
        this.midnightAudio.currentTime = 0;
        this.midnightAudio.play().catch(e => console.error("Midnight sound error:", e));
    }
}

checkSpecialTimes(hours, minutes, seconds) {
    // Prüfung für Mitternacht
    if (hours === 0 && minutes === 0 && seconds === 0) {
        this.showSpecialAnimation('🌙 Mitternacht! 🌙');
        this.playMidnightSound();
    }

    // (Optional) Prüfung für Mittag
    if (hours === 12 && minutes === 0 && seconds === 0) {
        this.showSpecialAnimation('☀️ Mittag! ☀️');
    }
}
    adjustVolume(change) {
        const currentVolume = parseInt(this.volumeControl.value, 10);
        const newVolume = Math.max(0, Math.min(100, currentVolume + change));
        this.volumeControl.value = newVolume;
        this.setVolume(newVolume);
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

        this.digitalTime.textContent = `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
        
        const secondAngle = seconds * 6;
        const minuteAngle = minutes * 6 + seconds * 0.1;
        const hourAngle = (hours % 12) * 30 + minutes * 0.5;

        this.secondHand.style.transform = `rotate(${secondAngle}deg)`;
        this.minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
        this.hourHand.style.transform = `rotate(${hourAngle}deg)`;
        // HIER DIE NEUE ZEILE EINFÜGEN:
        this.checkSpecialTimes(hours, minutes, seconds);
    }
    
    setupChimeScheduler() {
        setInterval(() => {
            const now = this.getNow();
            if (this.chimeEnabled && now.getMinutes() === 0 && now.getSeconds() === 0 && now.getHours() !== this.lastChimeHour) {
                this.lastChimeHour = now.getHours();
                this.playChime();
                this.showChimeAnimation();
            } else if (now.getMinutes() !== 0) {
                this.lastChimeHour = -1;
            }
        }, 1000);
    }

    playChime() {
        const hour = this.getNow().getHours();
        const chimeCount = hour % 12 === 0 ? 12 : hour % 12;
        let count = 0;
        const play = () => {
            if (count < chimeCount) {
                this.chimeAudio.currentTime = 0;
                this.chimeAudio.play().catch(e => console.error("Audio Playback Error:", e));
                count++;
                setTimeout(play, 1500);
            }
        };
        play();
    }

    playBirthdayMessage() {
        this.messageAudio.currentTime = 0;
        this.messageAudio.play().catch(e => console.error("Audio Playback Error:", e));
    }

    showChimeAnimation() {
        this.clockFace.classList.add('chiming');
        setTimeout(() => this.clockFace.classList.remove('chiming'), 2000);
    }

    toggleChime() {
        this.chimeEnabled = !this.chimeEnabled;
        localStorage.setItem('chimeEnabled', this.chimeEnabled);
        this.updateChimeButton();
    }
    
    updateChimeButton() {
        this.chimeToggle.textContent = this.chimeEnabled ? '🔔 Stundenschlag: AN' : '🔕 Stundenschlag: AUS';
        this.chimeToggle.classList.toggle('disabled', !this.chimeEnabled);
    }

    showSpecialAnimation(message, duration = 7000) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed; top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(46,204,113,0.95), rgba(39,174,96,0.95));
            color: white; padding: 30px 50px; border-radius: 25px;
            font-size: 26px; font-weight: bold; z-index: 6000; text-align: center;
            max-width: 80%; animation: fadeInOut ${duration / 1000}s ease-in-out;
        `;
        overlay.textContent = message;
        document.body.appendChild(overlay);
        setTimeout(() => overlay.remove(), duration);
    }

    animateBike() {
        const bike = document.getElementById('bike-decoration');
        const clockFace = document.getElementById('clock-face');
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

        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === viewName);
        });

        switch (viewName) {
            case 'standard':
                document.getElementById('main-container').style.display = 'block';
                break;
            case 'landscape':
                document.getElementById('landscape-container').style.display = 'block';
                this.startLandscapeSlideshow();
                break;
            case 'journey':
                const journeyContainer = document.getElementById('journey-container');
                journeyContainer.style.display = 'block';
                this.journeyFrame.src = "https://jkegithub.github.io/Klangreise_Radler/";
                break;
            case 'fun':
                this.showRandomSurprise();
                document.getElementById('main-container').style.display = 'block';
                document.querySelector('.view-btn[data-view="standard"]').classList.add('active');
                document.querySelector('.view-btn[data-view="fun"]').classList.remove('active');
                break;
        }
    }

    startLandscapeSlideshow() {
        if (this.landscapeInterval) return;
        const container = document.getElementById('landscape-slideshow');
        const images = ['landscape1.jpg', 'landscape2.jpg', 'landscape3.jpg', 'landscape4.jpg'];
        let currentIndex = 0;
        const showNextImage = () => {
            currentIndex = (currentIndex + 1) % images.length;
            container.style.backgroundImage = `url(${images[currentIndex]})`;
        };
        container.style.backgroundImage = `url(${images[0]})`;
        this.landscapeInterval = setInterval(showNextImage, 8000);
    }
  
    showRandomSurprise() {
        if (Math.random() < 0.5) {
            const spruch = this.sprueche[Math.floor(Math.random() * this.sprueche.length)];
            this.showSpecialAnimation(spruch);
        } else {
            const frage = this.fragen[Math.floor(Math.random() * this.fragen.length)];
            const antwort = prompt(frage.q);
            if (antwort !== null) {
                if (antwort.trim().toLowerCase() === frage.a.toLowerCase()) {
                    this.showSpecialAnimation("Richtig! 🎉");
                } else {
                    this.showSpecialAnimation(`Leider falsch. Richtig ist: ${frage.a}`);
                }
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new EnhancedDigitalClockGift();
});