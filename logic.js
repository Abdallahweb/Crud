// Elements
const action = document.getElementById("action");
const title = document.getElementById("title");
const price = document.getElementById("price");
const texes = document.getElementById("texes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const submit = document.getElementById("submit");

let mood = "create";
let temp;

// Load Data
let dataproduct = JSON.parse(localStorage.getItem("product")) || [];

// ====================
// Total Price
// ====================

function getTotal() {
    const p = Number(price.value) || 0;
    const tx = Number(texes.value) || 0;
    const ad = Number(ads.value) || 0;
    const dis = Number(discount.value) || 0;

    if (price.value !== "") {
        total.innerHTML = p + tx + ad - dis;

        total.style.backgroundColor = "rgba(0,0,0,.2)";
        total.style.border = "0.5px solid #333";
        total.style.color = "#fff";
    } else {
        total.innerHTML = "";

        total.style.backgroundColor = "rgb(143,59,59)";
        total.style.border = "0.5px solid #fff";
        total.style.color = "#fff";
    }
}

// ====================
// Save Data
// ====================

function saveData() {
    localStorage.setItem(
        "product",
        JSON.stringify(dataproduct)
    );
}

// ====================
// Clear Inputs
// ====================

function clearData() {
    title.value = "";
    price.value = "";
    texes.value = "";
    ads.value = "";
    discount.value = "";
    count.value = "";
    category.value = "";
    total.innerHTML = "";
}

// ====================
// Create Card
// ====================

function createCard(product, index) {
    return `
        <div class="card">

            <img src="./product.png"
                 style="width:40px;height:40px;margin-bottom:10px">

            <h3 style="color:#eee">
                اسم المنتج
                <hr class="split2">
            </h3>

            <h3>${product.title}</h3>

            <br>

            <h3 style="color:#eee">
                الفئة
                <hr class="split2">
            </h3>

            <h3>${product.category}</h3>

            <br>

            <h3 style="color:#eee">
                السعر
                <hr class="split2">
            </h3>

            <h3>${product.total}</h3>

            <button class="edit"
                    onclick="updatedata(${index})">

                <li class="fas fa-pen-nib"
                    style="
                    font-size:17px;
                    color:rgb(2, 97, 175)">
                </li>

            </button>

            <button class="delete"
                    onclick="deletedata(${index})">

                <li class="fas fa-trash"
                    style="
                    font-size:20px;
                    color:#ca261d">
                </li>

            </button>

        </div>
    `;
}

// ====================
// Show Data
// ====================

function showdata() {

    const body = document.getElementById("thebody");

    if (dataproduct.length === 0) {

        body.innerHTML = `
            <div style="text-align:center;margin:auto">

                <img src="./no-product.gif"
                     class="no-product">

                <br><br><br>

                <h1 style="color:#E3163E">
                    لا توجد منتجات مضافة حتى الآن
                </h1>

            </div>
        `;

        return;
    }

    let content = "";

    dataproduct.forEach((product, index) => {
        content += createCard(product, index);
    });

    body.innerHTML = content;
}

// ====================
// Create / Update
// ====================

submit.onclick = function () {

    if (
        !title.value.trim() ||
        !price.value.trim() ||
        !texes.value.trim() ||
        !ads.value.trim() ||
        !discount.value.trim() ||
        !category.value.trim()
    ) {
        Swal.fire({
icon: 'error',
text: 'يجب ملء جميع الحقول­',
confirmButtonText: 'حسناً',

});

        return;
    }

    const newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        texes: texes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    };

    if (mood === "create") {

        if (
            newProduct.count > 1 &&
            newProduct.count < 100
        ) {

            for (
                let i = 0;
                i < newProduct.count;
                i++
            ) {
                dataproduct.push(newProduct);
            }

        } else {

            dataproduct.push(newProduct);

        }

    } else {

        dataproduct[temp] = newProduct;

        mood = "create";

        submit.innerHTML = "إضافة";

        action.innerHTML =
            "- أضف منتج جديد -";

        count.style.display = "block";
    }

    saveData();
    clearData();
    showdata();
};

// ====================
// Delete
// ====================

function deletedata(index) {
    Swal.fire({
        title: 'هل أنت متأكد؟',
        text: 'لن تستطيع استرجاع البيانات بعد الحذف',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'نعم، احذف',
        cancelButtonText: 'إلغاء'
    }).then((result) => {
        if (result.isConfirmed) {
            dataproduct.splice(index, 1);
            saveData();
            showdata();
        }
    });
}
// ====================
// Update
// ====================

function updatedata(index) {

    const product = dataproduct[index];

    title.value = product.title;
    price.value = product.price;
    texes.value = product.texes;
    ads.value = product.ads;
    discount.value = product.discount;
    category.value = product.category;

    getTotal();

    count.style.display = "none";

    action.innerHTML =
        "- تحديث بيانات المنتج -";

    submit.innerHTML = "تحديث";

    mood = "update";

    temp = index;

    scroll({
        top: 0,
        behavior: "smooth"
    });
}

// ====================
// Search
// ====================

let searchMood = "title";

function getsearch(id) {

    const search = document.getElementById("search");

    if (id === "searchtitle") {

        searchMood = "title";

        search.placeholder =
            "Search By Title";
    }

    search.focus();
    search.value = "";

    showdata();
}

function searchdata(value) {

    let content = "";

    if (searchMood === "title") {

        dataproduct.forEach((product, index) => {

            if (
                product.title
                    .toLowerCase()
                    .includes(value.toLowerCase())
            ) {

                content += createCard(
                    product,
                    index
                );
            }
        });
    }

    document.getElementById(
        "thebody"
    ).innerHTML = content;
}

// ====================
// First Render
// ====================

showdata();
