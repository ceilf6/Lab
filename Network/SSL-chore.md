// 服务器返回的证书链
openssl s_client -connect example.com:443 -showcerts

// 验证路径
openssl s_client -connect example.com:443 -verify 5

浏览器中查看CA直接在URL处点开即可

服务器要求的 CA 列表
openssl s_client -connect example.com:443 -tls1_2

系统信任的CA
security find-certificate -a -p /System/Library/Keychains/SystemRootCertificates.keychain