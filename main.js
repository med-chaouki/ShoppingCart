
const products = [
    {
        image: './img/zidane.webp', 
        desc: '2004/05 REAL MADRID ZIDANE #5 AWAY SHIRT (XL) ADIDAS',
        price: 1434 ,
        currency: ' DH',
        quantity: 1,
        favorite: false 
    },
    {
        image:'./img/cr7.webp',
        desc: '2012/13 REAL MADRID RONALDO #7 C/L SHIRT ADIDAS',
        price: 1564 ,
        currency: ' DH',
        quantity: 1,
        favorite: true 
    },
    {
        image:'./img/arsonal.webp',
        desc: '2008/10 ARSENAL HOME SHIRT (M) SHIRT (XXL) NIKE',
        price: 913 ,
        currency: ' DH',
        quantity: 1,
        favorite: true 
    },
    {
        image:'./img/batistuta.webp',
        desc: '2002/04 ARGENTINA BATISTUTA #9 AWAY SHIRT (XL) ADIDAS',
        price: 1955 ,
        currency: ' DH',
        quantity: 1,
        favorite: true 
    },
    {
        image:'./img/bayer.webp',
        desc: '2008/09 BAYERN MUNICH HOME SHIRT (XL) ADIDAS',
        price: 662,
        currency: ' DH',
        quantity: 1,
        favorite: true 
    },
    {
        image:'./img/betis.webp',
        desc: '1999/2000 REAL BETIS INUI #8 AWAY SHIRT (XXXL) KAPPA',
        price: 848 ,
        currency: ' DH',
        quantity: 1,
        favorite: false 
    },
    {
        image:'./img/casillas.webp',
        desc: '2008/09 REAL MADRID I.CASILLAS #1 GK ADIDAS',
        price: 913 ,
        currency: ' DH',
        quantity: 1,
        favorite: true 
    },
    {
        image:'./img/figo.webp',
        desc: '2002/03 REAL MADRID FIGO #7 HOME SHIRT (M) ADIDAS',
        price: 1500 ,
        currency: ' DH',
        quantity: 1,
        favorite: true 
    },
    {
        image:'./img/flamingo.webp',
        desc: '1995/96 FLAMENGO *CENTENARY* SHIRT UMBRO',
        price: 1630 ,
        currency: ' DH',
        quantity: 1,
        favorite: false 
    },
    {
        image:'./img/italy.webp',
        desc: '1995/96 ITALY HOME SHIRT (L) ITALY HOME SHIRT (L)',
        price: 2234 ,
        currency: ' DH',
        quantity: 1,
        favorite: true 
    },
    {
        image:'./img/lazio.webp',
        desc: '2015/16 LAZIO AWAY SHIRT (S) MACRON LAZIO AWAY SHIRT',
        price: 1043 ,
        currency: ' DH',
        quantity: 1,
        favorite: true 
    },
    {
        image:'./img/lens.webp',
        desc: '1999/00 RC LENS HOME SHIRT (L) UMBRO LENS HOME SHIRT (L)',
        price: 700,
        currency: ' DH',
        quantity: 1,
        favorite: false 
    },
    {
        image:'./img/mexico.webp',
        desc: '1998 MEXICO RE-ISSUE *BNWT* HOME SHIRT ABA SPORT',
        price: 1304,
        currency: ' DH',
        quantity: 1,
        favorite: false 
    },
    {
        image:'./img/pirlo.webp',
        desc: '2011/12 JUVENTUS PIRLO #21 HOME SHIRT (L) NIKE',
        price: 1955,
        currency: ' DH',
        quantity: 1,
        favorite: true 
    },
    {
        image:'./img/ramos.webp',
        desc: '2006/07 REAL MADRID *BNWT* HOME SHIRT (M) ADIDAS',
        price: 980,
        currency: ' DH',
        quantity: 1,
        favorite: true 
    },
];



