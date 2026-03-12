function safe(s) {
    return encodeURI(s)
        .replaceAll("/", document.getElementById("slash").value)
        .replaceAll("?", document.getElementById("question").value)
}

 document.getElementById("concat").addEventListener("click", () => {
    let target = document.getElementById("target").value;  
    const protocolMatch = target.match(/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//);
    const protocol = protocolMatch ? protocolMatch[0] : "https://";

    target = protocolMatch
        ? target.slice(protocol.length)
        : target;

    const concatenated =
        protocol + safe(document.getElementById("domain").value + "/")
        + safe(document.getElementById("directory").value + "?")
        + safe(document.getElementById("params").value) + "&churl=@"
        + encodeURI(target).replaceAll(".", "%2E").replaceAll("?", "%3F");
    
    document.getElementById("result").value = concatenated;
});