import constructorProxy from "./index.js";

class ClassName {

}

const ClassProxy = constructorProxy(ClassName, "属性1", "属性2", "属性n")
const obj = new ClassProxy("1值", "2值", "n值")

console.log(obj)