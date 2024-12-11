let basket=JSON.parse(localStorage.getItem("data")) || [];
const calculation=()=>{
    let amount=document.getElementById("cartam");
    amount.innerHTML=basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
};
calculation();

const label=document.getElementById("label");
const cartdiv=document.getElementById("scart");

const generateCart=()=>{
    if(basket.length!==0)
    {
        return cartdiv.innerHTML=basket.map((x)=>{
            let {id,item}=x;
            let search=shopitems.find((y)=>y.id===id) || [];
            return `
            <div class="carttile">
            <div class="tile">
            <img width="100" src=${search.img}>
            <div class="details">
            <div class="title-price-x">
            <h4 class="head">${search.name}
            <p class="price1">₹ ${search.price}</p></h4>
            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
            </div>
            <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash"></i>
                <div id=${id} class="quantity">${item}</div>
                <i onclick="increment(${id})" class="bi bi-plus"></i>                    
                </div>
                <h3>₹ ${item*search.price}</h3>
            </div>
            </div>
            </div>`
        }).join("");
    }
    else{
        cartdiv.innerHTML=``;
        label.innerHTML=
        `<h2>Cart is Empty</h2>
        <a href="index.html">
        <button class="hb">Back to home</button>
        </a>`;
    }
};

generateCart();

const increment=(id)=>{
    let selectedid=id;
    let search=basket.find((x)=>x.id===selectedid.id);
    if(search===undefined)
    {
        basket.push({id:selectedid.id,item:1});
    }else{
        search.item+=1;
    }
    generateCart();
    update(selectedid.id);
    localStorage.setItem("data",JSON.stringify(basket));
};

const decrement=(id)=>{
    let selectedid=id;
    let search=basket.find((x)=>x.id===selectedid.id);
    if(search===undefined) return;
    else if(search.item===0)
    {
        return;
    }else{
        search.item-=1;
    }
    update(selectedid.id);
    basket=basket.filter((x)=>x.item!==0);
    generateCart();
    localStorage.setItem("data",JSON.stringify(basket));
};

let update=(id)=>{
    let search=basket.find((x)=> x.id===id);
    document.getElementById(id).innerHTML=search.item;
    calculation();
};

const removeItem=(id)=>{
    let selecteditem=id;
    basket=basket.filter((x)=>x.id!==selecteditem.id);
    generateCart();
    localStorage.setItem("data",JSON.stringify(basket));
};

const TakeAmount=()=>{
    if(basket.length!==0)
    {
        let amn=basket.map((x)=>{
            let {item,id}=x;
            let search=shopitems.find((y)=>y.id===id) || [];
            return item*search.price;
        }).reduce((x,y)=>x+y,0);
        label.innerHTML=`<h2>Total Bill: ₹ ${amn}</h2>
        <button class="co">Checkout</button>
        <button class="ca">Clear cart</button>`;
    }
    else return;
};

TakeAmount();