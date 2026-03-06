import {encodeURIAggressive, encodeURINonDestructive, decodeURINonDestructive} from "./encoders/url.js";
import {encodeMorse, decodeMorse} from "./encoders/morse.js";

const mode = document.getElementById("mode");
const encode = document.getElementById("encode");
const decode = document.getElementById("decode");
const livemode = document.getElementById("livemode");
const input = document.getElementById("inputText");
const output = document.getElementById("outputText");

const codes = {
    "Base64": {
        encode: text => btoa(text),
        decode: text => atob(text)
    },
    "Base16 (Hexadecimal)": {
        encode: text => text.split("").map(c => c.charCodeAt(0).toString(16).padStart(2, "0")).join("").toUpperCase(),
        decode: text => text.split(/(\w\w)/g).filter(p => !!p).map(c => String.fromCharCode(parseInt(c, 16))).join("")
    },
    "Base10 (Decimal)": {
        encode: text => text.split("").map(c => c.charCodeAt(0).toString(10).padStart(3, "0")).join(" ").toUpperCase(),
        decode: text => text.split(" ").filter(p => !!p).map(c => String.fromCharCode(parseInt(c, 10))).join("")
    },
    "Base8 (Octal)": {
        encode: text => text.split("").map(c => c.charCodeAt(0).toString(8).padStart(3, "0")).join(" ").toUpperCase(),
        decode: text => text.split(" ").filter(p => !!p).map(c => String.fromCharCode(parseInt(c, 8))).join("")
    },
    "Base2 (Binary)": {
        encode: text => text.split("").map(c => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" "),
        decode: text => text.split(" ").filter(p => !!p).map(c => String.fromCharCode(parseInt(c, 2))).join("")
    },
    "Morse": {
        encode: encodeMorse,
        decode: decodeMorse
    },
    "URL": {
        encode: encodeURI,
        decode: decodeURI
    },
    "URL (Component)": {
        encode: encodeURIComponent,
        decode: decodeURIComponent
    },
    "URL (Aggressive)": {
        encode: encodeURIAggressive,
        decode: text => decodeURIComponent(decodeURI(decodeURIComponent(text).replaceAll("%", "&percnt;"))).replaceAll("&percnt;", "%")
    },
    "URL (Aggressive, non destructive)": {
        encode: encodeURINonDestructive,
        decode: decodeURINonDestructive
    },
}

for (const code in codes) {
    let element = document.createElement("option");
    element.value = code;
    element.innerText = code;
    mode.appendChild(element);
}
encode.addEventListener("click", () => {
    output.value = codes[mode.value].encode(input.value);
});
decode.addEventListener("click", () => {
    input.value = codes[mode.value].decode(output.value);
});
input.addEventListener("input", () => {
    if (livemode.checked) {
        output.value = codes[mode.value].encode(input.value);
    }
});
output.addEventListener("input", () => {
    if (livemode.checked) {
        input.value = codes[mode.value].decode(output.value);
    }
});