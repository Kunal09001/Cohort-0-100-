const fs = require('fs');

fs.readFile('3-read-from-file.md','utf-8',function(err,data){
    console.log(data);
});

val = 1
for(let i=0;i<1000;i++){
    val++;
}

console.log(val);