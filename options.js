const base = "yewtu.be";

function saveOptions(e) {
    e.preventDefault();
    browser.storage.local.set({
        instance: document.querySelector("#instance").value
    });
    browser.runtime.reload();
}

function reset(e) {
    e.preventDefault();
    browser.storage.local.set({
        instance: base
    });
    document.querySelector("#instance").value = base;
    browser.runtime.reload();
}

function restoreOptions() {

    function setCurrentChoice(result) {
        document.querySelector("#instance").value = result.instance ?? base;
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    var getting = browser.storage.local.get("instance");
    getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);

document.querySelector("form").addEventListener("reset", reset);
