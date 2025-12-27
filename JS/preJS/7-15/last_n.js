class Node{
    constructor(next,val){
        this.next=next;
        this.val=val;
    }
}

function getTailN(head,n){
    const dummy=new Node(head,0);
    let l=dummy;
    let r=dummy;
    let cnt=0;

    while(cnt<=n){
        r=r.next;
        cnt++;
    }

    while(r!==null){
        r=r.next;
        l=l.next;
    }

    return l.val;
}

nums=[1,2,3,4,5];

let last=new Node(null,null);
while(nums.length){
    const val=nums.pop();
    last=new Node(last,val);
}

console.log(getTailN(last.next,2))