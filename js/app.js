/* =========================================================
   DIGITAL BUSINESS CARD
   Main JavaScript
   ========================================================= */


/* ---------- Elements ---------- */

const shareButton = document.querySelector("#share-card");
const shareFeedback = document.querySelector("#share-feedback");
const showQrButton = document.querySelector("#show-qr");
const hideQrButton = document.querySelector("#hide-qr");
const qrView = document.querySelector("#qr-view");

/* ---------- Card information ---------- */

const cardData = {
    title: "Martin Bello | Marine Biologist & Data Analist",

    text:
        "Martin Bello — Marine Biologist & Data Analist | " +
        "Fisheries, Aquaculture & Seafood Supply Chain",

    url: window.location.href
};


/* ---------- Share card ---------- */

async function shareCard() {

    clearFeedback();

    /*
     * If the browser supports the Web Share API,
     * use the device's native sharing interface.
     */

    if (navigator.share) {

        try {

            await navigator.share({
                title: cardData.title,
                text: cardData.text,
                url: cardData.url
            });

        } catch (error) {

            /*
             * AbortError normally means that the user
             * simply closed the share dialog.
             */

            if (error.name !== "AbortError") {
                console.error("Unable to share the card:", error);
                showFeedback("Unable to share the card.");
            }

        }

        return;
    }


    /*
     * Fallback:
     * If Web Share is not supported,
     * copy the card URL to the clipboard.
     */

    await copyCardLink();

}


/* ---------- Copy card URL ---------- */

async function copyCardLink() {

    try {

        await navigator.clipboard.writeText(cardData.url);

        showFeedback("Link copied.");

    } catch (error) {

        console.error("Unable to copy the link:", error);

        showFeedback("Copy the page address from your browser.");

    }

}


/* ---------- Feedback ---------- */

function showFeedback(message) {

    shareFeedback.textContent = message;

    window.setTimeout(() => {
        clearFeedback();
    }, 3000);

}


function clearFeedback() {
    shareFeedback.textContent = "";
}


/* ---------- Event listeners ---------- */

if (shareButton) {

    shareButton.addEventListener("click", shareCard);

}

/* ---------- QR view ---------- */

function showQr() {
    qrView.hidden = false;

    document.body.style.overflow = "hidden";
}

function hideQr() {
    qrView.hidden = true;

    document.body.style.overflow = "";
}


/* ---------- QR event listeners ---------- */

if (showQrButton && hideQrButton && qrView) {

    showQrButton.addEventListener("click", showQr);

    hideQrButton.addEventListener("click", hideQr);

}