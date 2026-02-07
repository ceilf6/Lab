删除 cookie 只需要设置 max-age=-1 即相对有效时间为负数即可

```
set-cookie: key=value; path=?; domain=?; expire=?; max-age=-1; secure; httponly
```