// Add and Delete Buttons
let button = document.querySelector('#add');

// Contents on Screen
let toggleSize= document.querySelector('.toggle_size');
let toggleWhip = document.querySelector('.toggle_whip');
let deleteBtn;
let milkshakeDiv = document.querySelector('.boxed');
let calculate = document.querySelector('.calc');

// Identify Money Sections
let subtotal = document.getElementById('subtotal');
let gratuity = document.getElementById('tip');
let sales_tax = document.getElementById('sales_tax');
let total = document.getElementById('total');
let tipVal = document.getElementById('tip');

// Set Initial Values 
let subtotalPrice = 0;
let price = 0;
let tip = 0;
let tax = 0;


//******************
    
/**
 * Adds New Milkshake to Page
 * @param {event} e 
 */
function addMilkshake(e){
    e.preventDefault();
    let i=0;
    getTotals();
    i+=1;
    let newMilkshake;
    newMilkshake += toString(i)
    newMilkshake = document.createElement('div');
    newMilkshake.setAttribute('class','boxed');
    for (let i =1; i<toggleSize.length+1; i++){
        newMilkshake.innerHTML=
            '<h4>Milkshake # '+ `${i+1}`+'</h4>'+
            '<div class="toggle_size">'+
                '<h5>Size</h5>'+
                '<input type="radio" name='+`${"toggle_size"+i}`+' value="small"><label>Small</label><input type="radio" name='+`${"toggle_size"+i}`+' value="medium"><label>Medium</label><input type="radio" name='+`${"toggle_size"+i}`+' value="large"><label>Large</label>'+
            '</div>'+
            '<div class="toggle_whip"><h5>Whipped Topping</h5>'+
                '<input type="radio" value="yes" name='+`${"toggle_whip"+i}`+' ><label>Yes</label><input type="radio" value="no" name='+`${"toggle_whip"+i}`+' ><label>No</label>'+
            '</div>'+
            '<div>'+
                '<h5>Cherry</h5><input type="radio" value="cherry"><label>Yes</label><input type="radio" value="cherry"><label>No</label>'+
            '</div>'+
            '<button type="delete" id="delete"/>Delete'; 
    }
// Places new milkshake below existing milkshakes
    const milkshake = document.querySelectorAll('div')[2];
    milkshake.insertBefore(newMilkshake, button);
    activateDeleteBtns();
}

//*******************

/**
 * Totals Existing Milkshake Sections
 */
function getTotals(){
    toggleSize = document.querySelectorAll('.toggle_size');
    toggleWhip = document.querySelectorAll('.toggle_whip');
    deleteBtn = document.querySelectorAll('#delete')
}

//****************** 

/**
 * Activates Delete Buttons 
 */
function activateDeleteBtns(){
    getTotals()
    let btn = deleteBtn.length;
    for (let i =0; i<btn ; i++){
        deleteBtn[i].addEventListener('click', e=> {
            let parent = e.target.parentNode;
            parent.remove();
            resetNumbers()
        })   
    }
}

//****************** 

/**
 * Resets Milkshake Numbers Upon Deletion
 */
function resetNumbers(){
    const h4 = document.querySelectorAll('h4');
    h4.forEach((i, index) => {
        let number = (index+1)
        i.textContent = "Milkshake # "+number       
    })
}

//******************

/**
 * Identifies User Selections,
 * Prints
 */
function calcTotal(){
// Set Initial Values & Prices
    let smallQty = 0;
    let medQty = 0;
    let largeQty = 0;
    let whipQty = 0;
    let smallPrice = 5;
    let medPrice = 6;
    let largePrice = 7;
    let whipPrice = 2;
// Identify Sizes & 'Yes' Whips on Page
    let small = document.querySelectorAll('[value="small"]');
    let medium =document.querySelectorAll('[value="medium"]');
    let large =document.querySelectorAll('[value="large"]');
    let whip_yes =document.querySelectorAll('[value="yes"]');
// Tally Sizes and 'Yes' Whips
    for(let i=0; i<small.length; i ++){
        if(small[i].checked){
            smallQty += 1;
        }
        if(medium[i].checked){
            medQty += 1;
        }
        if(large[i].checked){
            largeQty += 1;
        }
    }
    for(let i=0; i<whip_yes.length;i++){
        if(whip_yes[i].checked){
            whipQty += 1;
        }
    }
// Quantity * Price
    smallPrice = smallPrice * smallQty;
    medPrice = medPrice * medQty;
    largePrice = largePrice * largeQty;
    whipPrice = whipPrice * whipQty;
    subtotalPrice = smallPrice + medPrice + largePrice + whipPrice;
// Output Subtotal
    subTotal();
}

//***************

/**
 * Calculate Subtotal and Print
 */
function subTotal(){
    subtotal.innerHTML = '$ ' + subtotalPrice;
    salesTax();
    totalPrice();
}

//***************** 

/**
 * Tip Validator Adds Tip to Total ONLY when 
 * Validated as Positive Integer
 * @param {event} e  
 */
function tipValid(e){
    e.preventDefault();
	tip = parseFloat(tipVal.value);
    const testName = /^\$?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/.test(tip);
	if (testName === true){
        salesTax();
	} else {tipVal.style.borderColor = 'red';
    tip = 0;
    salesTax();
    }
}

//***************

/**
 * Calculate Sales Tax, 
 * Trigger Total Price
 * and Print
 */
function salesTax(){
    tax = parseFloat((subtotalPrice + tip)*.08);
    taxValue = tax.toFixed(2)
    sales_tax.innerHTML = '$ ' + taxValue;
    totalPrice();   
}

//***************

/**
 * Calculate Total Price and Print
 */
function totalPrice(){
    price = (subtotalPrice + tip + tax).toFixed(2);
    total.innerHTML = '$ ' + price;
}

//***************

button.addEventListener('click', addMilkshake, false)
calculate.addEventListener('click', calcTotal, false)
gratuity.addEventListener('change', tipValid, false)