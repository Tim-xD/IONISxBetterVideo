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
        let instance = result.instance || "invidious.osi.kr";

        if ((page.thirdParty || page.type == "xmlhttprequest") && page.url.includes("youtube.") && !instance.includes("youtube.")) {
            console.log("blocked");
            return { cancel: true };
        } else {
            console.log("!blocked");
            return { cancel: false };
        }
    }

    browser.webRequest.onBeforeRequest.addListener(page => { blockYt(page) },
        filter,
        webRequestFlags);
};

let getting = browser.storage.local.get("instance");
getting.then(blockRequest, onError);