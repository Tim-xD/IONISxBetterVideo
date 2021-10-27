const filter = {
    urls: [
        "*://www.youtube.com/*",
    ],
};
const webRequestFlags = [
    "blocking",
];

browser.webRequest.onBeforeRequest.addListener(
    page => {
        console.log(page.url);

        return {
            cancel: true,
        };
    },
    filter,
    webRequestFlags
);