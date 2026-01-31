/**
 * 
 * @param {*} dbName 数据库名称
 * @param {*} version 数据库版本
 */
function openDB(dbName, version = 1) {
    return new Promise((resolve, reject) => {
        var db; // 存储数据库对象
        // 打开数据库，如果没有就是创建操作
        // indexedDB 和 storage 一样都是挂载在全局 window 上的
        var request = indexedDB.open(dbName, version);
        // request 是 IDBRequest对象
        // 数据库打开或者创建成功的时候
        request.onsuccess = function (event) {
            db = event.target.result;
            console.log("数据库打开成功");
            resolve(db); // openDB 返回的是一个 Promise异步任务对象
        }

        // 打开失败
        request.onerror = function () {
            console.log("数据库打开失败");
        }

        // 数据库发生更新的时候
        // 1. 版本号更新 2. 添加或者删除了表（对象仓库）的时候
        // 当第一次调用 open 方法时，会触发更新事件（版本号从无到有了），需要在这里初始化我们的表
        request.onupgradeneeded = function (event) {
            console.log("数据库版本更新");
            db = event.target.result;
            // 创建数据仓库（表）
            var objectStore = db.createObjectStore("测试表", {
                keyPath: "Id", // 这是主键：独一无二不会重复的
                autoIncrement: true // 实现自增
            });
            // 创建索引，提高查询速度（类似于字典的拼音/部首）
            objectStore.createIndex("Id索引", "Id", { unique: true });
            objectStore.createIndex("Name索引", "Name", { unique: true });
            objectStore.createIndex("Age索引", "Age", { unique: true });
        }
    })
}

/**
 * 关闭数据库
 * @param {object} db 数据库实例
 */
function closeDB(db) {
    db.close();
    console.log("数据库已关闭");
}

/**
 * 删除数据库
 * @param {object} dbName 数据库名称
 */
function deleteDBAll(dbName) {
    console.log(dbName);
    let deleteRequest = window.indexedDB.deleteDatabase(dbName);
    deleteRequest.onerror = function (event) {
        console.log("删除失败");
    };
    deleteRequest.onsuccess = function (event) {
        console.log("删除成功");
    };
}

/**
 * 新增数据
 * @param {object} db 数据库实例
 * @param {string} storeName 数据仓库实例（表）
 * @param {string} data 要添加的数据
 */
function addData(db, storeName, data) {
    // 装饰器模式：链式调用
    var request = db
        .transaction([storeName], "readwrite") // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
        .objectStore(storeName) // 仓库对象
        .add(data);

    request.onsuccess = function (event) {
        console.log("数据写入成功");
    };

    request.onerror = function (event) {
        console.log("数据写入失败");
    };
}
