export function reTryPromise(promiseFn, maxCnt = 5){
    return promiseFn().catch(err => {
        return maxCnt > 0 ? reTryPromise(promiseFn,maxCnt-1) : Promise.reject(err)
    })
}