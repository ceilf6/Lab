setTimeout(() => console.log('setTimeout'), 0)

setImmediate(() => console.log('setImmediate'))

/*
注意 setTimeout 最小也是 1 所以二者的顺序是不一定的

假如到 timers 时大于1了那么就先执行 setTimeout 

否则 check 时执行 setImmediate 等到第二圈的时候再执行 timeout
*/