/// <reference types="./@types/jquery" />

let information = document.getElementById("rows")
let loading = document.getElementById("loading");
let ulis = $(".ul1 li")

let nw1 = $(".sideNav").outerWidth(true);
let nw2 = $(".nav2").outerWidth(true);
let pool = true;


// to close and open side navigation
closeNav();
$(".toggle i").on("click", function () {
    if (pool) {
        $(this).addClass("d-none")
        $(".toggle i").eq(0).removeClass("d-none");
        $(".sideNav").animate({ left: 0 },function () {
            
            for (let i = 0; i < ulis.length; i++) {
                $(ulis[i]).slideDown("1000");
    
            }
        });
        pool = false;
    } else {
        
        closeNav();
        $(ulis).slideUp("1000");
    }
})


// to Get and Display Data of meals
GetData("");
async function GetData(meal) {
    $(loading).css("display", "flex");
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    let result = await data.json();
    console.log(result);
    $(loading).slideUp(300);
    dsiplayData(result)

}
function dsiplayData(datas) {
    let data = datas.meals
    let cartona = ``;
    for (let i = 0; i < data.length; i++) {

        cartona +=
            `
    
                    <div attr="${i}"  class="dataMeal col-lg-3   p-1 overflow-hidden      ">
                        <div class="datas position-relative  ">
                            <img src="${data[i].strMealThumb}" class="rounded-2 w-100 " alt="">
                            <div class="layout position-absolute rounded-2 d-flex align-items-center">
                                <h4>${data[i].strMeal}</h4>
                            </div>
                        </div>
                    </div>
    `
    }
    information.innerHTML = cartona;
    let allarr = document.querySelectorAll(".dataMeal")

    informationMeal(allarr, data)


}


// properties of search choice
$(".ul1 li").eq(0).on("click", async function () {
    closeNav();
    let cartona = `
    <div class"row" >
    <div class="col-md-6 p-3 d-flex w-100 gap-5">
            <input id="name" type="text"  class=" form-control" placeholder="By Name...">
            <input id="later" type="text" class=" form-control" placeholder="By Latter...">
        </div>

        <div id="seM" class="row  row-gap-4 p-3">
        
    </div>
    </div>
    `
    information.innerHTML = cartona;
    let names = document.getElementById("name")
    let later = document.getElementById("later")

    names.addEventListener("keyup", function () {

        SearchWord(names.value)

    })
    later.addEventListener("keyup", function () {

        SearchWord(later.value)

    })

})
async function SearchWord(api) {
    $(loading).css("display", "flex");
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${api}`)
    let res = await data.json()
    let mealSearch = res.meals
    let seM = document.getElementById("seM")
    let cartona = res.meals.map((mels, i) => {
        return `
        <div attr="${i}"  class="dataMeal col-lg-3   p-1 overflow-hidden      ">
        <div class="datas position-relative  ">
            <img src="${mealSearch[i].strMealThumb}" class="rounded-2 w-100 " alt="">
            <div class="layout position-absolute rounded-2 d-flex align-items-center">
                <h4>${mealSearch[i].strMeal}</h4>
            </div>
        </div>
    </div>
        `
    }).join("")

    $(loading).slideUp(300);
    seM.innerHTML = cartona;

    let conrtainers = document.querySelectorAll(".dataMeal")

    $(".dataMeal").on("click", function () {
        informationMeal(conrtainers, mealSearch)

    })

}
async function SearchLatter(api) {
    $(loading).css("display", "flex");
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${api}`)
    let res = await data.json()
    let mealSearch = res.meals
    let seM = document.getElementById("seM")
    let cartona = res.meals.map((mels, i) => {
        return `
        <div attr="${i}"  class="dataMeal col-lg-3   p-1 overflow-hidden      ">
        <div class="datas position-relative  ">
            <img src="${mealSearch[i].strMealThumb}" class="rounded-2 w-100 " alt="">
            <div class="layout position-absolute rounded-2 d-flex align-items-center">
                <h4>${mealSearch[i].strMeal}</h4>
            </div>
        </div>
    </div>
        `
    }).join("")

    $(loading).slideUp(300);
    seM.innerHTML = cartona;

    let conrtainers = document.querySelectorAll(".dataMeal")

    $(".dataMeal").on("click", function () {
        informationMeal(conrtainers, mealSearch)

    })

}

