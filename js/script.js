let rentUl = document.querySelector('.categories__card--rent ul');
let foodUl = document.querySelector('.categories__card--food ul');
let healthUl = document.querySelector('.categories__card--health ul');
let transportUl = document.querySelector('.categories__card--transport ul');
let relaxUl = document.querySelector('.categories__card--relax ul');
let clothesUl = document.querySelector('.categories__card--clothes ul');
let othersUl = document.querySelector('.categories__card--others ul');

//popup 
let newSpendInp = document.querySelector('#new-spend');
let newSpendCostInp = document.querySelector('#new-spend-cost');
let newSpendCategoryInp = document.querySelector('#new-spend-category');
const addBtn = document.querySelector('.popup-btn--add');
const cancelBtn = document.querySelector('.popup-btn--cancel');





const checkInputs = ()=>{
    if (newSpendInp.value !== '' && newSpendCostInp.value > 0 && newSpendCategoryInp.value !=='none') {
        addToCategory()
        drawChart()
        newSpendInp.style.border = '#1551f7 1px solid'
        newSpendCostInp.style.border = '#1551f7 1px solid'
        newSpendCategoryInp.style.border = '#1551f7 1px solid'
    } else {
        if( newSpendInp.value === ''){
        newSpendInp.style.border = 'red 1px solid'
        } else if(newSpendCostInp.value <= 0){
            newSpendCostInp.style.border = 'red 1px solid'
        }else if(newSpendCategoryInp.value !=='none'){
            newSpendCategoryInp.style.border = 'red 1px solid'
        }
    }


}

// ddodawanie li do listy wydatków
function addToListFunction(list, spendCost) {
    let newLi = document.createElement('li');
    newLi.innerHTML = `
    <div class="spend ">${newSpendInp.value}</div>
    <div class="spend-cost spend-cost--${spendCost}">${newSpendCostInp.value} zł</div>
    <button class="delete"><i class="far fa-trash-alt"></i></button>`
    list.appendChild(newLi)
}
//dodawanie li do odpowiedniej listy wydatków
const addToCategory = () => {
    if (newSpendCategoryInp.value === "rent") {
        spendCost = 'rent'
        addToListFunction(rentUl, spendCost);
    } else if (newSpendCategoryInp.value === "food") {
        spendCost = 'food'
        addToListFunction(foodUl, spendCost)
    } else if (newSpendCategoryInp.value === "health") {
        spendCost = 'health'
        addToListFunction(healthUl, spendCost)
    } else if (newSpendCategoryInp.value === "transport") {
        spendCost = 'transport'
        addToListFunction(transportUl, spendCost)
    } else if (newSpendCategoryInp.value === "relax") {
        console.log('jest')
        spendCost = 'relax'
        addToListFunction(relaxUl, spendCost)
    } else if (newSpendCategoryInp.value === "clothes") {
        spendCost = 'clothes'
        addToListFunction(clothesUl, spendCost)
    } else if (newSpendCategoryInp.value === "others") {
        spendCost = 'others'
        addToListFunction(othersUl, spendCost)
    }

    sumAll()
}
//wszystkie elementy z wydatkami
let allSpendRent = document.getElementsByClassName('spend-cost--rent')
let allSpendFood = document.getElementsByClassName('spend-cost--food')
let allSpendHealth = document.getElementsByClassName('spend-cost--health')
let allSpendTransport = document.getElementsByClassName('spend-cost--transport')
let allSpendRelax = document.getElementsByClassName('spend-cost--realx')
let allSpendClothes = document.getElementsByClassName('spend-cost--clothes')
let allSpendOthers = document.getElementsByClassName('spend-cost--others')

//paragrafy odpowiedzialne za wyswietlanie zsumowanych wydatków w kategori
const allSpendRentAll = document.querySelector('.all--rent')
const allSpendFoodAll = document.querySelector('.all--food')
const allSpendHealthAll = document.querySelector('.all--health')
const allSpendTransportAll = document.querySelector('.all--transport')
const allSpendRelaxAll = document.querySelector('.all--relax')
const allSpendClothesAll = document.querySelector('.all--clothes')
const allSpendOthersAll = document.querySelector('.all--others')


//sumowanie wydatków w kategori
const CategorySpendCost = (x, y) => {
    let spendArr = [0]
    let sum = 0
    for (const element of x) {
        let spendNumber = parseFloat(element.innerHTML)

        spendArr.push(spendNumber)
    }
    for (let index = 0; index < spendArr.length; index++) {
        const element = spendArr[index];
        sum += element
        y.innerText = `${sum} zł`

    }
}
//funkcja do zliczania wszystkich kategorii
function sumAll() {
    CategorySpendCost(allSpendRent, allSpendRentAll);
    CategorySpendCost(allSpendFood, allSpendFoodAll);
    CategorySpendCost(allSpendHealth, allSpendHealthAll);
    CategorySpendCost(allSpendTransport, allSpendTransportAll);
    CategorySpendCost(allSpendRelax, allSpendRelaxAll);
    CategorySpendCost(allSpendClothes, allSpendClothesAll);
    CategorySpendCost(allSpendOthers, allSpendOthersAll);
}

//usuwanie wydatku

sumAll()

window.addEventListener('click', (e) => {
    if (e.target.closest('button').classList.contains('delete')) {
        e.target.closest('li').remove()
        sumAll()
        drawChart()
    }
})


addBtn.addEventListener('click', ()=>{
    checkInputs()
})

console.log(parseFloat(allSpendClothesAll.innerText))
google.charts.load("current", {
    packages: ["corechart"]
});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Spend', 'Amuount of money'],
        ['Czynsz, kredyt, rachunki', parseFloat(allSpendRentAll.innerText)],
        ['Jedzenie', parseFloat(allSpendFoodAll.innerText)],
        ['Zdrowie, chemia, higiena', parseFloat(allSpendHealthAll.innerText)],
        ['Raliwo, bliety, transport', parseFloat(allSpendTransportAll.innerText)],
        ['Relaks, hobby, kino', parseFloat(allSpendRelaxAll.innerText)],
        ['Ubrania', parseFloat(allSpendClothesAll.innerText)],
        ['Inne', parseFloat(allSpendOthersAll.innerText)]
    ]);

    var options = {
        'width': '100%',
        chartArea:{left:0,top:0,width:'100%',height:'100%'},
        pieHole: 0.4,
        'is3D': true,
        'backgroundColor': 'none',
        'legend.position': 'none',
        legend : { position:"none"},
        colors:['F7CB15','#72B01D','#731DD8','#F75B15', '#F715F7', '#15D8F7', '#d2f9ff'],
        fontSize: 15

    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
}
drawChart()