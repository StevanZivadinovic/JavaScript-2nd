const progress = document.querySelectorAll(".progress-done");
console.log(progress);

progress.forEach((a) => {
  a.style.width = a.getAttribute("data-done") + "%";

  a.style.opacity = 1;
  a.style.cursor = 'pointer';
  a.addEventListener('mouseover',e=>{
   a.style.width=0
  });

  a.addEventListener('mouseout',e=>{
    a.style.width = a.getAttribute("data-done") + "%";
  })
});

document.querySelector(".exit").addEventListener("click", (a) => {
  document.querySelector(".progressBar").style = "display:none";
});

document.querySelectorAll('.tabs').forEach((a,i)=>{
  a.addEventListener('click',e=>{
    let p = true;
    document.querySelectorAll('.tabs').forEach((a,i)=>{a.classList.remove('checked')})
    e.target.classList.toggle('checked');

  })
})

document.querySelectorAll('.tabs').forEach(a=>{
  a.addEventListener('click',e=>{
    if(e.target.textContent==='TOC'){
      console.log('TOC');
      document.querySelector('ul.TOC').style.display='block';
      document.querySelector('ul.Search').style.display='none';
  
    }
    if(e.target.textContent==='Search'){
      console.log('Search');
      document.querySelector('ul.Search').style.display='block';
      document.querySelector('ul.TOC').style.display='none';
      


    }

  })
})