// properties of Categories choice
$(".ul1 li").eq(1).on("click", async function () {
    $(".loading").css("display", "flex");

    closeNav();
    $(loading).css("display", "flex");
    let data = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    let res = await data.json();

    let arrCategory = res.categories
    let cartona;
    cartona = res.categories.map((valuue, i) => {
        return `
        <div attr="${i}" class="dataMeal col-lg-3 overflow-hidden gap-2">
                    <div class="datas position-relative ">
                        <img src="${valuue.strCategoryThumb}" class="w-100 rounded-2" alt="">
                        <div   class="layout position-absolute rounded-2 p-2">
                            <h4 class="text-center fw-bold"  >${valuue.strCategory}</h4>
                            <p class="text-center"  >${valuue.strCategoryDescription}</p>
                        </div>
                    </div>
                </div>
        
        
        `
    }).join("");

    $(loading).slideUp(300);

    information.innerHTML = cartona;
    allarr = document.querySelectorAll(".dataMeal")
    $(allarr).on("click", async function () {
        let mealIndex = $(this).attr("attr");
        let indexMeal = arrCategory[mealIndex];
        console.log(indexMeal.strCategory);
        GetData(indexMeal.strCategory);
    })


})

// properties of Area choice
$(".ul1 li").eq(2).on("click", async function () {

    $(loading).css("display", "flex");

    closeNav();
    let data = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    let res = await data.json();
    console.log(res);

    let carona = res.meals.map((menubar, i) => {
        return `<div attr="${i}" class="Area col-lg-3">
            <div class="AreaCon text-center p-1">
                <i class="fa-solid fs-1 fa-house-laptop"></i>
                <h2>${menubar.strArea}</h2>
            </div>
        </div>`
    }).join("");
    $(loading).slideUp(300);
    information.innerHTML = carona;
    $(".Area").on("click", async function () {
        let mealIndex = $(this).attr("attr")
        let mealArea = res.meals[mealIndex].strArea;
        $(loading).css("display", "flex");
        let data2 = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${mealArea}`)
        let res2 = await data2.json();
        $(loading).slideUp(300);
        dsiplayData(res2)
        // console.log();
    })


})

// properties of Ingredients choice
$(".ul1 li").eq(3).on("click", async function () {
    closeNav();
    $(loading).css("display", "flex");
    let data = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    let res = await data.json();
    let dataArr = [...res.meals]

    let cartona = "";
    for (let i = 0; i < 24; i++) {
        cartona += `
        <div attr="${i}" class="Ingredient col-lg-3">
            <div class="IngredientCon text-center p-1">
            <i class="fa-solid fa-drumstick-bite p-2 fs-1"></i>
                <h4>${dataArr[i].strIngredient}</h4>
                <p>${dataArr[i].strDescription.substring(0, 97)}</p>
            </div>
        </div>
        `
    }
    $(loading).slideUp(300);
    information.innerHTML = cartona;





    $(".Ingredient").on("click", async function () {
        let IngredientIndex = $(this).attr("attr")
        let IngredientArea = dataArr[IngredientIndex].strIngredient;
        $(loading).css("display", "flex");
        let data2 = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${IngredientArea}`)
        let res2 = await data2.json();
        $(loading).slideUp(300);
        dsiplayData(res2)
    })


})

// properties of ContactUs choice
$(".ul1 li").eq(4).on("click", function () {
    closeNav();

    let cartona = `


    <div class="row contacts p-0 mt-5 m-0">

        <div class="col-md-6">
            <input type="text" class="form-control w-100" name="" id="namev" placeholder="Name...">
            <p class="card text-center d-none bg-danger-subtle p-3" >Special characters and numbers not allowed</p>
        </div>
        <div class="col-md-6">
            <input type="email" class="form-control w-100" name="" id="Email" placeholder="Email...">
            <p class="card text-center d-none bg-danger-subtle p-3" >Email not valid *exemple@yyy.zzz</p>
        </div>
        <div class="col-md-6">
            <input type="tel" class="form-control w-100" name="" id="PhoneN" placeholder="Phone-numper...">
            <p class="card text-center d-none bg-danger-subtle p-3" >Enter valid Phone Number</p>
        </div>
        <div class="col-md-6">
            <input type="number" class="form-control w-100" name="" id="Age" placeholder="Age....">
            <p class="card text-center d-none bg-danger-subtle p-3" >Enter valid age</p>
        </div>
        <div class="col-md-6">
            <input type="password" class="form-control w-100" name="" id="password" placeholder="password...">
            <p class="card text-center d-none bg-danger-subtle p-3" >Enter valid password *Minimum eight characters, at least one letter and one number:*            </p>
        </div>
        <div class="col-md-6">
            <input type="password" class="form-control w-100" name="" id="ReP" placeholder="Re-password...">
            <p class="card text-center d-none bg-danger-subtle p-3" >Enter valid repassword</p>
        </div>
        <div class="col-md-12 text-center mt-3">
            <button id="supmit" class="btn btn-outline-danger w-25 disabled" >Send</button>
        </div>
    </div>


    `
    information.innerHTML = cartona;

    let Name = document.getElementById("namev");
    let Email = document.getElementById("Email");
    let PhoneN = document.getElementById("PhoneN");
    let Age = document.getElementById("Age");
    let password = document.getElementById("password");
    let rePassword = document.getElementById("ReP");
    let supmit = document.getElementById("supmit");


    $(".contacts input").on("keydown", function () {

        Alllll(Name, Email, PhoneN, Age, password, rePassword)
        let check = setInterval(() => {
            if ($(Name).attr("stats") == "true" && $(Email).attr("stats") == "true" && $(PhoneN).attr("stats") == "true" && $(Age).attr("stats") == "true" && $(password).attr("stats") == "true" && $(rePassword).attr("stats") == "true") {
                $(supmit).removeClass("disabled")
                clearInterval(check);

            } else {
                $(supmit).addClass("disabled")
            }
        }, 1000);
    })
})

