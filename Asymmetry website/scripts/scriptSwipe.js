document.querySelectorAll('.swipe__buttons')
.forEach(a=>{
    a.addEventListener('click',e=>{
        window.location.href = './registration.html';
})
    })

    let a=false;
    document.querySelector('body').addEventListener('dragend',(e)=>{
        window.location.href = './registration.html';
       console.log('haj',e)
    })
      
   
    // document.querySelector('body').addEventListener('mousemove',()=>console.log(),false)
    // document.querySelector('body').addEventListener('mouseup',()=>console.log(),false)

    