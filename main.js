const removeElements = (elms) => elms.forEach(el => el.remove());

function onError(error) {
    console.log(`Error: ${error}`);
}

function waitForIFrame(i, callBack) {
    window.setTimeout(function () {
        let element = document.getElementsByTagName("iframe")[i];
        if (element) {
            callBack(i, element);
        } else {
            waitForIFrame(i, callBack);
        }
    }, 100)
}

function changeMediaPlayer(result) {
    let instance = result.instance || "invidious.osi.kr";

    let n = document.getElementsByTagName("iframe").length
    for (let i = 0; i < n; i++) {
        waitForIFrame(i, function () {
            try {
                let el = document.getElementsByTagName("iframe")[i];

                let video = el.src;
                console.log(video)
                if (video.includes("www.youtube.com")) {
                    let newvideo = video.substring(0, video.indexOf('?')).replace("www.youtube.com", instance);
                    el.src = newvideo;
                    console.log(newvideo)
                    let size = document.getElementsByClassName("video-player")[i].scrollWidth;
                    el.width = size;
                    el.height = size / 16 * 9;

                    removeElements(document.querySelectorAll(".video-controls"));
                    removeElements(document.querySelectorAll(".spinner"));
                }
            } catch (e) {
                logErreurs(e);
            }
        });
    }
}

var getting = browser.storage.local.get("instance");
getting.then(changeMediaPlayer, onError);