// to display deep information about meals
function informationMeal(datas, arrCategory) {
    for (let i = 0; i < datas.length; i++) {
        datas[i].addEventListener("click", async function () {
            let index = datas[i].getAttribute("attr");
            let mealId = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${arrCategory[index].idMeal}`);
            let mealIdarr = await mealId.json();
            let finalMealId = mealIdarr.meals[0]
            console.log(finalMealId);
            AddInformation(finalMealId)
        })
    }
}
function AddInformation(arrCategory) {
    let cartona = `

    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${arrCategory.strMealThumb}"
                    alt="">
                <h2>${arrCategory.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2  >Instructions</h2>
                <p class="fw-bold text-black">${arrCategory.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${arrCategory.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${arrCategory.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    <li class="alert alert-info m-2 p-1 ${arrCategory.strIngredient1 == "" || arrCategory.strMeasure1 == null  ? "d-none" : ""}  ">${arrCategory.strMeasure1} ${arrCategory.strIngredient1}</li>
                    <li class="alert alert-info m-2 p-1 ${arrCategory.strIngredient2 == "" ? "d-none" : ""} ">${arrCategory.strMeasure2} ${arrCategory.strIngredient2}</li>
                    <li class="alert alert-info m-2 p-1 ${arrCategory.strIngredient3 == "" ? "d-none" : ""} ">${arrCategory.strMeasure3} ${arrCategory.strIngredient3}</li>
                    <li class="alert alert-info m-2 p-1 ${arrCategory.strIngredient4 == "" ? "d-none" : ""} ">${arrCategory.strMeasure4} ${arrCategory.strIngredient4}</li>
                    <li class="alert alert-info m-2 p-1 ${arrCategory.strIngredient5 == "" ? "d-none" : ""} ">${arrCategory.strMeasure5} ${arrCategory.strIngredient5}</li>
                    <li class="alert alert-info m-2 p-1 ${arrCategory.strIngredient6 == "" ? "d-none" : ""} ">${arrCategory.strMeasure6} ${arrCategory.strIngredient6}</li>
                    <li class="alert alert-info m-2 p-1 ${arrCategory.strIngredient7 == "" ? "d-none" : ""} ">${arrCategory.strMeasure7} ${arrCategory.strIngredient7}</li>
                    <li class="alert alert-info m-2 p-1 ${arrCategory.strIngredient8 == "" ? "d-none" : ""} ">${arrCategory.strMeasure8} ${arrCategory.strIngredient8}</li>
                    <li class="alert alert-info m-2 p-1 ${arrCategory.strIngredient9 == "" ? "d-none" : ""} ">${arrCategory.strMeasure9} ${arrCategory.strIngredient9}</li>
                    <li class="alert alert-info m-2 p-1 ${arrCategory.strIngredient10 == "" ? "d-none" : ""} ">${arrCategory.strMeasure10} ${arrCategory.strIngredient10}</li>
                    <li class="alert alert-info m-2 p-1 ${arrCategory.strIngredient11 == "" ? "d-none" : ""} ">${arrCategory.strMeasure11} ${arrCategory.strIngredient11}</li>
                    <li class="alert alert-info m-2 p-1 ${arrCategory.strIngredient12 == "" ? "d-none" : ""} ">${arrCategory.strMeasure12} ${arrCategory.strIngredient12}</li>
                    <li class="alert alert-info m-2 p-1 ${arrCategory.strIngredient13 == "" ? "d-none" : ""} ">${arrCategory.strMeasure13} ${arrCategory.strIngredient13}</li>
                    <li class="alert alert-info m-2 p-1 ${arrCategory.strIngredient14 == "" ? "d-none" : ""} ">${arrCategory.strMeasure14} ${arrCategory.strIngredient14}</li>
                    <li class="alert alert-info m-2 p-1 ${arrCategory.strIngredient15 == "" ? "d-none" : ""} ">${arrCategory.strMeasure15} ${arrCategory.strIngredient15}</li>
                    <li class="alert alert-info m-2 p-1 ${arrCategory.strIngredient16 == "" ? "d-none" : ""} ">${arrCategory.strMeasure16} ${arrCategory.strIngredient16}</li>
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                <li class="alert alert-danger m-2 p-1 ${arrCategory.strTags == null ? 'd-none' : ''}         ">${arrCategory.strTags}</li>
                </ul>

                <a target="_blank" href="${arrCategory.strSource}"
                    class="btn btn-success">Source <i class="fa-brands fa-readme px-1"></i></a>
                <a target="_blank" href="${arrCategory.strYoutube}" class="btn btn-danger">Youtube<i class="fa-brands fa-youtube px-1" ></i></a>
            </div>


    `;
    information.innerHTML = cartona
}




// Validation of Contact Us 
function Alllll(name, email, phone, age, password, rePassword) {
    validName(name);
    validEmail(email);
    validPhone(phone);
    validAge(age);
    validPassword(password, rePassword);

}
function validName(name) {
    let nameRegex = /^(?=.*[A-Z])[A-Za-z]{1,20}$/;
    $(name).on("keyup", function () {
        if (name.value == "") {
            $(".contacts p").eq(0).addClass("d-none");
        }
        else {
            if (nameRegex.test(name.value) == true) {
                $(".contacts p").eq(0).addClass("d-none");
                $(name).attr("stats", "true")
                return true;
            }
            else {
                $(".contacts p").eq(0).removeClass("d-none");
                $(name).attr("stats", "false")
                return false;
            }
        }
    })

}
function validEmail(email) {
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    $(email).on("keyup", function () {
        if (email.value == "") $(".contacts p").eq(1).addClass("d-none");
        else {
            if (emailRegex.test(email.value) == true) {
                $(".contacts p").eq(1).addClass("d-none");
                $(email).attr("stats", "true")
                return true;
            }
            else {
                $(".contacts p").eq(1).removeClass("d-none");
                $(email).attr("stats", "false")

                return false;
            }
        }
    })
}
function validPhone(phone) {
    let phoneRegex = /^01[0-2]\d{8}$/;
    $(phone).on("keyup", function () {
        if (phone.value == "") $(".contacts p").eq(2).addClass("d-none");
        else {
            if (phoneRegex.test(phone.value)) {
                $(".contacts p").eq(2).addClass("d-none");
                $(phone).attr("stats", "true")
                return true;
            }
            else {
                $(".contacts p").eq(2).removeClass("d-none");
                $(phone).attr("stats", "false")
                return false;
            }
        }
    })

}
function validAge(age) {
    let ageRegex = /^[1-9][0-9]{0,2}$/;
    $(age).on("keyup", function () {
        if (age.value == "") $(".contacts p").eq(3).addClass("d-none");
        else {
            if (ageRegex.test(age.value) == true) {
                $(".contacts p").eq(3).addClass("d-none");
                $(age).attr("stats", "true")
                return true;
            }
            else {
                $(".contacts p").eq(3).removeClass("d-none");
                $(age).attr("stats", "false")
                return false;
            }
        }
    })

}
function validPassword(password, rePassword) {
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    $(password).on("keyup", function () {
        if (password.value == "") $(".contacts p").eq(4).addClass("d-none");
        else {
            if (passwordRegex.test(password.value)) {
                $(".contacts p").eq(4).addClass("d-none");
                $(password).attr("stats", "true")
            }
            else {
                $(".contacts p").eq(4).removeClass("d-none");
                $(password).attr("stats", "false")
            }
        }
    })


    $(rePassword).on("keyup", function () {
        if (password.value == "") $(".contacts p").eq(5).addClass("d-none");
        else {
            if (password.value == rePassword.value) {
                $(".contacts p").eq(5).addClass("d-none");
                $(rePassword).attr("stats", "true")
                return true;
            }
            else {
                $(".contacts p").eq(5).removeClass("d-none");
                $(rePassword).attr("stats", "false")
                return false;
            }
        }
    })




}


// to close side navigation
function closeNav() {
    $(".toggle i").eq(1).removeClass("d-none");
    $(".toggle i").eq(0).addClass("d-none")
    pool = true;
    $(".sideNav").animate({ left: -(nw1 - nw2) });


}







