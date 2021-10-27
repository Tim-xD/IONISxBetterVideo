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

            let indivious = video.substring(0, video.indexOf('?')).replace("www.youtube.com", "invidious.kavin.rocks");
            el.src = indivious;

            /* let height = el.scrollHeight;
            let width = el.scrollWidth;
            el.style = "height: " + height + "px; width:" + width + "px;"; */

            removeElements(document.querySelectorAll(".video-controls"));
            removeElements(document.querySelectorAll(".spinner"));
        } catch {
            console.log("no ionisx video");
        }
    });
}