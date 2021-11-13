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
        console.log(page)

        if (page.tabId == -1) {
            console.log("blocked");
            return { cancel: true };
        }

        let instance = result.instance || "invidio.xamh.de";

        if (page.originUrl.includes("courses.ionisx.com") && !instance.includes("www.youtube.com")) {
            console.log("blocked");
            return { cancel: true };
        } else {
            console.log("!blocked");
            return { cancel: false };
        }
    }

    browser.webRequest.onBeforeRequest.addListener(page => { return blockYt(page) },
        filter,
        webRequestFlags);
};

let getting = browser.storage.local.get("instance");
getting.then(blockRequest, onError);