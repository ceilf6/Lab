function tag(strings,...values){
	console.log(strings) // [ 's1,', 's2', ',s3' ]
	console.log(values) // [ 'v1', 'v2' ]
	return values[0] 
}

const va = "v1"
const vb = "v2"

const res = tag`s1,${va}s2${vb},s3`
console.log(res) // v1