// Get references to the popup and close button
const popup = document.getElementById('popup');
const closeButton = document.getElementById('close-popup-button');
const openButton = document.getElementById('open-popup-button');
const productContainer = document.getElementById('product-container');
const popupContent = document.getElementById('popup-content');
const productQuantity = document.getElementById('product-quantity');
const quantity = document.getElementById('quantity');


// Define a cart object to store product quantities
const cart = {};

// Function to open the popup
function openPopup() {
    popup.style.display = 'block';
}

// Function to close the popup
function closePopup() {
    popup.style.display = 'none';
}

// Function to render products
function renderProducts() {
    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        // Create the heart icon
        const icon = document.createElement('i');
        icon.classList.add('fa', 'fa-heart');
        if (product.favorite) {
            icon.classList.add('favorite');
        } else {
            icon.classList.add('not-favorite');
        }
        icon.addEventListener('click', () => toggleFavorite(index));

        // Create the "Add to Cart" button
        const addToCartBtn = document.createElement('button');
        addToCartBtn.textContent = 'Add to Cart';
        addToCartBtn.classList.add('cartBtn');
        addToCartBtn.addEventListener('click', () => addToCart(index));

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.desc;

        const h3 = document.createElement('h3');
        h3.textContent = product.desc;

        const h1 = document.createElement('h1');
        h1.textContent = product.price;
        h1.classList.add('currency');

        const span = document.createElement('span');
        span.textContent = product.currency;

        productDiv.appendChild(icon);
        productDiv.appendChild(img);
        productDiv.appendChild(h3);
        productDiv.appendChild(h1);
        h1.appendChild(span);
        productDiv.appendChild(addToCartBtn);

        productContainer.appendChild(productDiv);
    });

}


// Function to add a product to the cart
// Function to create a valid ID from the product description
function createValidId(description) {
    return description.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();
}

// Function to add a product to the cart
// Function to create a valid ID from the product description
function createValidId(description) {
    const sanitizedDescription = description.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();
    return `product-${sanitizedDescription}`;
}

// Function to add a product to the cart
function addToCart(index) {
    const product = products[index];
    const productId = createValidId(product.desc);

    if (!cart[productId]) {
        cart[productId] = { product, quantity: 1 };
        createCartItem(productId);
    } else {
        cart[productId].quantity++;
        updateCartItemQuantity(productId);
    }

    updateCartQuantity();
    updateCartTotal();
    updatePrice(productId);
    
}


function createCartItem(productId) {
    const cartItem = cart[productId];
    const productDiv = document.createElement('div');
    productDiv.classList.add('productCart');
    productDiv.id = productId;

    const img = document.createElement('img');
    img.src = cartItem.product.image;
    img.alt = cartItem.product.desc;

    const div = document.createElement('div');
    div.classList.add('producteList');


    const h3 = document.createElement('h3');
    h3.innerHTML = `Price: ${cartItem.product.price} ${cartItem.product.currency}`;
    h3.classList.add('currency');
    h3.classList.add('price');


    // const span = document.createElement('span');
    // span.textContent = cartItem.product.currency;

    const quantityContainer = document.createElement('div');
    quantityContainer.classList.add('quantity-container');


    const minusBtn = document.createElement('button');
    minusBtn.textContent = '<';
    minusBtn.classList.add('quantity-button', 'minus-button');
    minusBtn.addEventListener('click', () => {
        decreaseQuantity(productId);
        updateCartQuantity();
        updatePrice(productId); // Update the total price
        h3.innerHTML = `Price: ${cartItem.price} ${cartItem.product.currency}`; // Update displayed price
    
    });

    const plusBtn = document.createElement('button');
    plusBtn.textContent = '>';
    plusBtn.classList.add('quantity-button', 'plus-button');
    plusBtn.addEventListener('click', () => {
        increaseQuantity(productId);
        updateCartQuantity();
        updatePrice(productId); // Update the total price
        h3.innerHTML = `Price: ${cartItem.price} ${cartItem.product.currency}`; // Update displayed price
    
    });

    
    const quantity = document.createElement('h3');
    quantity.innerHTML = `Quantity: `;

    const quantityu = document.createElement('h3');
    quantityu.innerHTML = `<span class="quantity">${cartItem.quantity}</span>`;

    const addToCartBtn = document.querySelectorAll('.cartBtn');
    addToCartBtn.forEach((addToCartBtn, index) => {
        addToCartBtn.addEventListener('click', () =>{
        updatePrice(productId); // Update the total price
        h3.innerHTML = `Price: ${cartItem.price} ${cartItem.product.currency}`; // Update displayed price
    })
});


const removeBtn = document.createElement('i');
removeBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
removeBtn.addEventListener('click', () => removeFromCart(productId));

 
console.log(addToCartBtn)

    quantityContainer.appendChild(quantity);
    quantityContainer.appendChild(minusBtn);
    quantityContainer.appendChild(quantityu);
    quantityContainer.appendChild(plusBtn);

    div.appendChild(h3);
    div.appendChild(quantityContainer);
    // h3.appendChild(span);

    productDiv.appendChild(img);
    productDiv.appendChild(div);
    productDiv.appendChild(removeBtn);
    popupContent.appendChild(productDiv);
}


