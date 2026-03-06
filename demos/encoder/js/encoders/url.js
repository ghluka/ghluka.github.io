function encodeURIAggressive(text) {
    var encoded_text = "";

    const characters = encodeURI(text).split(/(%\w\w)/g).filter(t => t !== "");
    for (const c of characters) {
        if (c.startsWith("%")) {
            encoded_text += c;
        }
        else {
            encoded_text += "%" + c.split("").map(t => t.charCodeAt(0).toString(16).padStart(2, "0")).join("%").toUpperCase();
        }
    }

    return encoded_text;
}

var safe_keys = {"!": "%21", "#": "%23", "$": "%24", "%": "%25", "&": "%26", "'": "%27", "(": "%28", ")": "%29", "*": "%2A", "+": "%2B", ",": "%2C", "-": "%2D", ".": "%2E", "/": "%2F", "=": "%3D", ":": "%3A", ";": "%3B", "=": "%3D", "?": "%3F", "@": "%40"};

function encodeURINonDestructive(text) {
    var encoded_text = encodeURIAggressive(text);

    // protocol
    if (encoded_text.includes("%3A%2F%2F")) {
        encoded_text = encoded_text.replace("%3A%2F%2F", "://");
        const protocol = decodeURI(encoded_text.split("://")[0])
        encoded_text = protocol + "://" + encoded_text.split("://")[1];
    }
    
    for (const [key, value] of Object.entries(safe_keys)) {
        encoded_text = encoded_text.replaceAll(value, key);
    }

    return encoded_text;
}

function decodeURINonDestructive(text) {
    // protocol
    if (text.includes("://")) {
        const protocol = encodeURIAggressive(text.split("://")[0]);
        text = protocol + "%3A%2F%2F" + text.split("://")[1];
    }
    
    for (const [key, value] of Object.entries(safe_keys)) {
        text = text.replaceAll(key, value);
    }

    return decodeURIComponent(decodeURI(text));
}

export {encodeURIAggressive, encodeURINonDestructive, decodeURINonDestructive}