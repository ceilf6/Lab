Array.prototype.myReduce = function (callbackFn, initialValue) {
    if (typeof callbackFn !== 'function') {
      throw new TypeError(callbackFn + ' is not a function');
    }
  
    const arg = this // 利用调用 reduce 时触发的隐式调用规则：通过 arg 拿到参数数组
    let ans
    let startId
  
    if(arg.length === 0){
        // 注意不应该是 ! 判断就会误判很多假值，此处应该是判 null 和 undefined
      if(initialValue === null || initialValue === undefined){
        throw new Error('Reduce of empty array with no initial value');
      }else{
        return initialValue
      } 
    }else{
      if(initialValue === null || initialValue === undefined){
        ans = arg[0]
        startId = 1
      }else{
        ans = initialValue
        startId = 0
      }
    }
  
    const LA = arg.length
    for(let i=startId;i<LA;i++){
      if (!arg[i]) continue // 碰到假值直接下一个就好
      ans = callbackFn(ans,arg[i],i,arg)
    }
  
    return ans
  };