let selectedSize = null;
let currentProduct = null;
let selectedProducts = [];
let pendingProduct = null;
const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));

if (productId) {

    currentProduct =
    products.find(p => p.id === productId);

const product = currentProduct;

    if (product) {

        document.getElementById("product-name").textContent =
            product.name;

        document.getElementById("product-price").textContent =
            product.price + " ل.س جديدة";

        document.getElementById("product-description").textContent =
            product.description;

        const mainImage =
            document.getElementById("main-image");

        mainImage.src = product.images[0];

        const gallery =
            document.getElementById("gallery");

        product.images.forEach(image => {

            const img =
                document.createElement("img");

            img.src = image;

            img.addEventListener("click", () => {
                mainImage.src = image;
            });

            gallery.appendChild(img);

        });

        const sizesDiv =
            document.getElementById("available-sizes");

        product.sizes.forEach(size => {

    const span =
        document.createElement("span");

    span.textContent = size;

    span.style.margin = "5px";
    span.style.padding = "8px 12px";
    span.style.background = "#6b7d3a";
    span.style.color = "white";
    span.style.borderRadius = "6px";
    span.style.cursor = "pointer";

    span.addEventListener("click", () => {

    document
        .querySelectorAll("#available-sizes span")
        .forEach(s => {
            s.style.background = "#6b7d3a";
        });

    span.style.background = "#1f3d12";

    selectedSize = size;

    const errorMsg =
        document.getElementById("size--message");

    if (errorMsg) 

        errorMsg.textContent = "";

        errorMsg.style.display = "none";


    const msg =
        document.getElementById("size-message");

    msg.style.display = "block";

    msg.textContent =
        "✓ تم اختيار المقاس: " + selectedSize;


    });

    sizesDiv.appendChild(span);

});

        };

        const tableContainer =
            document.getElementById("size-table");

        let html = `
            <table class="size-table">
                <tr>
                    <th>القياس</th>
                    <th>الخصر</th>
                    <th>الفخذ</th>
                    <th>الرجل</th>
                    <th>الطول</th>
                </tr>
        `;

        product.sizeChart.forEach(row => {

            html += `
                <tr>
                    <td>${row.size}</td>
                    <td>${row.waist}</td>
                    <td>${row.thigh}</td>
                    <td>${row.leg}</td>
                    <td>${row.length}</td>
                </tr>
            `;

        });

        html += "</table>";

        tableContainer.innerHTML = html;

        const orderBtn =
    document.querySelector(".order-btn");

orderBtn.addEventListener("click", () => {

  if (!selectedSize) {

    const msg =
        document.getElementById("size--message");

    msg.style.display = "block";

    msg.textContent =
        "الرجاء اختيار المقاس أولاً";

    return;

}

document
    .getElementById("order-form-container")
    .style.display = "block";

document.getElementById("selected-product-info").textContent =
    "المنتج: " + product.name + " " + selectedSize;

});

    }

 else {

    const grid =
        document.getElementById("products-grid");

    if (grid) {

        products.forEach(product => {

            const card =
                document.createElement("div");

            card.className = "product-card";

            const image =
                product.images.length
                    ? product.images[0]
                    : "https://via.placeholder.com/500x600";

            card.innerHTML =` 
                <img src="${image}">

                <div class="product-info">

                    <div class="product-name">
                        ${product.name}
                    </div>

                    <div class="product-price">
                        ${product.price} ل.س جديدة
                    </div>

                    <a class="view-btn"
                       href="product.html?id=${product.id}">
                       عرض المنتج
                    </a>

                </div>
          ` ;

            grid.appendChild(card);

        });

    }

}
const city =
document.getElementById("customer-city");

if (city) {

    city.addEventListener("change", () => {

        const damascus =
            document.getElementById("damascus-section");

        const shipping =
            document.getElementById("shipping-section");

        if (city.value === "دمشق") {

            damascus.style.display = "block";
            shipping.style.display = "none";

        } else if (city.value !== "") {

            damascus.style.display = "none";
            shipping.style.display = "block";

        } else {

            damascus.style.display = "none";
            shipping.style.display = "none";

        }

    });

}
const submitOrder =
document.getElementById("submit-order");

