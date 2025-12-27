

var trapCorrect = function(height) {
    if (height.length < 3) return 0;
    
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0;
    let water = 0;
    
    while (left < right) {
        if (height[left] < height[right]) {
            // 处理左侧
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }
            left++;
        } else {
            // 处理右侧
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                water += rightMax - height[right];
            }
            right--;
        }
    }
    
    return water;
};

var trap = function(height) {
    const h=new Map();
    let hi=1;
    const len=height.length
    while (true){
        for(let i=0;i<len;i++){
            if (height[i]>=hi){
                h.set(hi,[i]);
                break;
            }
        }
        if (!h.has(hi)) break;
        for(let i=len;i>h.get(hi)[0];i--){
            if (height[i]>=hi){
                h.get(hi).push(i);
                break;
            }
        }
        if (h.get(hi).length<2) break;
        hi++;
    }
    //前面已经统计完两臂高
    let yuji=0;
    
    console.log(h);

    //const shiji=Math.sum(height);
    const shiji=height.reduce((arr,cur)=>arr+cur,0)
    //console.log(shiji);
    for(item of h){//h是键值对数组
        if (item[1].length===2){
            yuji+=item[1][1]-item[1][0]+1;
        }else{
            yuji++;
        }
    }
    console.log(yuji-shiji);
    return yuji-shiji;
};

height = [0,1,0,2,1,0,1,3,2,1,2,1];
trap(height);