const base = "yewtu.be";

const removeElements = (elms) => elms.forEach(el => el.remove());

function onError(error) {
    console.log(`Error: ${error}`);
}

function changeMediaPlayer(instance, iframes) {    
    for (let el of iframes) {
        try {
            const video = el.src;

            if (video.includes("www.youtube.com")) {
                const newvideo = video.substring(0, video.indexOf('?')).replace("www.youtube.com", instance) || video.replace("www.youtube.com", instance);
                el.src = newvideo;

                const size = el.scrollWidth;
                el.width = size;
                el.height = size / 16 * 9;
            }
        } catch (e) {
            logErreurs(e);
        }
    }

    removeElements(document.querySelectorAll(".video-controls"));
    removeElements(document.querySelectorAll(".spinner"));
}

function waitForIFrame(n, instance) {
    window.setTimeout(function () {
        const elements = document.getElementsByTagName("iframe");

        if (elements.length != 0) {
            changeMediaPlayer(instance, elements)
        } else if (n <= 4) {
            waitForIFrame(n + 1, instance);
        }
    }, 250)
}

function getInstance(result) {
    const instance = result.instance ?? base;
    waitForIFrame(0, instance);
}

window.addEventListener('load', function () {
    const getting = browser.storage.local.get("instance");
    getting.then(getInstance, onError);
  })