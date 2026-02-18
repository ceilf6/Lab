export function notSyncDelay(duration) {
    var start = Date.now();
    while (Date.now() - start < duration) { }
}

export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}