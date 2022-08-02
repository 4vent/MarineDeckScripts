const replaceTimelineImage = () => {
    const mediaItems = document.getElementsByClassName('js-media-image-link');
    for (const mediaItem of mediaItems) {
        const imageURL = mediaItem.style.getPropertyValue('background-image').replace(/^url\(["']?/, '').replace(/["']?\)$/, '').replace(/(?<=name\=).+((?=&)|[^&]$)/, 'orig');
        mediaItem.setAttribute('href', imageURL);
    }
}

const replaceTimelineStyleImage = () => {
    const mediaItems = document.getElementsByClassName('js-media-image-link');
    for (const mediaItem of mediaItems) {
        const imageURL = mediaItem.style.getPropertyValue('background-image').replace(/(?<=name\=).+((?=&)|[^&]$)/, 'orig');
        mediaItem.style.setProperty('background-image', imageURL)
    }
}

const replaceViewerImage = () => {
    const mediaItems = document.getElementsByClassName('media-img');
    for (const mediaItem of mediaItems) {
        const imageURL = mediaItem.getAttribute("src").replace(/(?<=name\=).+((?=&)|[^&]$)/, 'orig');
        mediaItem.setAttribute('src', imageURL);
    }
}

const body = document.body;
const observer = new MutationObserver(() => {
    replaceTimelineStyleImage();
})
const config = {
    childList: true,
    attributes: false,
    characterData: false,
    subtree: true
};

observer.observe(body, config);
replaceTimelineStyleImage();