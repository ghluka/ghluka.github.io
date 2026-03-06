var morse = {".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.", "/": "-..-.", "(": "-.--.", ")": "-.--.-", "&": ".-...", ":": "---...", ";": "-.-.-.", "=": "-...-", "+": ".-.-.", "-": "-....-", "_": "..--.-", "\"": ".-..-.", "$": "...-..-", "!": "-.-.--", "@": ".--.-.", " ": "/", "a": ".-", "b": "-...", "c": "-.-.", "d": "-..", "e": ".", "f": "..-.", "g": "--.", "h": "....", "i": "..", "j": ".---", "k": "-.-", "l": ".-..", "m": "--", "n": "-.", "o": "---", "p": ".--.", "q": "--.-", "r": ".-.", "s": "...", "t": "-", "u": "..-", "v": "...-", "w": ".--", "x": "-..-", "y": "-.--", "z": "--..", "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.", "0": "-----"};

function encodeMorse(text) {
    text = text.toLowerCase();
    var encoded_text = ""

    for (const character of text.split("")) {
        for (const [key, value] of Object.entries(morse)) {
            if (character == key) { 
                encoded_text += value + " ";
            }
        }
    }

    encoded_text = encoded_text.substring(0, encoded_text.length - 1);

    return encoded_text;
}

function decodeMorse(code) {
    var text = ""

    for (const sequence of code.split(" ")) {
        for (const [key, value] of Object.entries(morse)) {
            if (sequence == value) { 
                text += key;
            }
        }
    }

    return text;
}

export {encodeMorse, decodeMorse}