// Function to update cart item quantity
function updateCartItemQuantity(productId) {
    const cartItem = cart[productId];
    const quantitySpan = document.querySelector(`#${productId} .quantity`);
    quantitySpan.textContent = cartItem.quantity;
}

// Function to update the cart quantity displayed in the icon
function updateCartQuantity() {
    const totalQuantity = Object.values(cart).reduce((total, item) => total + item.quantity, 0);
    productQuantity.innerText = totalQuantity;
    quantity.style.display = totalQuantity > 0 ? 'flex' : 'none';
}

// Event listeners
openButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

// Initialize the product list
renderProducts();
updateCartQuantity()


// Function to toggle product favorite status
function toggleFavorite(index) {
    products[index].favorite = !products[index].favorite;
}


const product = document.querySelectorAll('.product');
console.log(product);
const icons = document.querySelectorAll('.fa-heart');

icons.forEach((icon, index) => {
    icon.addEventListener('click', () => {
        const computedStyle = window.getComputedStyle(icon);
        const color = computedStyle.getPropertyValue('color');
        if(color === 'rgb(0, 0, 0)'){
            icon.style.color = '#fb0017'
            console.log('Color:', color);
        }else{ 
            icon.style.color = '#000000'
        }
        
    });
});

// Function to increase the quantity of an item in the cart
function increaseQuantity(productId) {
    if (cart[productId]) {
        cart[productId].quantity++;
        updateCartItemQuantity(productId);
        updateCartItemQuantity(productId);
        updateCartTotal();
    }
}

// Function to decrease the quantity of an item in the cart
function decreaseQuantity(productId) {
    if (cart[productId] && cart[productId].quantity > 1) {
        cart[productId].quantity--;
        updateCartItemQuantity(productId);
        updateCartItemQuantity(productId);
        updateCartTotal();
    }
}


// Function to update the total price in the shopping cart
function updateCartTotal() {
    const cartItems = Object.values(cart);
    let total = 0;

    cartItems.forEach((cartItem) => {
        const itemTotal = cartItem.product.price * cartItem.quantity;
        total += itemTotal;
    });

    const totalElement = document.getElementById('cart-total');
    totalElement.textContent = `Total: ${total} DH`;
}


const updatePrice = (productId) => {
    const cartItem = cart[productId];
    cartItem.price = cartItem.quantity * cartItem.product.price;
}

function removeFromCart(productId) {
    if (cart[productId]) {
        
        delete cart[productId];
        
        const cartItemElement = document.getElementById(productId);
        if (cartItemElement) {
            cartItemElement.remove();
        }
       
        updateCartQuantity();
        updateCartTotal();
    }
}
