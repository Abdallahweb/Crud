    let title = document.getElementById("title");
    let price = document.getElementById("price");
    let texes = document.getElementById("texes");
    let ads = document.getElementById("ads");
    let discount = document.getElementById("discount");
    let total = document.getElementById("total");
    let count = document.getElementById("count");
    let category = document.getElementById("category");
    let submit = document.getElementById("submit");

    let mood = "create";
    let temp;



    function getTotal() {

        if (price.value != "") {



            let result = (+price.value + +texes.value + +ads.value) - discount.value;

            total.innerHTML = result;
            total.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
            total.style.border = "0.5px solid #333";
            total.style.color = "#fff";




        } else {

            total.innerHTML = "";
            total.style.backgroundColor = "rgb(143, 59, 59)";
            total.style.border = "0.5px solid #fff";
            total.style.color = "#fff";


        }

    }




    // save data


    let dataproduct = [];



    if (localStorage.product != null) {
        dataproduct = JSON.parse(localStorage.product)
    } else {

        let dataproduct = [];

    }

    submit.onclick = function () {



        let newproduct = {

            title: title.value.toLowerCase(),
            price: price.value,
            texes: texes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value.toLowerCase()
        }

        if (title.value !== "" && price.value !== "" && texes.value !== "" && ads.value !== "" && discount
            .value !== "" && category.value !== "" && newproduct.count < 100) {

            if (mood === "create") {



                if (newproduct.count > 1) {

                    for (i = 0; i < newproduct.count; i++)
                        dataproduct.push(newproduct);
                    clearData();


                } else {
                    dataproduct.push(newproduct);
                    clearData();



                }}else {

                dataproduct[temp] = newproduct;
                mood = 'create' ; 
                submit.innerHTML = 'إضافة';
                count.style.display = 'block'

            }
            clearData();
            showdata();



        }

        // لحفظ البيانات في local storage
        localStorage.setItem('product', JSON.stringify(dataproduct));


        showdata();


    }




    // clear data

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



    // show data

    function showdata() {

        let table = '';

        for (let i = 0; i < dataproduct.length; i++) {

            table +=
                ` <div class="card"> 
    <hr class="split">
    <h2 style="color: #eee">اسم المنتج <hr class="split2"></h2>
    <h4>${dataproduct[i].title}</h4> 
    <br><h2 style="color: #eee"> الفئة  <hr class="split2"></h2>
    <h4>${dataproduct[i].category}</h4> 
    <br><h2 style="color: #eee"> السعر   <hr class="split2"></h2> 
    <h4>${dataproduct[i].total}</h4> 
<button class="edit"><li class="fas fa-edit" style="font-size:20px;color:rgb(26,90,193)" onclick="updatedata(${i})"></li> </button>   
<button class="delete"><li class="fas fa-trash" style="font-size:20px;color:#ca261d" onclick="deletedata(${i})"></li> </button></div>`
        }

        document.getElementById("thebody").innerHTML = table;
        if(dataproduct.length < 1){
        document.getElementById("thebody").innerHTML += "<div style='margin:auto'><img src='./no-product.webp' style='margin:auto;width:340px;height:340px'/></div>"
    }



    }

    showdata();




    // delete data

    function deletedata(i) {

        if (confirm("Are You Sure?")) {

            dataproduct.splice(i, 1);
            localStorage.product = JSON.stringify(dataproduct);
            showdata();

        }


    }


    // update data

    function updatedata(i) {

        title.value = dataproduct[i].title;
        price.value = dataproduct[i].price;
        texes.value = dataproduct[i].texes;
        ads.value = dataproduct[i].ads;
        discount.value = dataproduct[i].discount;
        category.value = dataproduct[i].category;
        getTotal();
        count.style.display = "none";
        submit.innerHTML = "تحديث";
        mood = "update";
        temp = i;


    }


    // search

    let searchmood = "title";

    function getsearch(id) {

        let searchbut = document.getElementById("search");

        if (id == "searchtitle") {

            searchmood = "title";
            searchbut.placeholder = "Search By Title"
        }

        searchbut.focus();
        searchbut.value = "";
        showdata()

    }


    function searchdata(value) {

        let table = '';


        if (searchmood == "title") {

            for (let i = 0; i < dataproduct.length; i++) {

                if (dataproduct[i].title.toLowerCase().includes(value.toLowerCase())) {

                    table +=
                        `<div class="card"> 
    <hr class="split">
    <h2 style="color: #eee">اسم المنتج <hr class="split2"></h2>
    <h4>${dataproduct[i].title}</h4> 
    <br><h2 style="color: #eee"> الفئة  <hr class="split2"></h2>
    <h4>${dataproduct[i].category}</h4> 
    <br><h2 style="color: #eee"> السعر   <hr class="split2"></h2> 
    <h4>${dataproduct[i].total}</h4> 
<button class="edit"><li class="fas fa-edit" style="font-size:20px;color:rgb(26,90,193)" onclick="updatedata(${i})"></li> </button>   
<button class="delete"><li class="fas fa-trash" style="font-size:20px;color:#ca261d" onclick="deletedata(${i})"></li> </button></div>`
                }

            }
        }
        document.getElementById("thebody").innerHTML = table;


    }
