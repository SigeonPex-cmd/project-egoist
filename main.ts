let gameActive = false
let timer = 0
let tickingPause = 0
// WORT GESAGT: Knopf A setzt den Timer zurück
input.onButtonPressed(Button.A, function () {
    if (gameActive == true) {
        // Kurzer Bestätigungston für die Weitergabe
        music.playTone(523, music.beat(BeatFraction.Quarter))
        // Der Timer bekommt eine neue geheime Zufallszeit
        timer = randint(10, 30)
        tickingPause = 1000
        basic.showIcon(IconNames.Yes)
        basic.pause(100)
        basic.showIcon(IconNames.Target)
    }
})
// SPIEL STARTEN: Wenn Knopf A und B gleichzeitig gedrückt werden
input.onButtonPressed(Button.AB, function () {
    if (gameActive == false) {
        gameActive = true
        basic.showIcon(IconNames.Target)
        // Setzt die Lautstärke auf das absolute Maximum (255)
        music.setVolume(255)
        // Zufällige Zeit zwischen 10 und 30 Sekunden
        timer = randint(10, 30)
        tickingPause = 1000
    }
})
// HAUPTSCHLEIFE: Überprüft die Zeit im Hintergrund
basic.forever(function () {
    if (gameActive == true) {
        // Kurzes Ticken (ein sehr kurzer, hoher Ton)
        music.playTone(880, music.beat(BeatFraction.Sixteenth))
        // Je weniger Zeit, desto schneller wird das Ticken
        if (timer < 5) {
            tickingPause = 300
            basic.showIcon(IconNames.SmallDiamond)
        } else if (timer < 10) {
            tickingPause = 600
            basic.showIcon(IconNames.Diamond)
        } else {
            tickingPause = 1000
        }
        basic.pause(tickingPause)
        timer += -1
        // BUMM! Zeit abgelaufen
        if (timer <= 0) {
            gameActive = false
            // Sehr lauter, schriller Sirenen-Alarm
            for (let index = 0; index < 6; index++) {
                basic.showIcon(IconNames.Skull)
                // Sehr hoher Ton
                music.playTone(988, music.beat(BeatFraction.Half))
                basic.clearScreen()
                // Tiefer Ton
                music.playTone(220, music.beat(BeatFraction.Half))
            }
            basic.showString("BUMM!")
        }
    }
})
