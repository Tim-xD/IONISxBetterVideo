const removeElements = (elms) => elms.forEach(el => el.remove());

function onError(error) {
    console.log(`Error: ${error}`);
}

function waitForIFrame(callBack) {
    window.setTimeout(function () {
        let element = document.getElementsByTagName("iframe");
        if (element) {
            callBack(element);
        } else {
            waitForIFrame(callBack);
        }
    }, 100)
}

function changeMediaPlayer(result) {
    let instance = result.instance || "invidious.osi.kr";

    waitForIFrame(function () {
        let iframes = document.getElementsByTagName("iframe");
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
    });

    removeElements(document.querySelectorAll(".video-controls"));
    removeElements(document.querySelectorAll(".spinner"));
}

let getting = browser.storage.local.get("instance");
getting.then(changeMediaPlayer, onError);