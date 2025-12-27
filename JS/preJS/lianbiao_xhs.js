// 删除链表倒数第 n 个节点


class node {
	constructor(val, next) {
		this.val = val; 
		this.next = next;
	}

	static build(arr) {
		if (arr.length === 0) return null;

		let head = new node(arr.shift(), null);
		let last = head;

		while (arr.length) {
			let nxt = new node(arr.shift(), null);
			last.next = nxt;
			last = nxt;
		}

		return head;
	}
}

function shanchu(head, n) {
	let dummy = new node(0, head);

	let l = dummy;
	let r = dummy;

	for (let i = 0; i <= n; i++) { // 应该走 n+1 步
		if (r === null) return head;
		r = r.next;
	}

	while (r !== null) {
		l = l.next;
		r = r.next;
	}

	l.next = l.next.next;

	return dummy.next;
}

const arr = [1, 2, 3, 4, 5];
let head = node.build(arr); // 直接用build方法生成链表

let newhead = shanchu(head, 2);

while (newhead != null) {
	console.log(newhead.val);
	newhead = newhead.next;
}