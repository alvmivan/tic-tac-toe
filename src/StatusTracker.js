export class StatusTracker {

    statusChange(lastStatus, newStatus, whoMoves) {

        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://127.0.0.1:5000/track', true);

        xhr.onload = function () {
            // Request finished. Do processing here.
        };

        let message = whoMoves;

        let addToMessage = (s) => message += s === null ? "N" : s;

        message += " "
        lastStatus.forEach(addToMessage)
        message += " "
        newStatus.forEach(addToMessage)

        xhr.send(message);
    }
}