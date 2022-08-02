const icon = "📎";

const addOrigImageLink_2_tweetDetails = () => {
    const details = document.getElementsByClassName("js-tweet tweet-detail");
    for (const detail of details) {
        if (detail.classList.contains("img-link-buttons-added")) continue;
        detail.classList.add("img-link-buttons-added");
        const ul = document.createElement("ul");
        ul.setAttribute("style", "text-align: center;");
        const imgs = detail.getElementsByClassName(
            "js-media-image-link media-image block"
        );
        var first_margine = true;
        if (imgs.length > 0) {
            for (const img of imgs) {
                const link = img.style
                    .getPropertyValue("background-image")
                    .match(/url\(['"]?(https:.+)['"]?\)$/)[1]
                    .replace(/name=.+($|&)/, "name=orig");
                const margin = first_margine ? "" : " margin-left: 32px;";
                first_margine = false;
                const li = document.createElement("li");
                li.setAttribute("style", "display: inline;" + margin);
                const a = document.createElement("a");
                a.setAttribute("href", link);
                a.setAttribute("download", "");
                a.setAttribute("class", "url-ext");
                a.setAttribute("target", "_blank");
                a.setAttribute("rel", "url noopener noreferrer");
                a.text = icon;
                li.appendChild(a);
                ul.appendChild(li);
            }
        } else {
            const img = detail.getElementsByClassName("media-img");
            if (img.length == 0) continue;
            const link = img[0]
                .getAttribute("src")
                .replace(/name=.+($|&)/, "name=orig");
            const margin = first_margine ? "" : " margin-left: 32px;";
            first_margine = false;
            const li = document.createElement("li");
            li.setAttribute("style", "display: inline;" + margin);
            const a = document.createElement("a");
            a.setAttribute("href", link);
            a.setAttribute("download", "");
            a.setAttribute("class", "url-ext");
            a.setAttribute("target", "_blank");
            a.setAttribute("rel", "url noopener noreferrer");
            a.text = icon;
            li.appendChild(a);
            ul.appendChild(li);
        }
        const media_preview = detail.getElementsByClassName(
            "js-tweet-media tweet-detail-media"
        )[0];
        const div = document.createElement("div");
        div.appendChild(ul);
        media_preview.appendChild(div);
    }
};

const addOrigImageLink_2_timeline = () => {
    const tweets = document.getElementsByClassName("js-tweet tweet");
    for (const tweet of tweets) {
        if (tweet.classList.contains("img-link-buttons-added")) continue;
        tweet.classList.add("img-link-buttons-added");
        const ul = document.createElement("ul");
        ul.setAttribute("style", "text-align: center;");
        var imgs;
        const tweet_parent = tweet.parentElement;
        const large_media = tweet_parent.getElementsByClassName(
            "js-media position-rel item-box-full-bleed margin-tm"
        )[0];

        if (large_media == undefined) {
            imgs = tweet.getElementsByClassName("js-media-image-link block");
        } else {
            imgs = large_media.getElementsByClassName(
                "js-media-image-link block"
            );
        }
        var first_margine = true;
        for (const img of imgs) {
            const link = img.style
                .getPropertyValue("background-image")
                .match(/url\(['"]?(https:.+)['"]?\)$/)[1]
                .replace(/name=.+($|&)/, "name=orig");
            const margin = first_margine ? "" : " margin-left: 32px;";
            first_margine = false;
            const li = document.createElement("li");
            li.setAttribute("style", "display: inline;" + margin);
            const a = document.createElement("a");
            a.setAttribute("href", link);
            a.setAttribute("download", "");
            a.setAttribute("class", "url-ext");
            a.setAttribute("target", "_blank");
            a.setAttribute("rel", "url noopener noreferrer");
            a.text = icon;
            li.appendChild(a);
            ul.appendChild(li);
        }

        if (large_media == undefined) {
            const body = tweet.getElementsByClassName(
                "tweet-body js-tweet-body"
            )[0];
            const div = document.createElement("div");
            div.appendChild(ul);
            body.appendChild(div);
        } else {
            var media_preview_container;
            const media_carets =
                tweet_parent.getElementsByClassName("media-caret");
            if (media_carets.length > 0) {
                media_preview_container = media_carets[0].parentElement;
            } else return;
            const div = document.createElement("div");
            div.setAttribute(
                "style",
                "position: absolute; bottom: 0px; left: 0; right: 0; padding: 5px; background: #00000088"
            );
            div.appendChild(ul);
            media_preview_container.appendChild(div);
        }
    }
};

const addOrigImageLink_2_medFullpanel = () => {
    const med_fullpanels = document.getElementsByClassName(
        "js-modal-panel mdl s-full med-fullpanel"
    );
    if (med_fullpanels.length == 0) return;
    const med_fullpanel = med_fullpanels[0];
    // if (med_fullpanel.classList.contains('img-link-buttons-added')) return;
    // med_fullpanel.classList.add('img-link-buttons-added')
    const img = med_fullpanel.getElementsByClassName("media-img")[0];
    const link = img.getAttribute("src").replace(/name=.+($|&)/, "name=orig");

    var a = med_fullpanel.getElementsByClassName("orig-image-link");
    if (a.length > 0) {
        a[0].setAttribute("href", link);
        a[0].setAttribute("download", "");
    } else {
        a = document.createElement("a");
        a.setAttribute("href", link);
        a.setAttribute("download", "");
        a.setAttribute("class", "url-ext orig-image-link");
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "url noopener noreferrer");
        a.text = icon;
        const med_tray = med_fullpanel.getElementsByClassName(
            "med-tray js-mediaembed"
        )[0];
        const div = document.createElement("div");
        div.setAttribute(
            "style",
            "left:0; right:0;position: absolute; bottom: 0;"
        );
        div.appendChild(a);
        med_tray.appendChild(div);
    }
};

addOrigImageLink_2_tweetDetails();
addOrigImageLink_2_timeline();
addOrigImageLink_2_medFullpanel();

const body = document.body;
const observer = new MutationObserver(() => {
    observer.disconnect();
    addOrigImageLink_2_tweetDetails();
    addOrigImageLink_2_timeline();
    addOrigImageLink_2_medFullpanel();
    observer.observe(body, config);
});
const config = {
    childList: true,
    attributes: false,
    characterData: false,
    subtree: true,
};

observer.observe(body, config);
