import axios from "axios";

async function getLab() {
    const res = await axios.get("https://github.com/ceilf6/Lab/latest-commit/main")
    console.log(res)
}

getLab()

/*
跨域了
（索引）:1 Access to XMLHttpRequest at 'https://github.com/ceilf6/Lab/latest-commit/main' from origin 'http://localhost:8080' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
test.js:4  GET https://github.com/ceilf6/Lab/latest-commit/main net::ERR_FAILED 406 (Not Acceptable)
*/