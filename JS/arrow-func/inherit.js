function outer() {
    this.att = 'this from outer'
    const inner = () => {
        console.log('=== arguments', arguments)
        console.log('=== this', this)
    }
    console.log('=== prototype', inner.prototype)
    inner('inner')
    // const innerIns = new inner() // error - TypeError: inner is not a constructor
}

new outer('arguments from outer')
// 得 new 否则严格模式下 this 为 undefined , L2要报错
