let history = document.querySelector('#history-value');
let output = document.querySelector('#output-value');



document.querySelector('#clear').addEventListener('click',e=>{
    history.innerHTML = ''
})


try{

document.querySelector('#keyboard').addEventListener('click',e=>{
    console.log(e.target.textContent)
if(e.target.textContent != 'C') document.querySelector('#history-value').innerHTML += e.target.textContent;
if(e.target.textContent == '='){
    console.log(history.textContent.slice(0, -1))
    let text = history.textContent.slice(0, -1)
    console.log(typeof text)
    let c = eval(text)
    console.log(c)
    output.innerHTML = c;
    history.innerHTML = ''

}
    
}


)
}catch(e){
    console.log(e)
}


document.querySelector