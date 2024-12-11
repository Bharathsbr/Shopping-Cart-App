const shop=document.getElementById("shop");

let basket=JSON.parse(localStorage.getItem("data")) || [];

const generateItems=()=>{
    return shop.innerHTML=shopitems.map((x)=>{
        let {id,name,des,img,price} = x;
        let search=basket.find((x)=>x.id===id) || [];
        return `<div id="product-id-${id} class="item">
            <img width="220" src=${img} alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${des}</p>
                <div class="price">
                    <h2>₹ ${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash"></i>
                        <div id=${id} class="quantity">${search.item===undefined?0:search.item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus"></i>
                    </div>
                </div>
            </div>
        </div>`
    }).join("")
};

generateItems();

const increment=(id)=>{
    let selectedid=id;
    let search=basket.find((x)=>x.id===selectedid.id);
    if(search===undefined)
    {
        basket.push({id:selectedid.id,item:1});
    }else{
        search.item+=1;
    }
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
    localStorage.setItem("data",JSON.stringify(basket));
};

let update=(id)=>{
    let search=basket.find((x)=> x.id===id);
    document.getElementById(id).innerHTML=search.item;
    calculation();
};

const calculation=()=>{
    let amount=document.getElementById("cartam");
    amount.innerHTML=basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
};
calculation();