let cart = [];
let size = [
    { id: 1, size: 'S' }, { id: 2, size: 'M' }, { id: 3, size: 'L' },
]
let textDeleteAll = document.querySelector('.text-alldelete-items');
const cartQuantity = document.querySelector('.cart-quantity');
const tableEl = document.querySelector('table');
updateQuantity();
function loadProductCheckOut() {
    let tbodyEl = document.createElement('tbody');
    tbodyEl.classList.add('tbody');
    tableEl.appendChild(tbodyEl);
    let storage = localStorage.getItem('orderFood');
    if (storage) {
        cart = JSON.parse(storage)
        console.log(cart);
    }
    deleteAllItem();
    cart.forEach(function (item) {
        const trEl = document.createElement('tr');
        trEl.setAttribute('data-id', item.id);
        trEl.classList.add('cart-item-checkout');
        tbodyEl.appendChild(trEl);
        trEl.innerHTML += `<tr>
        <td class="id-product-checkout hidden">${item.id}</td>
        <td>
            <div class="checkout-infor-product">
                <div class="checkout-img">
                    <img src="${item.imgUrl}" alt="">
                </div>
                <div class="checkout-content">
                    <h5>${item.name}</h5>
                    <div class="select">
                    <p> size: </p>
                        <select class="option" id="option">
                        <option id="selectSize" class="selectSize" value="S">${item.size}</option>
                            <option id="selectSize" class="selectSize" value="S">S</option>
                            <option id="selectSize" class="selectSize" value="M">M</option>
                            <option id="selectSize" class="selectSize" value="L">L</option>
                        </select>
                    </div>
                </div>
            </div>
        </td>
        <td>
            <div class="counter">
                <input class="cart-quantity-input" type="number" value="${item.quantity}">
            </div>
        </td>
        <td class="price-checkout">${item.prices}</td>     
        <td><button class="btn-addtocart"><ion-icon name="close-outline"></ion-icon></button> </td> 
    </tr>`

        updateCartTotal();

        trEl.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
        const btnRemoveEl = trEl.querySelector('button');
        btnRemoveEl.addEventListener('click', function () {
            deleteProductsInCart(item);
            trEl.remove();
            updateQuantity();
            deleteAllItem();
            updateCartTotal();

        })
        textDeleteAll.addEventListener('click', function () {
            getItemLocal();
            if (confirm("Đồng ý xoá tất cả sản phẩm")) {
                cart.splice(0, cart.length);
                trEl.remove();
                localStorage.setItem("orderFood", JSON.stringify(cart));
                updateQuantity();
                textDeleteAll.classList.add('hidden')
            } else {
                return;
            }


        })

    })

    console.log(cart)

}
function loadModalSucess() {

}
function deleteProductsInCart(item) {
    let deleteProduct = null;
    for (let i = 0; i <= cart.length; i++) {
        if (cart[i].id === item.id) {
            deleteProduct = i;
            break;
        }
    }
    if (deleteProduct !== null) {
        cart.splice(deleteProduct, 1);
        if (cart.length === 0) {

        }

    }
    localStorage.setItem("orderFood", JSON.stringify(cart));
}
function totalProductInCart() {
    let textModal = document.querySelector('.text-modal-sucess');
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total = total + (cart[i].price * cart[i].quantity);
    }
    textModal.textContent = `${total.toFixed(2)}đ`;

}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    // window.location.reload();

    updateCartTotal();
    updateQuantity();
}
function updateCartTotal() {

    let tbodyEl = document.getElementsByClassName('tbody')[0];
    let trEL = tbodyEl.getElementsByClassName('cart-item-checkout');

    let handleChangeSize = document.getElementsByName("option");
    let total = 0;
    let a;
    let b;
    let selectSizes;
    let selectEl;
    let priceElement;
    let id;

    let quantityElement;

    for (let i = 0; i < trEL.length; i++) {
        let trEl = trEL[i];
        let idEl = trEl.getElementsByClassName('id-product-checkout')[0];
        id = parseFloat(idEl.innerText.replace('$', ''));
        priceElement = trEl.getElementsByClassName('price-checkout')[0]
        quantityElement = trEl.getElementsByClassName('cart-quantity-input')[0]
        let price = parseFloat(priceElement.innerText.replace('$', ''))
        let quantity = quantityElement.value
        total = total + (price * quantity);
        let QuantityNumber = Number(quantity);


        selectEl = trEl.getElementsByClassName('option')[0];
        const target = cart.find(element => element.id === id);
        if (target) {
            target.quantity = QuantityNumber;
            localStorage.setItem("orderFood", JSON.stringify(cart));
        } else {
            return;
        }

    }

    cart.forEach(function (item) {
        a = item.size;
        selectSizes = item.sizes;
    })
    selectSizes.forEach(function (item) {
        b = item.size;
        // if (a !== b) {
        //     selectEl.innerHTML += `<option id="selectSize" class="selectSize" value="${b}">${b}</option>`
        // }

    })

    selectEl.addEventListener('change', (e) => {


        selectSizes.forEach(function (item) {
            if (e.target.value === item.size) {
                priceElement.innerHTML = `${item.price}`;
                const targett = cart.find(element => element.id === id);
                if (targett) {
                    targett.size = item.size;
                    targett.prices = item.price;
                    localStorage.setItem("orderFood", JSON.stringify(cart));
                }
            } else {
                return;
            }
        })
        let totall = 0;
        cart.forEach(function (item) {
            totall = totall + (item.prices) * (item.quantity);


        })
        console.log(totall);
        document.getElementsByClassName('total-price-pay')[0].innerText = 'THÀNH TIỀN: ' + totall
    })




    localStorage.setItem("orderFood", JSON.stringify(cart));
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('total-price-pay')[0].innerText = 'THÀNH TIỀN: ' + total
}
let purchase = [];
function getCart() {
    let storage = localStorage.getItem('orderFood');
    if (storage) {
        cart = JSON.parse(storage)
    }
    return cart;
}
let modalSucess = document.querySelector('.modal-success');
const form = document.querySelector('form')
function getInputConfirm() {


    let purchaseJS = document.querySelector('.btn-purchaseJS');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (cart.length > 0) {
            localStorage.setItem("cart", JSON.stringify(purchase));
            modalSucess.classList.add('appear');
            totalProductInCart();
            localStorage.removeItem("orderFood");
            eventCancel();
        } else {
            notify();
        }
        let fullNameForm = document.getElementById("fullNameForm").value;
        let numberPhoneForm = document.getElementById('numberPhoneForm').value;
        let addressForm = document.getElementById('addressForm').value;
        let noteForm = document.getElementById('noteForm').value;
        let couponForm = document.getElementById('couponForm').value;


        getCart();
        const product = {
            ...cart,
            fullNameForm: fullNameForm,
            numberPhoneForm: numberPhoneForm,
            addressForm: addressForm,
            noteForm: noteForm,
            couponForm: couponForm,
        }
        purchase.push(product)


    })
}
const btnClose = document.querySelector('.close-btn-Sucess');
function eventCancel() {

    btnClose.addEventListener('click', function () {
        modalSucess.classList.remove("appear");
        location.replace("index.html");

    })
}
function notify() {
    const notify = document.querySelector('.notify');
    const message = notify.querySelector('.message');
    notify.classList.remove('hidden');
    message.textContent = 'Chưa có sản phẩm nào được thêm vào giỏ hàng';
    setTimeout(hideEl, 5000);
}
function hideEl() {
    notify.classList.add('hidden');

}
function updateQuantity() {
    let totalQuantity = 0;
    getItemLocal();
    for (let i = 0; i < cart.length; i++) {
        totalQuantity = totalQuantity + cart[i].quantity;
    }
    cartQuantity.textContent = totalQuantity;
    console.log(totalQuantity);
}
function getItemLocal() {
    let storage = localStorage.getItem("orderFood");
    if (storage) {
        cart = JSON.parse(storage)
    }
    return cart;
}


function deleteAllItem() {
    getItemLocal();
    for (let i = 0; i < cart.length; i++) {
        if (cart.length > 0) {
            textDeleteAll.classList.remove('hidden')
        } else {
            textDeleteAll.classList.add('hidden')
        }
    }
}
// function checkedOptionSize() {
//     let test;
//     getItemLocal();
//     cart.forEach((item) => {

//     })
// }
loadProductCheckOut();
getInputConfirm();

