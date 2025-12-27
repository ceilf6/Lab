const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let T = 0;
let testCases = [];
let currentCase = 0;

rl.on('line', (line) => {//readline
    if (T === 0) {
        T = parseInt(line);//转为Int
    } else {
        testCases.push(line.trim());
        if (testCases.length === T) {

            for (let i = 0; i < T; i++) {
                console.log(solve(testCases[i]));//输出 solve 解决函数的结果
            }
            rl.close();//记得关闭
        }
    }
});

function solve(s) {
    const n = s.length;

    let pre0=0;
    let pre1=0;

    let sum01=0;
    let sum10=0;

    for(let i=0;i<n;i++){
        if(s[i]==='0'){
            pre0++;
            
            //结算 10
            sum10+= pre1;
        }else{
            pre1++;

            sum01+= pre0;
        }
    }

    d=Math.abs(sum01-sum10);
    if(d%2===0){
        return d/2;
    }else{
        return -1;
    }
}