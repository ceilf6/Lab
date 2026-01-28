const json =
{
    "alg": "HS256",
    "typ": "JWT"
};

const jsonStr = JSON.stringify(json);

// btoa 普通字符串->base64
const header = btoa(jsonStr);

const origin = JSON.parse(atob(header))

console.log(json);

console.log(header);

console.log(origin);
