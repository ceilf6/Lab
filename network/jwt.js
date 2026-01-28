import { head } from "framer-motion/client";

const headerJson =
{
    "alg": "HS256",
    "typ": "JWT"
};

const headerJsonStr = JSON.stringify(headerJson);

// btoa 普通字符串->base64
const header = btoa(headerJsonStr);

const origin = JSON.parse(atob(header))

console.log(headerJson);

console.log(header);

console.log(origin);


const payloadJson =
{
    "ss": "发行者",
    "iat": "发布时间",
    "exp": "到期时间",
    "sub": "主题",
    "aud": "听众",
    "nbf": "在此之前不可用",
    "jti": "JWT ID"
}

const payload = btoa(JSON.stringify(payloadJson))

const former = header + "." + payload;
// 别忘记 .

const secret = "secret-key";

const signature = HMAC_SHA256(
    header.payload,
    secret
)

console.log(former + '.' + signature);



// const jwt = require('jsonwebtoken');

// const token = jwt.sign({ a: 1, b: 2 }, secret);
// console.log(token);
// //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ7.eyJhIjoxLCJiIjoyLCJpYXQiOjE2MzQ4MDg1Mzh9.EH6KLP-yegEN5H5As7JUzziOenlT5kuHM1Pxj6cJ9C8';

// const result = jwt.verify(token, secret);
// console.log(result);