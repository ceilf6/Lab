function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// start ============================
process.nextTick(() => {
    console.log('nextTick')
})
Promise.resolve()
    .then(() => {
        console.log('then')
    })
// start ============================
async function main() {
    await sleep(3000)
    console.log()

// end ============================
    process.nextTick(() => {
        console.log('nextTick')
    })
    Promise.resolve()
        .then(() => {
            console.log('then')
        })
// end ============================
}

main()