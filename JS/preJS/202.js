var isHappy = function(n) {
    let cnt=10000;
    let temp=0;
    while(cnt--){
        while(n){
            temp+=(n%10)**2;
            n=Math.floor(n/10);
        }
        if(temp===1) return true;
        console.log(temp);
        n=temp;
        temp=0;
    }
    return false;
};

n=19;
console.log(isHappy(n)); // 输出: true