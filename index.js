//const qs = require('qs');
let curA , curB , amA , amB;
let currentSelectSide;
async function init()
{
    const response = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json');
    const tokenLists = await response.json();
    const parent = document.getElementById("token_lists");
    console.log(Object.values(tokenLists)[0]);
    //tokenLists.map((token)=>{
    //    console.log(Object.values(token)[0]);
    //    const div = document.createElement("div");
    //    div.className = "token_row";

    //    let html = `<img class = "token_list_img" src="${Object.values(token)[0]}">`
    //    div.innerHTML = html;
    //    div.onclick = ()=>{
    //        selectToken(token);
    //    };
    //    parent.appendChild(div);
    //})
    Object.keys(tokenLists).forEach(function(key, index) {
        console.log(key);
        const div = document.createElement("div");
        div.className = "token_row";

        let html = `<span class="token_list_text">${key}</span>`
        div.innerHTML = html;
        div.onclick = ()=>{
            closeModal();
            if(currentSelectSide == "from")
            {
                curA = key;
            }
            else 
            {
                curB = key;
            }
            renderInterface();

        };
        parent.appendChild(div);
      });
}

function renderInterface(){
    if(curA)
    {
        //document.getElementById("from_token_img").src = currentTrade;
        document.getElementById("from_token_text").innerHTML = curA;
    }
    if(curB)
    {
        //document.getElementById("to_token_img").src = currentTrade.to.logoURI;
        //document.getElementById("to_token_text").innerHTML = currentTrade.to.symbol;
        document.getElementById("to_token_text").innerHTML = curB;
    }
}
async function getPrice()
{
    //if(!currentTrade.to || !currentTrade.from || !document.getElementById("from_amount").value) return;
    let from = document.getElementById("from_amount").value;
    //let to = document.getElementById("to_amount").value;
    //console.log(from , to)
    
    //const parms={
    //    sellToken: currentTrade.from.address,
    //    buyToken : currentTrade.to.address,
    //    sellAmount : amount,
    //}
    //const headers = '0x-api-key: [097e7bcc-2ebd-448e-8132-98c8374efda4]';
    ////fetch the swap price
    const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${curA}/${curB}.json`);
    const amount = await response.json();
    console.log(amA);
    //swapPriceJSON= await response.json();
    //console.log(swapPriceJSON);
    //document.getElementById("to_amount").value = swapPriceJSON.buyAmount /(10 ** currentTrade.to.decimals);
    document.getElementById("gas_estimate").innerHTML = Object.values(amount)[1]*from;
}
init();
function openModal(side)
{
    currentSelectSide = side;   
    document.getElementById("token_modal").style.display = "block";
}
function closeModal()
{
    document.getElementById("token_modal").style.display = "none";
}
document.getElementById("from_token_select").onclick =()=>{
    openModal("from");
    
} 
document.getElementById("to_token_select").onclick =()=>{
    openModal("to");
    
} 

document.getElementById("modal_close").onclick = closeModal;

document.getElementById("from_amount").onblur = getPrice;
//browserify index.js -o bundle.js