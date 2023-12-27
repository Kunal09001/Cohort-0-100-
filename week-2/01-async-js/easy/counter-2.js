let counter = 1;

function recursiveCounter(){
    console.log(counter);
    startCounter()
}

function startCounter(){
    setTimeout(function() {
        counter++;
        recursiveCounter();
    },1000);
}

startCounter();