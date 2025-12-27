var solve = function(board) {
    const m=board.length;
    const n=board[0].length;

    let sum=0;//特判：全部都是O
    for(let x of board){
        sum+=x.filter(el=>el==='O').length;//count('O');
    }
    console.log(sum);
    if(sum===m*n) return board;

    const d=[[0,1],[1,0],[-1,0],[0,-1]];

    function baohu(x,y){//用于保护周围的'O'
        board[x][y]='H';

        for(let [dx,dy] of d){
            let nx=x+dx;
            let ny=y+dy;
            if(nx>=0 && nx<n && ny>=0 && ny<m && board[x][y]==='O'){
                dfs(nx,ny);
            }
        }
    }

    function dfs(x,y){//用于感染
        board[x][y]='X';

        for(let [dx,dy] of d){
            let nx=x+dx;
            let ny=y+dy;
            if(nx>=0 && nx<n && ny>=0 && ny<m && board[x][y]==='O'){
                dfs(nx,ny);
            }
        }
    }

    function fuyuan(x,y){//用于复原保护的部分
        board[x][y]='O';

        for(let [dx,dy] of d){
            let nx=x+dx;
            let ny=y+dy;
            if(nx>=0 && nx<n && ny>=0 && ny<m && board[x][y]==='H'){
                dfs(nx,ny);
            }
        }
    }

    for(let j=0;j<m;j++){
        if(board[0][j]==='O') baohu(0,j);
    }
    for(let i=1;i<n;i++){
        if(board[i][m-1]==='O') baohu(i,m-1);
    }
    for(let j=m-2;j>=0;j--){
        if(board[n-1][j]==='O') baohu(n-1,j);
    }
    for(let i=n-2;i>0;i--){
        if(board[i][0]==='O') baohu(i,0);
    }

    for(let i=1;i<n-1;i++){
        for(let j=1;j<m-1;j++){
            if(board[i][j]==='O') dfs(i,j);
        }
    }

    for(let j=0;j<m;j++){
        if(board[0][j]==='H') fuyuan(0,j);
    }
    for(let i=1;i<n;i++){
        if(board[i][m-1]==='H') fuyuan(i,m-1);
    }
    for(let j=m-2;j>=0;j--){
        if(board[n-1][j]==='H') fuyuan(n-1,j);
    }
    for(let i=n-2;i>0;i--){
        if(board[i][0]==='H') fuyuan(i,0);
    }

    return board;
};

board=[["O","O","O"],["O","O","O"],["O","O","O"]];
console.log(solve(board));