function safe(s) {
    return encodeURI(s)
        .replaceAll("/", document.getElementById("slash").value)
        .replaceAll("?", document.getElementById("question").value)
}

 document.getElementById("concat").addEventListener("click", () => {
    const concatenated =
        "https://" + safe(document.getElementById("domain").value + "/")
        + safe(document.getElementById("directory").value + "?")
        + safe(document.getElementById("params").value) + ":&churl=@"
        + encodeURI(document.getElementById("target").value).replaceAll(".", "%2E").replaceAll("?", "%3F");
    
    document.getElementById("result").value = concatenated;
});