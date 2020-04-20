console.log("1");

const asynch = async function(){
    const promise1 = new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve("2")
        },3000)
    })
    let first = await promise1;
    console.log(first);

    const promise2 = new Promise(function(resolve,reject){
            resolve("2.1")
    })
    let second = await promise2;
    console.log(second);

    const promise3 = new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve("2.2")
        },6000)
    })
    let third = await promise3;
    console.log(third);
}
asynch();
console.log("3")

