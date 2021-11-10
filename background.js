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
        function logTabs(tabs) {
            let isionis = false;
            let id = page.tabId

            for (let tab of tabs) {
                isionis = isionis || tab.id == id;
            }

            let instance = result.instance || "invidious.osi.kr";

            if ((id == -1 || (page.thirdParty && isionis)) && !instance.includes("youtube.")) {
                console.log("blocked");
                return { cancel: true };
            } else {
                console.log("!blocked");
                return { cancel: false };
            }
        }

        let querying = browser.tabs.query({ url: ["https://courses.ionisx.com/*","https://ionisx.com/courses/*"]});
        querying.then(logTabs, onError);
    }

    browser.webRequest.onBeforeRequest.addListener(page => { blockYt(page) },
        filter,
        webRequestFlags);
};

let getting = browser.storage.local.get("instance");
getting.then(blockRequest, onError);