/*Funciones generales*/

const hide = (element) => {
	return element.classList.add('is-hidden');
};
const show = (element) => {
	return element.classList.remove('is-hidden');
};
const normalize = (str) => {
	str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	str = str.toLowerCase();
	return str;
};
const showOverlay = () => {
	show(overlay);
};
const hiddeOverlay = () => {
	hide(overlay);
};
const bodyNoScroll = () => {
	document.body.classList.add('no-scroll');
};
const bodyScroll = () => {
	document.body.classList.remove('no-scroll');
};

/*Filtros*/

const inputSearch = document.querySelector('#input-search');
const products = document.getElementsByClassName('product');
const reviewFilters = document.getElementsByClassName('filter-review');
const categoryFilters = document.getElementsByClassName('filter-category');
const checkboxes = document.querySelectorAll('.filter');
const clearBtn = document.querySelector('.clear-btn');

/*-----------------------------------------------------------*/

const searchOn = () => {
	if (inputSearch.value.length !== 0) {
		return true;
	} else {
		return false;
	}
};
const categoryOn = () => {
	for (const filtro of categoryFilters) {
		if (filtro.checked) {
			return true;
		}
	}
	return false;
};
const reviewOn = () => {
	for (const filtro of reviewFilters) {
		if (filtro.checked) {
			return true;
		}
	}
	return false;
};

/*-----------------------------------------------------------*/

const passCategoryFilter = (product) => {
	const category = product.dataset.category;
	const categoryFilter = document.querySelector(`.filter-category[value="${category}"]`);
	return categoryFilter.checked;
};
const passReviewFilter = (product) => {
	const review = product.dataset.review;
	const reviewFilter = document.querySelector(`.filter-review[value="${review}"]`);
	return reviewFilter.checked;
};
const passInputSearch = (product) => {
	let name = product.dataset.name;
	let nameStandard = normalize(name);
	let inputSearchStandard = inputSearch.value;
	inputSearchStandard = normalize(inputSearchStandard);
	return nameStandard.includes(inputSearchStandard);
};

/*-----------------------------------------------------------*/

const passAllFilters = (product) => {
	return (
		(passCategoryFilter(product) || !categoryOn()) &&
		(passReviewFilter(product) || !reviewOn()) &&
		(passInputSearch(product) || !searchOn())
	);
};

/*-----------------------------------------------------------*/

let productsQty = document.getElementById('products-qty');

const updateQtyProducts = () => {
	let contador = 0;
	for (const product of products) {
		if (passAllFilters(product)) {
			contador++;
		}
	}
	productsQty.innerText = `Mostrando ${contador} producto(s) de ${products.length}`;
};

/*-----------------------------------------------------------*/

const showProducts = () => {
	for (const product of products) {
		hide(product); 
		if (passAllFilters(product)) {
			show(product);
		} else {
			hide(product);
		}
	}
};

/*-----------------------------------------------------------*/

const filterProducts = () => {
	showProducts();
	updateQtyProducts();
};

/*-----------------------------------------------------------*/

const clearSearchInput = () => {
  inputSearch.value = ''
};

const clearCheckboxesChequed = () => {
	for (let checkbox of checkboxes) {
		if (checkbox.checked) {
			checkbox.checked = false;
		}
	}
};

const showAllProducts = () => {
	for (let product of products) {
		show(product);
	}
};

/*Checkbox*/

for (let checkbox of checkboxes) {
	checkbox.onclick = () => {
		filterProducts();
	};
}

inputSearch.oninput = () => {
	filterProducts();
};

clearBtn.onclick = () => {
	clearCheckboxesChequed();
	clearSearchInput();
	showAllProducts();
	updateQtyProducts();
};

/*Listados*/

const btnGrid = document.querySelector('#view-button-grid');
const btnList = document.querySelector('#view-button-list');
const productsListContainer = document.querySelector('.products-list');
const productsDescriptions = document.querySelectorAll('.product-description');

/*-----------------------------------------------------------*/

showGrid = () => {
	productsListContainer.classList.remove('in-stack');
	productsListContainer.classList.add('in-grid');
	for (let p of products) {
		p.classList.remove('in-line-product');
	}
	for (let d of productsDescriptions) {
		hide(d);
	}
};

showList = () => {
	productsListContainer.classList.remove('in-grid');
	productsListContainer.classList.add('in-stack');
	for (let p of products) {
		p.classList.add('in-line-product');
	}
	for (let d of productsDescriptions) {
		show(d);
	}
};

/*-----------------------------------------------------------*/

