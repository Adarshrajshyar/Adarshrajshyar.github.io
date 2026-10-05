const CACHE_NAME = "ars-adarsh-ke-alfaz-v1";

const APP_FILES = [
    "./",
    "./index.html",
    "./education.html",
    "./knowledge-power.html",
    "./exams.html",
    "./shayari.html",
    "./stories.html",
    "./poetry.html",
    "./biography.html",
    "./ars-book.html",
    "./updates.html",
    "./about.html",
    "./contact.html",
    "./sponsor.html",
    "./join-ars.html",
    "./certificate.html",
    "./verify.html",
    "./login.html",
    "./result.html",
    "./student-dashboard.html",
    "./private.html",
    "./admin.html",
    "./publisher.html",
    "./privacy.html",
    "./terms.html",
    "./exam-rules.html",
    "./certificate-terms.html",
    "./consent.html",
    "./grievance.html",
    "./exam-registration.html",
    "./exam-login.html",
    "./start-exam.html",
    "./exam-result.html",
    "./scorecard.html",
    "./certificate-download.html",
    "./join-ars-status.html",
    "./join-ars-certificate.html",
    "./student-profile.html",
    "./notifications.html",
    "./my-exams.html",
    "./my-certificates.html",
    "./search.html",
    "./theme.html",
    "./ars-ai.html",
    "./study-material.html",
    "./mcq-practice.html",
    "./revision.html",
    "./assessment.html",
    "./knowledge-categories.html",
    "./knowledge-article.html",
    "./shayari-detail.html",
    "./story-detail.html",
    "./poetry-detail.html",
    "./biography-detail.html",
    "./book-chapter.html",
    "./content-category.html",
    "./sponsor-enquiry.html",
    "./contact-success.html",
    "./registration-success.html",
    "./css/style.css",
    "./js/script.js",
    "./assets/logo.png",
    "./assets/banner.png",
    "./assets/founder.jpg",
    "./assets/signature.png",
    "./manifest.json"
];

/* Install */
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(APP_FILES))
            .then(() => self.skipWaiting())
    );
});

/* Activate */
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        }).then(() => self.clients.claim())
    );
});

/* Fetch */
self.addEventListener("fetch", event => {

    const request = event.request;

    if (request.method !== "GET") {
        return;
    }

    event.respondWith(

        caches.match(request)
            .then(cachedResponse => {

                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(request)
                    .then(networkResponse => {

                        if (
                            !networkResponse ||
                            networkResponse.status !== 200 ||
                            networkResponse.type === "opaque"
                        ) {
                            return networkResponse;
                        }

                        const responseClone =
                            networkResponse.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(request, responseClone);
                            });

                        return networkResponse;
                    })
                    .catch(() => {

                        /* Basic offline fallback */
                        if (request.destination === "document") {
                            return caches.match("./index.html");
                        }

                        return new Response(
                            "Offline",
                            {
                                status: 503,
                                statusText: "Offline"
                            }
                        );
                    });
            })
    );
});
