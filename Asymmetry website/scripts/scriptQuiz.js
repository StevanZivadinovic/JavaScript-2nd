let btnMemory = document.querySelectorAll('.quiz__buttons--button');
console.log(btnMemory)
btnMemory.forEach(a=>{

    a.addEventListener('click',e=>{
        console.log('haj');
        window.location.href = './swipe.html';
    })
})