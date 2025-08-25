// Erweiterte Digitale Uhr mit Uhrenklängen und Fahrrad-Thema
class EnhancedDigitalClockGift {
    constructor() {
        this.chimeEnabled = true;
        this.lastChimeHour = -1;
        this.audio = document.getElementById('chime-sound');
        this.messageAudio = document.getElementById('birthday-message');
        this.clockFace = document.querySelector('.clock-face');
        this.currentView = 'standard';

        this.initializeElements();
        this.setupEventListeners();
        this.startClock();
        this.setupChimeScheduler();
        this.showWelcomeMessage();
        this.animateBike();
        this.setupViews();
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
        this.mainContainer = document.getElementById('main-container');

        this.audio.volume = 0.5;
        this.messageAudio.volume = 0.5;
    }

    setupEventListeners() {
        this.chimeToggle.addEventListener('click', () => this.toggleChime());
        this.testChime.addEventListener('click', () => this.playChime());
        this.playMessage.addEventListener('click', () => this.playBirthdayMessage());

        this.volumeControl.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            this.audio.volume = volume;
            this.messageAudio.volume = volume;
            this.volumeDisplay.textContent = e.target.value + '%';
        });

        this.audio.addEventListener('error', (e) => this.showAudioError());
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

    adjustVolume(change) {
        const currentVolume = parseInt(this.volumeControl.value);
        const newVolume = Math.max(0, Math.min(100, currentVolume + change));
        this.volumeControl.value = newVolume;
        this.volumeControl.dispatchEvent(new Event('input'));
    }

    startClock() {
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
    }

    updateClock() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        this.digitalTime.textContent = this.formatTime(hours, minutes, seconds);
        this.updateHands(hours, minutes, seconds);
        this.checkSpecialTimes(hours, minutes, seconds);
    }

    formatTime(hours, minutes, seconds) {
        return `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
    }

    updateHands(hours, minutes, seconds) {
        const secondAngle = (seconds * 6);
        const minuteAngle = (minutes * 6) + (seconds * 0.1);
        const hourAngle = ((hours % 12) * 30) + (minutes * 0.5);

        this.secondHand.style.transform = `rotate(${secondAngle}deg)`;
        this.minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
        this.hourHand.style.transform = `rotate(${hourAngle}deg)`;
    }

    checkSpecialTimes(hours, minutes, seconds) {
        if (seconds === 0 && minutes === 0 && hours === 12) {
            this.showSpecialAnimation('Mittagszeit! 🌞');
        } else if (seconds === 0 && minutes === 0 && hours === 0) {
            this.showSpecialAnimation('Mitternacht! 🌙');
        }
    }

    setupChimeScheduler() {
        setInterval(() => {
            const now = new Date();
            if (now.getMinutes() === 0 && now.getSeconds() === 0) {
                this.checkForChime();
            }
        }, 1000);
    }

    checkForChime() {
        if (!this.chimeEnabled) return;

        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        if (currentHour === this.lastChimeHour) return;

        if (currentMinute === 0) {
            this.lastChimeHour = currentHour;
            this.playChime();
            this.showChimeAnimation();
            this.showHourChimeMessage(currentHour);
        }
    }

    playChime() {
        const now = new Date();
        let hour = now.getHours();
        if (hour === 0) hour = 24;

        let count = 0;
        const play = () => {
            if (count < hour) {
                if (this.audio.readyState >= 2) {
                    this.audio.currentTime = 0;
                    this.audio.play();
                }
                count++;
                setTimeout(play, 2000);
            }
        };
        play();
    }

    playBirthdayMessage() {
        if (this.messageAudio.readyState >= 2) {
            this.messageAudio.currentTime = 0;
            const playPromise = this.messageAudio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => this.showSpecialAnimation('🎉 Persönliche Nachricht 🎉'));
            }
        }
    }

    showChimeAnimation() {
        this.clockFace.classList.add('chiming');
        setTimeout(() => this.clockFace.classList.remove('chiming'), 2000);
    }

    toggleChime() {
        this.chimeEnabled = !this.chimeEnabled;
        this.chimeToggle.textContent = this.chimeEnabled ? '🔔 Stundenschlag: AN' : '🔕 Stundenschlag: AUS';
        this.chimeToggle.classList.toggle('disabled', !this.chimeEnabled);
    }

    showHourChimeMessage(hour) {
        const msg = document.createElement('div');
        msg.textContent = `${hour === 0 ? 24 : hour} Schläge zur vollen Stunde 🙂`;
        msg.style.cssText = `
            position: absolute;
            top: -40px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 1.2em;
            font-weight: bold;
            color: var(--accent-color, #2ecc71);
            animation: slideDown 3s ease forwards;
            white-space: nowrap;
        `;
        this.clockFace.appendChild(msg);

        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideDown {
                0% { opacity: 0; transform: translate(-50%, -50px); }
                20% { opacity: 1; transform: translate(-50%, 0); }
                80% { opacity: 1; transform: translate(-50%, 0); }
                100% { opacity: 0; transform: translate(-50%, -50px); }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => { msg.remove(); style.remove(); }, 3000);
    }

    showSpecialAnimation(message) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(46,204,113,0.95), rgba(39,174,96,0.95));
            color: white;
            padding: 30px 50px;
            border-radius: 25px;
            font-size: 26px;       /* schön groß */
            font-weight: bold;
            z-index: 2000;
            text-align: center;
            max-width: 80%;
            animation: fadeInOut 4s ease-in-out;
        `;
        overlay.textContent = message;
    
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -60%); }
                10% { opacity: 1; transform: translate(-50%, -50%); }
                90% { opacity: 1; transform: translate(-50%, -50%); }
                100% { opacity: 0; transform: translate(-50%, -40%); }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(overlay);
    
        setTimeout(() => {
            overlay.remove();
            style.remove();
        }, 4000);
    }
    

    showTemporaryMessage(message, duration) {
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, rgba(46,204,113,0.95), rgba(39,174,96,0.95));
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            font-size: 16px;
            font-weight: bold;
            z-index: 1000;
            animation: slideInOut ${duration}ms ease-in-out;
        `;
        messageDiv.textContent = message;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInOut {
                0% { opacity: 0; transform: translateX(100%); }
                10% { opacity: 1; transform: translateX(0); }
                90% { opacity: 1; transform: translateX(0); }
                100% { opacity: 0; transform: translateX(100%); }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(messageDiv);
        setTimeout(() => { messageDiv.remove(); style.remove(); }, duration);
    }

    showWelcomeMessage() {
        setTimeout(() => {
            const hour = new Date().getHours();
            let greeting = hour < 6 ? 'Gute Nacht! 🌙' : hour < 12 ? 'Guten Morgen! ☀️' : hour < 18 ? 'Guten Tag! 🌞' : 'Guten Abend! 🌅';
            this.showTemporaryMessage(greeting, 3000);
        }, 1000);
    }

    animateBike() {
        const bike = document.getElementById('bike-decoration');
        const clockFace = document.getElementById('clock-face');
        let angle = 0;

        const animate = () => {
            const rect = clockFace.getBoundingClientRect();
            const radius = rect.width / 2 + 30;
            const rad = angle * (Math.PI / 180);
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;

            bike.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle + 90}deg) scaleX(-1)`;
            angle = (angle + 1) % 360;
            requestAnimationFrame(animate);
        };
        animate();
    }

    showAudioError() {
        const errorMsg = document.createElement('div');
        errorMsg.style.cssText = `position: fixed; top:20px; right:20px; background:#e74c3c; color:white; padding:10px 20px; border-radius:5px; z-index:1000; font-size:14px;`;
        errorMsg.textContent = 'Audio konnte nicht geladen werden. Bitte Seite neu laden.';
        document.body.appendChild(errorMsg);
        setTimeout(() => errorMsg.remove(), 5000);
    }

    setupViews() {
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.changeView(e.target.dataset.view));
        });
    }

    changeView(viewName) {
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.view === viewName) btn.classList.add('active');
    });

    document.getElementById('main-container').style.display = 'none';
    document.getElementById('journey-container').style.display = 'none';
    document.getElementById('landscape-container').style.display = 'none';

    switch(viewName) {
        case 'standard':
            document.getElementById('main-container').style.display = 'block';
            this.showTemporaryMessage("Standard Radler-Uhr 🚴", 2000);
            break;
        case 'landscape':
            document.getElementById('landscape-container').style.display = 'block';
            this.startLandscapeSlideshow();
            this.showTemporaryMessage("Landschaftsansicht 🌄", 2000);
            break;
        case 'journey':
            document.getElementById('journey-container').style.display = 'block';
            document.getElementById('journey-frame').src = "https://jkegithub.github.io/Klangreise_Radler/";
            this.showTemporaryMessage("Klangreise 🎶", 2000);
            break;
        case 'fun':
            this.showRandomSurprise();
            break;
        }
    }

    startLandscapeSlideshow() {
        const container = document.getElementById('landscape-slideshow');
        const images = [
            'landscape1.jpg','landscape2.jpg','landscape3.jpg','landscape4.jpg'
        ];
        let index = 0;

        const showImage = () => {
            container.style.background = `url(${images[index]}) center/cover no-repeat`;
            container.style.transition = 'background 2s ease-in-out';
            index = (index + 1) % images.length;
        };
        showImage();
        clearInterval(this.landscapeInterval);
        this.landscapeInterval = setInterval(showImage, 8000);
    }
  
    showRandomSurprise() {
        const sprueche = [
                "Wer sein Rad liebt, schiebt 🚲",
                "Ein Leben ohne Rad ist möglich, aber sinnlos 😅",
                "Radfahren = Glück auf 2 Rädern ✨"
        ];
        const fragen = [
            {q: "Wie viele Speichen hat ein Standardfahrrad-Rad?", a: "36"},
            {q: "Welches Land erfand das moderne Fahrrad?", a: "Deutschland"},
            {q: "Wie nennt man ein Fahrrad mit nur einem Gang?", a: "Singlespeed"}
        ];
        if (Math.random() < 0.5) {
            const zufall = sprueche[Math.floor(Math.random()*sprueche.length)];
            this.showSpecialAnimation(zufall);
        } else {
            const zufall = fragen[Math.floor(Math.random()*fragen.length)];
            const antwort = prompt(zufall.q);
            if (antwort !== null) {
                if (antwort.trim().toLowerCase() === zufall.a.toLowerCase()) {
                    this.showSpecialAnimation("Richtig! 🎉");
                } else {
                    this.showSpecialAnimation(`Richtige Antwort: ${zufall.a}`);
                }
            }
        }
    }

    showRandomFunFact() {
        const sprueche = [
            "Wer sein Rad liebt, schiebt 🚲",
            "Ein Leben ohne Rad ist möglich, aber sinnlos 😅",
            "Radfahren = Glück auf 2 Rädern ✨",
            "In die Pedale treten statt in die Tasten! 💻➡️🚴"
        ];
        const zufall = sprueche[Math.floor(Math.random() * sprueche.length)];
        this.showSpecialAnimation(zufall);
    }

    showQuizQuestion() {
        const fragen = [
            {q: "Wie viele Speichen hat ein Standardfahrrad-Rad?", a: "36"},
            {q: "Welches Land erfand das moderne Fahrrad?", a: "Deutschland"},
            {q: "Wie nennt man ein Fahrrad mit nur einem Gang?", a: "Singlespeed"}
        ];
        const zufall = fragen[Math.floor(Math.random() * fragen.length)];
        const antwort = prompt(zufall.q);
        if (antwort !== null) {
            if (antwort.trim().toLowerCase() === zufall.a.toLowerCase()) {
                this.showSpecialAnimation("Richtig! 🎉");
            } else {
                this.showSpecialAnimation(`Falsch 😅 Richtige Antwort: ${zufall.a}`);
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const clock = new EnhancedDigitalClockGift();
    console.log('✅ Erweiterte Uhr erfolgreich gestartet!');
    
    // Willkommensnachricht in der Konsole
    console.log(`
    🎉 Herzlich willkommen zur erweiterten digitalen Radler-Uhr! 🎉
    
    Tastaturkürzel:
    - C: Stundenschlag ein/aus
    - T: Klang testen
    - M: Persönliche Nachricht
    - ↑/↓: Lautstärke anpassen
    - 1-4: Theme wechseln
    
    Features:
    - Automatischer Stundenschlag
    - Verschiedene Farbthemen
    - Persönliche Sprachnachricht
    - Animierte Uhr mit Fahrrad-Dekoration
    - Wunderschöne Landschafts-Hintergründe
    
    Viel Freude mit deinem besonderen Geschenk! 🚴‍♂️🕰️
    `);
});

