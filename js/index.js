

var account = JSON.parse(localStorage.getItem('account'));
if (account === null) {
    account = [];
    var account = [{
        id: 0,
        username: "admin",
        password: "123456",
        level: 1
    }, {
        id: 1,
        username: "b",
        password: "b",
        level: 0
    }, {
        id: 2,
        username: "a",
        password: "a",
        level: 0
    }];
    localStorage.setItem("account", JSON.stringify(account));
}
const testSearch = ["Chanel", "Gucci", "Vuiton", "Mec", "Honda", "Yamaha", "Hondad"]
const groupSearchInput = document.querySelector('.group-search-input');
const searchInput = document.querySelector('.search-input');

let cartModal = [];
const listProduct = document.getElementById('list-product');
// const cartList = document.getElementById('cart-modal');
// const textEmpty = cartList.querySelector('.empty-cart');
const cartDialog = document.querySelector('.cart-dialog');
const notifyEl = document.querySelector('.notify');


const cartQuantity = document.querySelector('.cart-quantity');

// searchInput.onkeyup = (e) => {
//     let userData = e.target.value;
//     let emptyArray = [];
//     if (userData) {
//         emptyArray = testSearch.filter((data) => {
//             return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
//         })
//         emptyArray = emptyArray.map((data) => {
//             // passing return data inside li tag
//             return data = '<li>' + data + '</li>'
//         });
//         console.log(emptyArray);
//     }

// }
// function showSuggestions(list) {
//     let listData;
//     if (!list.length) {
//         userValue = inputBox.value;
//         listData = `<li>${userValue}</li>`;
//     } else {
//         listData = list.join('');
//     }
//     suggBox.innerHTML = listData;
// }

function displayProduct() {

    data.forEach(function (item) {
        const divEl = document.createElement('div');
        divEl.classList.add('item-product');
        listProduct.appendChild(divEl);
        divEl.innerHTML = `<div class="image-product">
        <img  src="${item.imgUrl}" alt="hinhanh">
        <img class="imgJs" src="${item.imgUrl2}" alt="hinhanh">
        
    </div>
    <div class="heading-product">
        <h4>${item.name}</h4>
    </div>
    <div class="detail-product">
        <p class="price-product">${item.price.toFixed(2)}đ</p>
       
        <button class="btn-cart__dialog btn-addtocart">
            <ion-icon name="cart-outline"></ion-icon>
        </button>
    </div>`

        updateQuantity();
        const imgEL = divEl.querySelector('.imgJs');
        imgEL.addEventListener('click', function () {
            window.location.href = './product.html?id=' + item.id;
        })

        const buttonCartEl = divEl.querySelector('.btn-cart__dialog');
        buttonCartEl.addEventListener('click', () => { modalAddToCart(item) });

    })
}


// cartQuantity.classList.add('hidden');
// cartQuantity.classList.remove('hidden');


function modalAddToCart(item) {
    document.querySelector('.modal-cartJS').classList.add("appear");

    const divEl = document.createElement('div');
    cartDialog.appendChild(divEl);
    divEl.classList.add('.cart-dialog__item');
    divEl.innerHTML = ` <div class="header-dialog">
    <div class="close-btn closeJs">
        <ion-icon name="close-outline"></ion-icon>
    </div>
    <div class="heading-dialog">
        <h5>Thêm món mới</h5>
    </div>
</div>
<div class="item-product__dialog">
    <div class="img-product__dialog">
        <img src="${item.imgUrl}" alt="">
    </div>
    <div class="info-product__dialog">
        <h2 class="name-product__dialog">
           ${item.name}
            </h1>
            <p>${item.description}</p>
            <div class="price-quanity__product__dialog">
                <span class="price-dialog-js">${item.price.toFixed(2)}đ</span>
                <div class="counter">
                <span class="down" onClick='decreaseValue(event, this)'>-</span>
                    <input id="ipQuantity"  type="text" value="1" disabled>
                        <span class="up"  onClick='increaseValue(event, this)'>+</span>
                </div>
            </div>
    </div>
</div>
<div class="select-size">
    <div class="card-product__option">
        <span>CHỌN SIZE(BẮT BUỘC)</span>
    </div>
    <div class="card-product__option-item">
        <div class="control-size__option_item">
            <input type="radio" name="sizeRadio" checked="checked" id="small" value="S">
            <label for="small">Nhỏ</label>
        </div>
        <div class="control-size__option_item">
            <input type="radio" name="sizeRadio" id="normal"  value="M">
            <label for="normal">Trung bình</label>
        </div>
        <div class="control-size__option_item">
            <input type="radio" name="sizeRadio" id="big" value="L">
            <label for="big">Lớn</label>
        </div>
    </div>
</div>
<div class="modal-footer__dialog">
    <button class="btn-addItem__product">Thêm vào giỏ hàng</button>
</div>`
    let btncloseEl = cartDialog.querySelector('.closeJs');
    btncloseEl.addEventListener('click', function () {
        document.querySelector('.modal-cartJS').classList.remove("appear");
        divEl.remove();
    })
    const btnAddToCart = divEl.querySelector('.btn-addItem__product');
    btnAddToCart.addEventListener('click', () => {
        addToCart(item), document.querySelector('.modal-cartJS').classList.remove("appear");
        divEl.remove();
    })
    let pricedialog = divEl.querySelector('.price-dialog-js');

    let radioButtonSection = document.getElementsByName('sizeRadio');


    for (var i = 0; i < radioButtonSection.length; i++) {
        let a;
        let b;
        let c;
        radioButtonSection[i].onclick = function () {
            a = this.value;

            data.forEach(function (item) {
                b = item.sizes;
            })
            b.forEach(function (items) {
                c = items.size
                if (c === a) {
                    d = items.price;
                    pricedialog.textContent = `${items.price.toFixed(2)}đ`;
                } else {
                    return;
                }
            })
        }


    }
}

const modalCartJs = document.querySelector('.modal-cartJS');



function hideEl() {
    notifyEl.classList.add('hidden');
}




window.addEventListener('load', displayProduct);