btnGrid.onclick = () => {
	showGrid();
};

btnList.onclick = () => {
	showList();
};

/*Filtros responsive*/

const btnOpenFilters = document.querySelector('.open-filters-btn');
const btnCloseFilters = document.querySelector('.close-filters-btn');
const filtersAside = document.querySelector('.filters-aside');

btnOpenFilters.onclick = () => {
	filtersAside.classList.add('aside-responsive');
	filtersAside.classList.add('theme-sky-dark');
	filtersAside.style.display = 'block';
};

btnCloseFilters.onclick = () => {
	filtersAside.classList.remove('aside-responsive');
	filtersAside.classList.remove('theme-sky-dark');
	filtersAside.style.display = 'none';
};

/*Carrito*/

const btnOpenCart = document.querySelector('.btn-cart');
const btnCloseCart = document.querySelector('.btn-close');
const cart = document.querySelector('.header-menu-add-to-card');
const overlay = document.querySelector('.overlay');
const cartSubtotalOutput = document.querySelectorAll('.cart-subtotal-value');
const allBtnAddToCart = document.querySelectorAll('.button-add-to-cart');
const counterProducts = document.querySelectorAll('.cart-qty');
const cartFullMsg = document.querySelector('.cart-full');
const cartEmptyMsg = document.querySelector('.cart-empty');
const carrito = document.querySelector('.cart-products-added');

let subtotalProductsAdded = 0;

/*-----------------------------------------------------------*/

const showCart = () => {
	show(cart);
  cart.classList.remove('menu-add-to-card-hidde');
  cart.setAttribute('aria-hidden', false)
	for (let c of counterProducts) {
		if (c.innerText == 0) {
			hide(cartFullMsg);
			show(cartEmptyMsg);
		}
	}
};
const hiddeCart = () => {
  cart.classList.add('menu-add-to-card-hidde');
  cart.setAttribute('aria-hidden', true)
	hide(cart);
	show(cartFullMsg);
	hide(cartEmptyMsg);
};

/*-----------------------------------------------------------*/

const addCounterCart = () => {
	for (let c of counterProducts) {
		let counterNumber = Number(c.innerText);
		counterNumber++;
		c.innerText = counterNumber;
	}
};
const subtractCounterCart = () => {
	for (let c of counterProducts) {
		let counterNumber = Number(c.innerText);
		counterNumber--;
		c.innerText = counterNumber;
	}
};

const knowProduct = (btn,list) => {
	for (let x of list)
		if (x.dataset.id === btn.getAttribute('id')) {
			console.log(x.dataset.id)
			console.log(btn.getAttribute('id'))
			console.log(x.dataset.id === btn.getAttribute('id'))
			return x;
		}
};

const addSubtotal = (subtotal) => {
	subtotalProductsAdded = subtotalProductsAdded + Number(subtotal);
	for (let c of cartSubtotalOutput) {
		c.innerText = subtotalProductsAdded;
	}
};

const subtractSubtotal = (subtotal) => {
	subtotalProductsAdded = subtotalProductsAdded - Number(subtotal);
	for (let c of cartSubtotalOutput) {
		c.innerText = subtotalProductsAdded;
	}
};

addPriceToSubtotal = (btnAddToCart) => {
	let productAdded = knowProduct(btnAddToCart, products);
	let subtotal = productAdded.dataset.price;
	addSubtotal(subtotal);
};

const obtenerPlantillaProductoAgregado = (id, nombre, precio, imagen) => {
	return `<article class="cart-product-added" data-id="${id}" data-qty="1" data-price=${precio}>
    <img src="${imagen}" alt="" class="cart-product-img" />
    <div class="cart-product-details">
      <div class="cart-product-info">
        <h3 class="cart-product-name">${nombre}</h3>
        <button  type="button" class="remove-from-cart-btn" id="${id}"><i class="far fa-trash-alt"></i></button>
      </div>
      <div class="cart-product-price-qty">
        <label>
          <input data-precio="${precio}" type="number" min="0" value="1" class="cart-product-qty" />
          unidades
        </label>
        <p class="cart-product-price">x $${precio}</p>
      </div>
    </div>
  </article>`;
};

const showProductOnCart = (btnAddToCart) => {
	let productAdded = knowProduct(btnAddToCart, products);
	const plantilla = obtenerPlantillaProductoAgregado(
		productAdded.dataset.id,
		productAdded.dataset.name,
		productAdded.dataset.price,
		productAdded.dataset.image
	);
	carrito.innerHTML += plantilla;
	
};

