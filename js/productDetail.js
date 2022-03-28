const listItem = document.querySelector('.item-product__page');


function innit() {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    let id = urlParams.get('id');
    let = result = Number(id)
    console.log(result);
    if (!id) {
        return null;
    }
    data.forEach(function (item) {
        if (item.id === result) {
            displayProductItem(item);
        }
    })


}
function displayProductItem(item) {
    updateQuantity();
    const divEl = document.createElement('div');
    divEl.classList.add('items-product');
    divEl.innerHTML = ` <div class="colum-left__product">
    <div class="img--product">
        <img class="img--product__main" src="${item.imgUrl}" alt="caphesua">
        <img data-id="" class="img--product__detail" src="${item.imgUrl2}" alt="caphesua">
    </div>
    <div class="decription--product">
        <p>${item.description}</p>
    </div>
</div>
<div class="colum-right__product">
    <div class="heading--detail__product">
        <h1>${item.name} </h1>
        <div class="price-quality__product">
            <span>${item.price.toFixed(2)}đ</span>
            <div class="counter">
                <span class="down" onClick='decreaseValue(event, this)'>-</span>
                    <input id="ipQuantity"  type="text" value="1" disabled>
                        <span class="up"  onClick='increaseValue(event, this)'>+</span>
                </div>
        </div>
    </div>
    <div class="select-size">
        <div class="card-product__option">
            <span>CHỌN SIZE(BẮT BUỘC)</span>
        </div>
        <div class="card-product__option-item">
            <div class="control-size__option_item">
                <input type="radio" name="sizeRadio" id="S" value="S">
                <label for="small">Nhỏ</label>
            </div>
            <div class="control-size__option_item">
                <input checked type="radio" name="sizeRadio" id="M" value="M">
                <label for="normal">Trung bình</label>
            </div>
            <div class="control-size__option_item">
                <input type="radio" name="sizeRadio" id="L" value="L">
                <label for="big">Lớn</label>
            </div>
        </div>
    </div>
    <Button onclick="window.location.href='/payment.html'" class="btn-addItem__product">Mua ngay</Button>
</div>`

    listItem.appendChild(divEl);
    let btnAddtocart = divEl.querySelector('.btn-addItem__product');
    btnAddtocart.addEventListener('click', () => { addToCart(item) })

    return listItem;


}

innit();