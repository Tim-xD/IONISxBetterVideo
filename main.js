const removeElements = (elms) => elms.forEach(el => el.remove());

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

let n = document.getElementsByTagName("iframe").length
for (let i = 0; i < n; i++) {
    waitForIFrame(i, function () {
        try {
            let el = document.getElementsByTagName("iframe")[i];

            let video = el.src;

            let indivious = video.substring(0, video.indexOf('?')).replace("www.youtube.com", "invidious.osi.kr");
            el.src = indivious;

            let size = document.getElementsByClassName("video-player")[i].scrollWidth;
            el.width = size;
            el.height = size / 16 * 9;

            removeElements(document.querySelectorAll(".video-controls"));
            removeElements(document.querySelectorAll(".spinner"));
        } catch {
            console.log("no ionisx video");
        }
    });
}
