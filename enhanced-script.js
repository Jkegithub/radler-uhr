// Erweiterte Digitale Uhr mit Uhrenklängen und Fahrrad-Thema
class EnhancedDigitalClockGift {
    constructor() {
        this.chimeEnabled = true;
        this.lastChimeHour = -1;
        this.audio = document.getElementById('chime-sound');
        this.messageAudio = document.getElementById('birthday-message');
        this.clockFace = document.querySelector('.clock-face');
        this.currentTheme = 'default';
        
        this.initializeElements();
        this.setupEventListeners();
        this.startClock();
        this.setupChimeScheduler();
        this.setupThemes();
        this.showWelcomeMessage();
        this.animateBike(); // <-- HIER AUFRUFEN!
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
        
        // Audio-Lautstärke setzen
        this.audio.volume = 0.5;
        this.messageAudio.volume = 0.5;
    }

    setupEventListeners() {
        // Stundenschlag ein/aus
        this.chimeToggle.addEventListener('click', () => {
            this.toggleChime();
        });

        // Klang testen
        this.testChime.addEventListener('click', () => {
            this.playChime();
        });

        // Persönliche Nachricht abspielen
        this.playMessage.addEventListener('click', () => {
            this.playBirthdayMessage();
        });

        // Lautstärke-Kontrolle
        this.volumeControl.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            this.audio.volume = volume;
            this.messageAudio.volume = volume;
            this.volumeDisplay.textContent = e.target.value + '%';
        });

        // Theme-Auswahl
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.changeTheme(e.target.dataset.theme);
            });
        });

        // Audio-Fehlerbehandlung
        this.audio.addEventListener('error', (e) => {
            console.warn('Audio konnte nicht geladen werden:', e);
            this.showAudioError();
        });

        this.audio.addEventListener('canplaythrough', () => {
            console.log('Audio erfolgreich geladen');
        });

        // Tastaturkürzel
        this.setupKeyboardShortcuts();
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            switch(e.key.toLowerCase()) {
                case 'c': // C für Chime
                    e.preventDefault();
                    this.toggleChime();
                    break;
                case 't': // T für Test
                    e.preventDefault();
                    this.playChime();
                    break;
                case 'm': // M für Message
                    e.preventDefault();
                    this.playBirthdayMessage();
                    break;
                case 'arrowup': // Lautstärke erhöhen
                    e.preventDefault();
                    this.adjustVolume(10);
                    break;
                case 'arrowdown': // Lautstärke verringern
                    e.preventDefault();
                    this.adjustVolume(-10);
                    break;
                case '1':
                case '2':
                case '3':
                case '4':
                    e.preventDefault();
                    const themes = ['default', 'vintage', 'modern', 'nature'];
                    this.changeTheme(themes[parseInt(e.key) - 1]);
                    break;
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
        // Aktualisierung jede Sekunde
        setInterval(() => {
            this.updateClock();
        }, 1000);
    }

    updateClock() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        // Digitale Zeitanzeige
        this.digitalTime.textContent = this.formatTime(hours, minutes, seconds);

        // Analoge Zeiger
        this.updateHands(hours, minutes, seconds);

        // Spezielle Zeiten
        this.checkSpecialTimes(hours, minutes);
    }

    formatTime(hours, minutes, seconds) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    updateHands(hours, minutes, seconds) {
        // Winkel berechnen (360° = 12 Stunden/60 Minuten/60 Sekunden)
        const secondAngle = (seconds * 6) ; // 6° pro Sekunde, -90° für 12-Uhr-Position
        const minuteAngle = (minutes * 6) + (seconds * 0.1) ; // 6° pro Minute + Sekunden-Anteil
        const hourAngle = ((hours % 12) * 30) + (minutes * 0.5) ; // 30° pro Stunde + Minuten-Anteil

        // Zeiger rotieren
        this.secondHand.style.transform = `rotate(${secondAngle}deg)`;
        this.minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
        this.hourHand.style.transform = `rotate(${hourAngle}deg)`;
    }

    checkSpecialTimes(hours, minutes) {
        // Spezielle Animationen zu bestimmten Zeiten
        if (minutes === 0 && hours === 12) {
            // Mittag - besondere Animation
            this.showSpecialAnimation('Mittagszeit! 🌞');
        } else if (minutes === 0 && hours === 0) {
            // Mitternacht
            this.showSpecialAnimation('Mitternacht! 🌙');
        }
    }

    setupChimeScheduler() {
        // Prüfung jede Sekunde für präzises Timing
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

        // Nur zur vollen Stunde schlagen
        if (currentMinute === 0 && currentHour !== this.lastChimeHour) {
            this.lastChimeHour = currentHour;
            this.playChime();
            this.showChimeAnimation();
            
            // Stundenzahl im 24h-Format anzeigen
            this.showTemporaryMessage(`${currentHour} Uhr 🕐`, 4000);
        }
    }

    playChime() {
        const now = new Date();
        let hour = now.getHours();
        if (hour === 0) hour = 24; // Mitternacht = 24 Schläge

        let count = 0;
        const play = () => {
            if (count < hour) {
                if (this.audio.readyState >= 2) {
                    this.audio.currentTime = 0;
                    this.audio.play();
                }
                count++;
                // Nächster Schlag nach Audio-Länge (z.B. 2 Sekunden), ggf. anpassen!
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
                playPromise.then(() => {
                    this.showSpecialAnimation('🎉 Persönliche Nachricht 🎉');
                }).catch(error => {
                    console.warn('Nachricht-Wiedergabe fehlgeschlagen:', error);
                    this.showAudioError();
                });
            }
        } else {
            console.warn('Nachricht-Audio noch nicht bereit');
        }
    }

    showChimeAnimation() {
        this.clockFace.classList.add('chiming');
        setTimeout(() => {
            this.clockFace.classList.remove('chiming');
        }, 2000);
    }

    toggleChime() {
        this.chimeEnabled = !this.chimeEnabled;
        this.chimeToggle.textContent = this.chimeEnabled ? 
            '🔔 Stundenschlag: AN' : 
            '🔕 Stundenschlag: AUS';
        
        if (this.chimeEnabled) {
            this.chimeToggle.classList.remove('disabled');
        } else {
            this.chimeToggle.classList.add('disabled');
        }

        // Feedback-Animation
        this.chimeToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.chimeToggle.style.transform = 'scale(1)';
        }, 150);
    }

    setupThemes() {
        this.themes = {
            default: {
                name: 'Standard',
                colors: {
                    primary: '#2c3e50',
                    secondary: '#3498db',
                    accent: '#2ecc71'
                }
            },
            vintage: {
                name: 'Vintage',
                colors: {
                    primary: '#8b4513',
                    secondary: '#daa520',
                    accent: '#cd853f'
                }
            },
            modern: {
                name: 'Modern',
                colors: {
                    primary: '#2c2c2c',
                    secondary: '#00bcd4',
                    accent: '#ff5722'
                }
            },
            nature: {
                name: 'Natur',
                colors: {
                    primary: '#2d5016',
                    secondary: '#8bc34a',
                    accent: '#4caf50'
                }
            }
        };
    }

    changeTheme(themeName) {
        if (!this.themes[themeName]) return;

        this.currentTheme = themeName;
        const theme = this.themes[themeName];

        // Theme-Button-Status aktualisieren
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.theme === themeName) {
                btn.classList.add('active');
            }
        });

        // CSS-Variablen für Theme setzen
        document.documentElement.style.setProperty('--primary-color', theme.colors.primary);
        document.documentElement.style.setProperty('--secondary-color', theme.colors.secondary);
        document.documentElement.style.setProperty('--accent-color', theme.colors.accent);

        // Feedback
        this.showTemporaryMessage(`Theme: ${theme.name} 🎨`, 1500);
    }

    showSpecialAnimation(message) {
        this.mainContainer.classList.add('celebrating');
        this.showTemporaryMessage(message, 3000);
        
        setTimeout(() => {
            this.mainContainer.classList.remove('celebrating');
        }, 1000);
    }

    showTemporaryMessage(message, duration) {
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, rgba(46, 204, 113, 0.95), rgba(39, 174, 96, 0.95));
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            font-size: 16px;
            font-weight: bold;
            z-index: 1000;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
            animation: slideInOut ${duration}ms ease-in-out;
            backdrop-filter: blur(10px);
        `;
        messageDiv.textContent = message;

        // CSS-Animation hinzufügen
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

        setTimeout(() => {
            messageDiv.remove();
            style.remove();
        }, duration);
    }

    showWelcomeMessage() {
        setTimeout(() => {
            const now = new Date();
            const hour = now.getHours();
            let greeting = '';

            if (hour < 6) {
                greeting = 'Gute Nacht! 🌙';
            } else if (hour < 12) {
                greeting = 'Guten Morgen! ☀️';
            } else if (hour < 18) {
                greeting = 'Guten Tag! 🌞';
            } else {
                greeting = 'Guten Abend! 🌅';
            }

            this.showTemporaryMessage(greeting, 3000);
        }, 1000);

        // Spezielle Geburtstags-/Feiertags-Nachrichten
        setTimeout(() => {
            this.checkSpecialDays();
        }, 4000);
    }

    animateBike() {
        const bike = document.getElementById('bike-decoration');
        const clockFace = document.getElementById('clock-face');
        let angle = 0;

        const animate = () => {
            // Dynamischen Radius JETZT berechnen!
            const rect = clockFace.getBoundingClientRect();
            const radius = rect.width / 2 + 15; // Abstand ggf. anpassen

            const rad = angle * (Math.PI / 180);
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;

            bike.style.transform = `
                translate(-50%, -50%)
                translate(${x}px, ${y}px)
                rotate(${angle + 90}deg)
                scaleX(-1)
            `;

            angle = (angle + 1) % 360;
            requestAnimationFrame(animate);
        };

        animate();
    }
    checkSpecialDays() {
        const now = new Date();
        const month = now.getMonth();
        const day = now.getDate();

        let specialMessage = '';

        if (month === 11 && day === 25) { // Weihnachten
            specialMessage = '🎄 Frohe Weihnachten! 🎄';
        } else if (month === 0 && day === 1) { // Neujahr
            specialMessage = '🎊 Frohes neues Jahr! 🎊';
        } else if (month === 9 && day === 3) { // Tag der deutschen Einheit
            specialMessage = '🇩🇪 Tag der deutschen Einheit! 🇩🇪';
        } else if (month === 4 && day === 1) { // Tag der Arbeit
            specialMessage = '🌹 Tag der Arbeit! 🌹';
        }

        if (specialMessage) {
            this.showTemporaryMessage(specialMessage, 5000);
        }
    }

    showAudioError() {
        const errorMsg = document.createElement('div');
        errorMsg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #e74c3c;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 1000;
            font-size: 14px;
        `;
        errorMsg.textContent = 'Audio konnte nicht geladen werden. Bitte Seite neu laden.';
        document.body.appendChild(errorMsg);
        
        setTimeout(() => {
            errorMsg.remove();
        }, 5000);
    }
}

// Initialisierung wenn die Seite geladen ist
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚴‍♂️ Erweiterte Digitale Radler-Uhr wird initialisiert... 🕰️');
    
    // Hauptuhr initialisieren
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

