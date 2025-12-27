var findAnagrams = function(s, p) {
    //const vis = new Set();
    const mapt=new Map();
    const maps=new Map();
    //let less=p.length;
    const ans=[];
    /*  不能用 set ，因为可能窗口中有多个相同的目标字符，得用 Map比对数目 //数组模拟队列
    for(r=0;r<p.length;r++){
        if (vis.has(s[r])) continue;
        vis.add(s[r]);
        if (p.has(s[r])) less--
    }
    */
    for(let i of p){
        mapt.set(i,(mapt.get(i)||0)+1);
    }
    let less=mapt.size;
    let l=0;
    let r;
    for(r=0;r<p.length;r++){
        maps.set(s[r],(maps.get(s[r])||0)+1);
        if (mapt.has(s[r]) && maps.get(s[r])===mapt.get(s[r])) less--;
            //注意：只有第一次相等时才减
    }//出来 r=p.length+1
    //r++
    console.log(r);
    while(r<s.length){
        if (less===0){
            ans.push(l);
        }

        maps.set(s[l],maps.get(s[l])-1);
        if (mapt.has(s[l] && mapt.get(s[l])>maps.get(s[l]))) less++;

        maps.set(s[r],(maps.get(s[r])||0)+1);
        if (mapt.has(s[r]) && maps.get(s[r])===mapt.get(s[r])) less--;

        l++;
        r++;
    }
    return ans;
};

let s = "cbaebabacd", p = "abc";
console.log(findAnagrams(s, p));