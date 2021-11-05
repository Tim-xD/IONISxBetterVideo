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
            function logTabs(tabs) {
                let instance = result.instance || "invidious.osi.kr";
                let ionisxtab = false;
                let activeid = activetabs[0].id;

                for (let tab of tabs) {
                    if (tab.id == activeid) {
                        ionisxtab = true;
                    }
                }

                let instanceYt = instance.includes("youtube")
                if ((!ionisxtab || (instanceYt && ionisxtab)) && activeid >= 0) {
                    console.log("!blocked")
                    return { cancel: false };
                }
                else {
                    console.log("blocked")
                    return { cancel: true };
                }
            }

            let querying_ionis = browser.tabs.query({ url: "https://courses.ionisx.com/*" });
            return querying_ionis.then(logTabs, onError);
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