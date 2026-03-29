const totalStart = Date.now()

setTimeout(function timer1() {
    console.log("timer1", Date.now() - totalStart)
}, 100)

const fs = require("fs")
fs.readFile("NodeJS/sandboxs/testFiles/from.txt", (err, data) => {
    // 从事件循环开始到poll阶段，然后在poll阶段等待回调函数
    // 文件读完之后回调函数在 poll阶段 执行
    console.log("读到文件", Date.now() - totalStart)

    const insideStart = Date.now()
    while (Date.now() - insideStart < 10000) { }
})

/*
读到文件 1
timer1 10007
*/