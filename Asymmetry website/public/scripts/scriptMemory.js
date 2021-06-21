let btnMemory = document.querySelectorAll('.mainMemory__gallery--btn');
console.log(btnMemory)
btnMemory.forEach(a=>{

    a.addEventListener('click',e=>{
        console.log('haj');
        window.location.href = './quiz.html';
    })
})