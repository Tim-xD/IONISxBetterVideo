const filter = {
    urls: [
        "*://www.youtube.com/*"
    ],
};
const webRequestFlags = [
    "blocking",
];

function onError(error) {
    console.log(`Error: ${error}`);
}

function blockRequest(result) {
    function blockYt(page) {
        const instance = result.instance || "invidious.osi.kr";
        return { cancel: page.originUrl.includes("courses.ionisx.com") && !instance.includes("www.youtube.com") };
    }

    browser.webRequest.onBeforeRequest.addListener(page => { return blockYt(page) },
        filter,
        webRequestFlags);
};

let getting = browser.storage.local.get("instance");
getting.then(blockRequest, onError);