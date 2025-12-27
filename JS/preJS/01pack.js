
const seen=new Map();
function dfs(i,leftc){//遍历到第i件物品时

    if(i<0){
        //return 0; //没有物品了
        return leftc==0 ? 1 : 0;
    }

    let key=i+'-'+leftc;//`${i}-${leftc}`; //使用字符串作为key
    if(seen.has(key)) return seen.get(key);
    
    let res;
    if (c[i]>leftc) res = dfs(i-1,leftc);
    else{
        /*
        res = Math.max(
            dfs(i-1,leftc),          //不选第i件物品
            dfs(i-1,leftc-c[i])+v[i] //选第i件物品
        )*/
        
        //恰好：
        res= dfs(i-1,leftc) + dfs(i-1,leftc-c[i]);//+v[i];
    }
    seen.set(key,res);//在return前统计
    return res;//返回的是方案数
}

const c = [2,2,3,4,4,5]; //物品的重量
const v = [3,4,5,6,6,7]; //物品的价值
const W = 10; //背包的容量
const n = c.length; //物品的数量
console.log(dfs(n-1,W)); //输出最大价值


//const f=new Array(n+1).fill(0);
const f=Array.from({length:n} , ()=>Array(W+1).fill(0)); //创建二维数组
//f[i][j]表示前i件物品放入容量为j的背包的最大价值

for(let i=0;i<n;i++){
	for(let j=W;j>c[i]-1;j--){
        if (i === 0) {
            f[i][j] = v[i]; // 边界条件 -> 初始化
        }else{
			f[i][j]=Math.max(f[i-1][j],f[i-1][j-c[i]]+v[i]);
		}
	}
}

console.log(f[n-1][W]);



function ZOpack(c,w){
    for(let j=W;j>c-1;j--){
        F[j]=Math.max(F[j],F[j-c]+w);
    }
}
const F=Array(W+1).fill(0);
for(let i=0;i<n;i++){
    ZOpack(c[i],v[i]);
}
console.log(F[W]); //输出最大价值