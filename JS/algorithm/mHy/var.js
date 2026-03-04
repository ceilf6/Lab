for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 0)
}

for (var i = 0; i < 3; i++) {
    Promise.resolve().then(() => console.log(i))
}

for (var i = 0; i < 3; i++) {
    (function (i) {
        setTimeout(() => {
            if (i === 0) {
                console.log('=== IIFE')
            }
            console.log(i)
        }, 0)
    })(i)
}