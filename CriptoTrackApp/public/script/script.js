//preuzimanje podataka
let table = document.querySelector('.tableTopFifty');






let getApi = async (city) => {
    let apiKey = "667a77e6-24eb-4a0a-9aab-db6ac3165140";
    
    let url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`;
    qString = "?CMC_PRO_API_KEY=" + apiKey + "&start=1&limit=5000&convert=USD";
    let data = await fetch(url+qString);
    let data1 = await data.json();
    
    return data1;
};

getApi().then(data=>{
    let niz=[]
    niz=data.data.sort((a,b) => b.quote.USD.price-a.quote.USD.price).slice(0,50)
    // console.log(niz)
    localStorage.setItem('topFifty', JSON.stringify(niz))
    
    document.querySelector('.keepLoader').style.display='none';
    
})
console.log('haj')

let topFifty=JSON.parse(localStorage.getItem('topFifty'))

// console.log(topFifty);



//ispis tabele
let enable = ()=>{

    document.querySelectorAll('.dugmici').forEach(a=>{
    //    console.log(a.previousElementSibling.value.length) 
        if(a.previousElementSibling.value.length>0){
    
            a.disabled=false
        }
        else{
            a.disabled=true
        }
    
      
    })
}



// let inputValue = document.querySelector('.amount').value;
let arrayOfSymbols=[];
topFifty.forEach(element => {
    // console.log(element)
    table.innerHTML+=`<tr>
    <td><a class='link' href='./../specificData.html' >${element.name}</a></td>
    <td>${element.symbol}</td>
    <td>${element.quote.USD.price.toFixed(2)}</td>
    <td class='${element.quote.USD.percent_change_24h.toFixed(2)>0 ? 'positive': 'negative'}' >${element.quote.USD.percent_change_24h.toFixed(2)}%</td>
    <td><form class='inputField'><input pattern='[0-9]+' onkeyup='enable()' value='${(localStorage.getItem(element.symbol) && localStorage.getItem(element.symbol)!==null ) ? JSON.parse(localStorage.getItem(element.symbol))[0]:''}'  class='amount' type='text'><button class='dugmici' disabled='true'>Submit</button></form></td>
    <td>${(localStorage.getItem(element.symbol) && localStorage.getItem(element.symbol)!==null ) ? JSON.parse(localStorage.getItem(element.symbol))[1] :''}</td>
    </tr>`

    
    arrayOfSymbols.push(element.symbol)
    localStorage.setItem('arrayOfSymbols',arrayOfSymbols)
});


let sum=0;
let sumPromena=0;
arrayOfSymbols.forEach(a=>{
    if(localStorage.getItem(`${a}`)){

        topFifty.forEach(b=>{
            if(b.symbol===a){
                // console.log(JSON.parse(localStorage.getItem(`${a}`))[0])
                let q=parseInt(b.quote.USD.price)*JSON.parse(localStorage.getItem(`${a}`))[0]
                sumPromena+= q
            }
        })
        
        sum+=parseInt(JSON.parse(localStorage.getItem(`${a}`))[1])
    }
})

console.log(sum, parseInt(sumPromena.toFixed(1)))
let y = sum -parseInt(sumPromena.toFixed(1))
if(y>0){
    document.querySelector('.diference').innerHTML= `
    <h1 class='positive'>You gain ${y}$ since last time!</h1>
    `
}else{
    document.querySelector('.diference').innerHTML= `
    <h1 class='negative'>You lose ${y}$ since last time!</h1>
    `
}

document.querySelectorAll('.inputField').forEach(a=>{
    
  

    a.addEventListener('submit',e=>{
        e.preventDefault()
        let nameOfCurrency=a.parentElement.parentElement.children[1].innerText;
//   console.log(a.firstChild.value, parseInt(a.parentElement.previousElementSibling.previousElementSibling.innerText))
        let vrednost = parseInt(a.firstChild.value)*parseInt(a.parentElement.previousElementSibling.previousElementSibling.innerText)
        a.parentElement.nextElementSibling.innerText=`$${vrednost}`
       localStorage.setItem(nameOfCurrency, JSON.stringify([parseInt(a.firstChild.value),vrednost]))
    })
})


Array.from(table.children).forEach((a,i)=>{

    if(i%2===0){
        a.classList='paran'
    }else{
        a.classList='neparan'
    }
    console.log(a)
    
})


document.querySelectorAll('.link').forEach(a=>{
    a.addEventListener('click',e=>{
        console.log(a.innerText)
      console.log(JSON.parse(localStorage.getItem('topFifty')));
      
      let data=JSON.parse(localStorage.getItem('topFifty'));
     let dataOfCriptocurency= data.filter((dt)=>{
          return dt.name ===a.innerText
      })
      localStorage.setItem('dataOfCriptocurency',JSON.stringify(dataOfCriptocurency))
      console.log(dataOfCriptocurency)


    })
})


setInterval(()=>{
    location.reload();
    console.log('haj')
},60000)

