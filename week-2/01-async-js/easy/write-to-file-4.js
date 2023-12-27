const fs = require('fs');

fs.writeFile('message.txt','Hello World from the code of Javascript','utf-8',function(err,data){
    console.log('Data is written successfully');
})

let a=0;
for(let i=0;i<10000;i++){
    a++;
}

console.log(a)