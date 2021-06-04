console.log('Tu sam :D')

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
    
    document.querySelector('.keepLoader').style.display='none'
})
// let topFifty=JSON.parse(localStorage.getItem('topFifty'))

let data = JSON.parse(localStorage.getItem('dataOfCriptocurency'))
console.log(data[0])

document.querySelector('.main').innerHTML=`
<h1 style='margin-left:10px'>Details page - ${data[0].name}</h1>
<table class="tableTopFifty">
        <tr class='neparan'>
            <th>cmc_rank</th>
            <th>date_added</th>
            <th>id</th>
            <th>last_updated</th>
            <th>num_market_pairs</th>
            <th>symbol</th>
            <th>tags</th>
          </tr>
          <tr class='paran'>
          <td>${data[0].cmc_rank}</td>
          <td>${data[0].date_added}</td>
          <td>${data[0].id}</td>
          <td>${data[0].last_updated}</td>
          <td>${data[0].num_market_pairs}</td>
          <td>${data[0].symbol}</td>
          <td><ul>
          <li>${data[0].tags[0]}</li>
          <li>${data[0].tags[1]}</li>
          <li>${data[0].tags[2]}</li>
          <li>${data[0].tags[3]}</li>
          <li>${data[0].tags[4]}</li>
          <li>${data[0].tags[5]}</li>
          </ul></td>
          </tr>
         
    </table>

`