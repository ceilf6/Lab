const config = require('./config.cjs');
const print = require('./print.cjs');
const delay = require('./delay.cjs');

/**
 * 运行该函数，会逐字打印config.js中的文本
 * 每个字之间的间隔在config.js已有配置
 */
async function run() {
  let index = 0;
  while (index < config.text.length) {
    print(index); // 打印到这个位置
    await delay(config.wordDuration);
    index++;
  }
}

run();
// 注意 run code 插件是在输出台，不是在终端，无法实现 console.clear()
// 得 node NodeJS/CMJ/demo/main.cjs
