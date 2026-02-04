// 参考资料 https://github.com/ceilf6/CPlusPlus/blob/main/.2025/template%26adaptor.md

// TS 支持 protected 关键词
class Base {
    public name: string;
    protected count: number;
    private secret: string;

    constructor(name: string) {
        this.name = name;        // public
        this.count = 0;          // protected
        this.secret = 'shh';     // private
    }

    public sayHi() {
        console.log(this.name);      // ✅
        console.log(this.count);     // ✅
        console.log(this.secret);    // ✅
    }

    protected inc() {
        this.count++;
    }

    private reveal() {
        console.log(this.secret);
    }
}

class Child extends Base {
    work() {
        console.log(this.name);   // ✅ public
        console.log(this.count);  // ✅ protected
        // console.log(this.secret); // ❌ private

        this.inc();               // ✅ protected
        // this.reveal();          // ❌ private
    }
}

const b = new Base('Alice');
b.name;        // ✅ public
// b.count;    // ❌ protected
// b.secret;   // ❌ private

const c = new Child('Bob');
c.name;        // ✅ public
// c.count;    // ❌ protected

export {};