/*-----------------------------------------------------------*/

btnOpenCart.onclick = () => {
	showOverlay();
	overlay.style.zIndex = '2';
	bodyNoScroll();
	showCart();
};

btnCloseCart.onclick = () => {
	hiddeOverlay();
	overlay.style.zIndex = '1';
	bodyScroll();
	hiddeCart();
};

/*-----------------------------------------------------------*/

const removeProductOfTheList = (btnRemove) => {
	const allProductsAdded = document.querySelectorAll(".cart-product-added")	
	console.log(allProductsAdded)

	let productToRemove = knowProduct(btnRemove, allProductsAdded)

	let subtotal = productToRemove.dataset.price;
	console.log(subtotal)
	subtractSubtotal(subtotal)
	subtractCounterCart()
	productToRemove.remove();
	listenEventsOnCart();
};

const addProductToTheCartList = (inputQty) => {
	let qty = inputQty.getAttribute('value');
	console.log(qty)
	let subtotal = Number(inputQty.dataset.precio) * qty;
	console.log(subtotal)
	addSubtotal(subtotal);
	addCounterCart();
	listenEventsOnCart();
};

/*-----------------------------------------------------------*/

const listenEventsOnCart = () => {
	const allBtnRemove = document.querySelectorAll('.remove-from-cart-btn');
	console.log(allBtnRemove)
	const allInputsProductQty = document.querySelectorAll('.cart-product-qty');

	for (btnRemove of allBtnRemove) {
		btnRemove.onclick = () => {
			console.log(btnRemove)
			removeProductOfTheList(btnRemove);
		};
	}

	for (inputQty of allInputsProductQty) {
		inputQty.onchange = () => {
			console.log("apretaste sumar producto")
			addProductToTheCartList(inputQty);
		};
	}
};

/*-----------------------------------------------------------*/

for (let btnAddToCart of allBtnAddToCart) {
	btnAddToCart.onclick = () => {
		addCounterCart();
		addPriceToSubtotal(btnAddToCart);
		showProductOnCart(btnAddToCart);
		listenEventsOnCart();
		Toastify({
			text: 'Producto agregado al carrito!',
			duration: 2000,
		}).showToast();
	};
}

/*Modales carrito*/

const btnOpenModalEmptyCart = document.querySelector('.btn-empty-cart');
const modalEmptyCart = document.querySelector('.modal-empty-cart');
const btnConfirmEmptyCart = document.querySelector('.confirm-cart-empty-btn');
const btnCancelEmptyCart = document.querySelector('.cancel-empty-cart-btn');

/*-----------------------------------------------------------*/

resetCounterCart = () => {
	for (let c of counterProducts) {
		c.innerText = '0';
	}
};

resetPriceToSubtotal = () => {
	subtotalProductsAdded = 0;
	for (let c of cartSubtotalOutput) {
		c.innerText = subtotalProductsAdded;
	}
};

hideAllProductsOnCart = () => {
	carrito.innerHTML = '';
};

const openModalEmptyCart = () => {
  show(modalEmptyCart);
  modalEmptyCart.setAttribute('aria-hidden', false)
};

const emptyCartConfirm = () => {
	resetCounterCart();
	resetPriceToSubtotal();
	hideAllProductsOnCart();
	showCart();
  hide(modalEmptyCart);
  overlay.style.zIndex = 2
  modalEmptyCart.setAttribute('aria-hidden', true)
};

/*-----------------------------------------------------------*/

btnOpenModalEmptyCart.onclick = () => {
	openModalEmptyCart();
	showOverlay();
    bodyNoScroll();
  overlay.style.zIndex = 4
};
btnConfirmEmptyCart.onclick = () => {
	emptyCartConfirm();
	hiddeOverlay();
	bodyScroll();
	hide(modalEmptyCart);
	overlay.style.zIndex = '1';
};
btnCancelEmptyCart.onclick = () => {
	hiddeOverlay();
	bodyScroll();
	hide(modalEmptyCart);
	overlay.style.zIndex = '1';
};

/*Finalizar compra*/

const btnOpenCheckout = document.querySelector('.btn-buy');
const btnFinishBuy = document.querySelector('.btn-finish-buy');
const btnCancelBuy = document.querySelector('.btn-cancel-buy');
const menuCheckout = document.querySelector('.menu-checkout');

/*-----------------------------------------------------------*/

const showCheckout = () => {
  show(menuCheckout);
  menuCheckout.setAttribute('aria-hidden', false)
  overlay.style.zIndex = 4
};