if (submitOrder) {

submitOrder.addEventListener("click", async () => {

    const name =
        document.getElementById("customer-name").value.trim();

    const phone =
        document.getElementById("customer-phone").value.trim();

    const city =
        document.getElementById("customer-city").value;

    const notes =
        document.getElementById("customer-notes").value.trim();

    if (!selectedSize) {

        alert("الرجاء اختيار المقاس أولاً");

        return;
    }

    let address = "";

    if (city === "دمشق") {

        address =
            document.getElementById("customer-address")
            .value.trim();

    } else {

        const receiver =
            document.getElementById("receiver-name")
            .value.trim();

        const branch =
            document.getElementById("shipping-branch")
            .value.trim();

            if (!receiver || !branch) {

   const msg =
document.getElementById("form-message");

msg.className =
"form-message error";

msg.textContent =
"يرجى تعبئة جميع الحقول المطلوبة";

    return;
}
        address =
            receiver + " - " + branch;
    }

if (!name || !phone || !city || !address) {

    const msg =
    document.getElementById("form-message");

    msg.className =
    "form-message error";

    msg.textContent =
    "يرجى تعبئة جميع الحقول المطلوبة";

    return;
}
const orderNumber =
"PUZ-" + Date.now().toString().slice(-4);

const allProducts = [

    {
        name: currentProduct.name,
        size: selectedSize
    },

    ...selectedProducts

];
    const orderData = {

        orderNumber: orderNumber,

        products: allProducts,
        size: selectedSize,

        name: name,

        phone: phone,

        city: city,

        address: address,

        notes: notes

    };

    try {
console.log(orderData);

document.getElementById("loading-modal")
.style.display = "flex";

submitOrder.disabled = true;

        await fetch(
    "https://script.google.com/macros/s/AKfycbzj_ls0TM8tl5GAmAqV-NXpZpEImOKO2onDZ8Gv3q3tuuDeclP5jACicLS4lE_phhnx/exec",
    {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
    }
);

       
document.getElementById("loading-modal")
.style.display = "none";
document.getElementById("order-number")
.textContent =
"رقم الطلب: " +
orderNumber;
      document.getElementById("success-modal")
.style.display = "flex";

document.getElementById("customer-name").value = "";
document.getElementById("customer-phone").value = "";
document.getElementById("customer-city").value = "";
document.getElementById("customer-notes").value = "";

document.getElementById("damascus-section")
.style.display = "none";

document.getElementById("shipping-section")
.style.display = "none";

const addressField =
document.getElementById("customer-address");

if (addressField) {
    addressField.value = "";
}

const receiverField =
document.getElementById("receiver-name");

if (receiverField) {
    receiverField.value = "";
}

const branchField =
document.getElementById("shipping-branch");

if (branchField) {
    branchField.value = "";
}

selectedSize = null;

document.getElementById("size-message")
.style.display = "none";

submitOrder.disabled = false;

document
.querySelectorAll("#available-sizes span")
.forEach(s => {
    s.style.background = "#6b7d3a";
});

const msg =
document.getElementById("form-message");

if (msg) {
    msg.style.display = "none";
}

    } catch (error) {
         document.getElementById("loading-modal")
         .style.display = "none";

         submitOrder.disabled = false;

        console.error(error);

        const msg =
document.getElementById("form-message");

msg.className =
"form-message error";

msg.textContent =
"حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى";
       

    }

});

}
const closeModal =
document.getElementById("close-modal");

if (closeModal) {

    closeModal.addEventListener("click", () => {

        document.getElementById("success-modal")
        .style.display = "none";

            });

}
function renderSelectedProducts() {

    const container =
        document.getElementById("selectedProductsList");

    if (!container) return;

    container.innerHTML = "";

    selectedProducts.forEach((item, index) => {

        const div =
            document.createElement("div");

        div.className =
            "selected-product-item";

 div.innerHTML = `

<div class="selected-product-card">

    <span>
        المنتج ${index + 2} :
        ${item.name}
        ${item.size}
    </span>

    <button
        class="remove-product"
        onclick="removeProduct(${index})">
        ✕
    </button>

</div>

`;

        container.appendChild(div);

    });

}

function removeProduct(index) {

    selectedProducts.splice(index, 1);

    renderSelectedProducts();

}
const addProductBtn =
document.getElementById("addProductBtn");

if (addProductBtn) {

    addProductBtn.addEventListener("click", () => {

        const container =
            document.getElementById("productCardsContainer");

        container.style.display = "block";

        container.innerHTML = "";

        products.forEach(product => {

            const card =
                document.createElement("div");

            card.className =
                "product-card-mini";

            card.innerHTML = `
                <img src="${product.images[0]}">

                <div style="margin-top:8px;">
                    ${product.name}
                </div>

                <button
                    style="
                        margin-top:8px;
                        padding:6px 12px;
                        border:none;
                        border-radius:6px;
                        background:#768b3f;
                        color:white;
                        cursor:pointer;
                    ">
                    إضافة
                </button>
            `;

            card.querySelector("button")
                .addEventListener("click", () => {

                    pendingProduct = product;

                    showSizeSelector(product);

                });

            container.appendChild(card);

        });

    });

}
function showSizeSelector(product) {

    const cards =
        document.getElementById("productCardsContainer");

    const selector =
        document.getElementById("sizeSelector");

    cards.style.display = "none";

    selector.style.display = "block";

    selector.innerHTML = `
    <div class="popup-product-card">

        <img
            src="${product.images[0]}"
            class="popup-product-image">

        <h3>${product.name}</h3>

        <div class="popup-price">
            ${product.price} ل.س
        </div>

        <div class="popup-sizes"></div>

    </div>
`;
    const sizesContainer =
        selector.querySelector(".popup-sizes");

    product.sizes.forEach(size => {

        const btn =
            document.createElement("button");

        btn.className =
            "size-btn";

        btn.textContent =
            size;

        btn.addEventListener("click", () => {

            selectedProducts.push({

                id: product.id,name: product.name,size: size

            });

            selector.style.display = "none";

            renderSelectedProducts();

        });

        sizesContainer.appendChild(btn);

    });

}