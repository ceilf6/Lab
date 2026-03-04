function debounce(fn, wait) {
    let timer = null
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, wait)
    }
}