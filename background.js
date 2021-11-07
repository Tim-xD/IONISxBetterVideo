const filter = {
    urls: [
        "*://www.youtube.com/*",
    ],
};
const webRequestFlags = [
    "blocking",
];

function onError(error) {
    console.log(`Error: ${error}`);
}

function blockRequest(result) {
    function blockYt() {
        function logActive(activetabs) {
            let instance = result.instance || "invidious.osi.kr";
            let url = activetabs[0].url;

            if (url.includes("youtube.com") || (instance.includes("youtube.com") && url.includes("courses.ionisx.com"))) {
                return { cancel: false };
            }
            else {
                return { cancel: true };
            }
        }

        let querying_active = browser.tabs.query({ currentWindow: true, active: true });
        return querying_active.then(logActive, onError);
    }

    browser.webRequest.onBeforeRequest.addListener(blockYt,
        filter,
        webRequestFlags);
};

let getting = browser.storage.local.get("instance");
getting.then(blockRequest, onError);