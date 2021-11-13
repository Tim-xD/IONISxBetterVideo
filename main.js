const removeElements = (elms) => elms.forEach(el => el.remove());

function onError(error) {
    console.log(`Error: ${error}`);
}

function changeMediaPlayer(instance, iframes) {    
    for (let el of iframes) {
        try {
            let video = el.src;

            if (video.includes("www.youtube.com")) {
                let newvideo = video.substring(0, video.indexOf('?')).replace("www.youtube.com", instance) || video.replace("www.youtube.com", instance);
                el.src = newvideo;

                let size = el.scrollWidth;
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
        let elements = document.getElementsByTagName("iframe");

        if (elements.length != 0) {
            changeMediaPlayer(instance, elements)
        } else if (n <= 3) {
            waitForIFrame(n + 1, instance);
        }
    }, 250)
}

function getInstance(result) {
    let instance = result.instance || "invidio.xamh.de";
    waitForIFrame(0, instance);
}

let getting = browser.storage.local.get("instance");
getting.then(getInstance, onError);