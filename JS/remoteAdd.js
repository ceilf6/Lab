const remoteAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 1000)
    });
}

const target = [1, 2, 3, 4, 5, 6];

async function add(...inputs) {
    let ans = 0;
    const L = inputs.length;
    if (L === 1) return inputs[0]
    else if (L === 2) {
        const res = await remoteAdd(inputs[0], inputs[1]);
        return res
    } else {
        const MID = Math.floor(L / 2);
        const a1 = add(inputs.slice(0, MID));
        const a2 = add(inputs.slice(MID + 1,));
        ans += a1 + a2
    }
    return ans;
}

const res = add(target);
console.log(res);