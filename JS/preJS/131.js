/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
    const t='#'+s.split('').join('#')+'#';
    const n=t.length;
    const p=Array(n).fill(0);//回文半径数组
    let R=0;//当前最右
    let C=0;

    for(let i=0;i<n;i++){
        p[i]=R>i? Math.min(p[2*C-i],R-i):0;

        while(i+p[i]+1<n && i-p[i]-1>=0 && t[i+p[i]+1]===t[i-p[i]-1]){
            p[i]++;
        }

        if (i+p[i]>R){
            C=i;
            R=i+p[i];
        }
    }

    //const center=p.filter((el,idx)=>el!==0)
    const center=[];
    for(let i=0;i<n;i++){
        if(p[i]>=1){
            center.push([i,p[i]])
        }
    }

    console.log(center);

    let ans=[];

    return ans;
};

partition('aab'); // 测试用例