const flag = false // true

let a

if (flag) {
    a = 1
    // export default a = 1 // SyntaxError: Unexpected token 'export'
} else {
    a = 0
    // export default a = 0
}

export default a