const hiddeCheckout = () => {
  hide(menuCheckout);
  menuCheckout.setAttribute('aria-hidden', true)
};

btnOpenCheckout.onclick = () => {
	showOverlay();
	overlay.style.zIndex = '3';
	bodyNoScroll();
	showCheckout();
	getTotal();
};

let buyCounter = 0
btnFinishBuy.onclick = () => {
	hiddeOverlay();
	overlay.style.zIndex = '1';
  	bodyScroll();
  	resetCounterCart();
	resetPriceToSubtotal();
 	hideAllProductsOnCart();
  	resetOptionsPay()
	hiddeCheckout();
	hiddeCart();
	buyCounter = buyCounter+1
	localStorage.setItem(buyCounter, totalValueCalculated.toFixed(2))
};

btnCancelBuy.onclick = () => {
	hiddeOverlay();
	overlay.style.zIndex = '1';
	bodyScroll();
	hiddeCheckout();
	hiddeCart();
};

/*-----------------------------------------------------------*/

const allPayOptions = document.querySelectorAll('.pay-option');
const cashOption = document.querySelector('#cash-debit');
const creditOption = document.querySelector('#credit');
const deliveryOption = document.querySelector('#delivery');
const discountOption = document.querySelector('#discount');
const cartTaxValue = document.querySelector('.cart-tax-value');
const discountValue = document.querySelector('.cart-discount-value');
const deliveryValue = document.querySelector('.cart-delivery-value');
const cartTotalValue = document.querySelector('.cart-total-value');
const cartTax = document.querySelector('.cart-tax');
const discount = document.querySelector('.cart-discount');
const delivery = document.querySelector('.cart-delivery');

let cartTaxValueCalculated = 0;
let deliveryPrice = 0;
let discountCalculated = 0;
let cartTotalValueCalculated;
cartTotalValue.textContent = subtotalProductsAdded;

const getCartTax = () => {
	cartTaxValueCalculated = subtotalProductsAdded * 0.1;
};

const addDeliveryPrice = () => {
	deliveryPrice = 5000;
};

const getDiscount = () => {
	discountCalculated = -subtotalProductsAdded * 0.1;
};

getTotal = () => {
	if (creditOption.checked) {
		getCartTax();
		show(cartTax);
	} else {
		cartTaxValueCalculated = 0;
		hide(cartTax);
	}
	if (deliveryOption.checked) {
		addDeliveryPrice();
		show(delivery);
	} else {
		deliveryPrice = 0;
		hide(delivery);
	}
	if (discountOption.checked) {
		getDiscount();
		show(discount);
	} else {
		discountCalculated = 0;
		hide(discount);
	}

	cartTaxValue.textContent = cartTaxValueCalculated.toFixed(2);
	deliveryValue.textContent = deliveryPrice.toFixed(2);
	discountValue.textContent = discountCalculated.toFixed(2);

	totalValueCalculated = subtotalProductsAdded + deliveryPrice + discountCalculated + cartTaxValueCalculated;
	cartTotalValue.textContent = totalValueCalculated.toFixed(2);
};
for (let payOption of allPayOptions) {
	payOption.onclick = () => {
		getTotal();
	};
}

const resetOptionsPay = () => {
 cashOption.checked = true
 creditOption.checked = false 
 deliveryOption.checked = false
 discountOption.checked = false
}

/*Storage de produtos*/

const productos = [
	{articulo : 'Playstation 5' , precio : 1200000},
	{articulo : 'Playstation 4' , precio : 650000},
	{articulo : 'God of war: Ragnarok' , precio : 88000},
	{articulo : 'Auricular Sony' , precio : 348000},
	{articulo : 'Nintendo Switch' , precio : 713000},
	{articulo : 'Hogwarts Legacy' , precio : 110000},
	{articulo : 'Estacion de carga' , precio : 106000},
	{articulo : 'Fire emblem' , precio : 53000},
	{articulo : 'AC: Mirage' , precio : 90000}
]

const saveStorage = (key, value) => {
	localStorage.setItem(key, value);
}

for (const product of productos) {
	saveStorage(product.articulo, JSON.stringify(product));	
}

/*Fetch*/

const topContainer = document.getElementById('list');

fetch('/docs/topgames.json')
	.then((response) => response.json())
	.then((games) => {
		games.forEach((game) => {
			const li = document.createElement('li');

			li.innerHTML = `
				<h3>${game.name}</h3>
				<p>Disponible para ${game.console}</p>
			`
			topContainer.appendChild(li)
		})
	})