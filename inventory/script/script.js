"use strict";
var total = 0;
function edit_row(no) {
    document.getElementById("edit_button" + no).style.display = "none";
    document.getElementById("save_button" + no).style.display = "block";
    var brand = document.getElementById("brand_row" + no);
    var model = document.getElementById("model_row" + no);
    var serial = document.getElementById("serial_row" + no);
    var quantity = document.getElementById("quantity_row" + no);
    var price = document.getElementById("price_row" + no);
    var brand_data = brand.innerHTML;
    var model_data = model.innerHTML;
    var serial_data = serial.innerHTML;
    var quantity_data = quantity.innerHTML;
    var price_data = price.innerHTML;
    brand.innerHTML = "<input type='text' id='brand_text" + no + "' value='" + brand_data + "'>";
    model.innerHTML = "<input type='text' id='model_text" + no + "' value='" + model_data + "'>";
    serial.innerHTML = "<input type='text' id='serial_text" + no + "' value='" + serial_data + "'>";
    quantity.innerHTML = "<input type='number' id='quantity_text" + no + "' value='" + quantity_data + "'>";
    price.innerHTML = "<input type='number' id='price_text" + no + "' value='" + price_data + " $'>";
}
function save_row(no) {
    var brand_val = document.getElementById("brand_text" + no).value;
    var model_val = document.getElementById("model_text" + no).value;
    var serial_val = document.getElementById("serial_text" + no).value;
    var quantity_val = document.getElementById("quantity_text" + no).value;
    var price_val = document.getElementById("price_text" + no).value;
    // check blank space
    if (brand_val == "" || model_val == "" || serial_val == "" || quantity_val == "" || price_val == "") {
        alert("Please do not leave any blank space")
        return
    }
    document.getElementById("brand_row" + no).innerHTML = brand_val;
    document.getElementById("model_row" + no).innerHTML = model_val;
    document.getElementById("serial_row" + no).innerHTML = serial_val;
    document.getElementById("quantity_row" + no).innerHTML = quantity_val;
    document.getElementById("price_row" + no).innerHTML = price_val;
    document.getElementById("edit_button" + no).style.display = "block";
    document.getElementById("save_button" + no).style.display = "none";
    console.log(quantity_val);
    totalStocks();
    if (total > 100){
        alert("Total Quantities should not be more than 100");
        total = 0;
        totalStocks();
        edit_row(no);
    }
}
function delete_row(no) {
    document.getElementById("row" + no + "").outerHTML = "";
    totalStocks()
}
function add_row() //Call function checkPassword
{
    if (checkPassword() == 1) {
        var new_brand = document.getElementById("new_brand").value;
        var new_model = document.getElementById("new_model").value;
        var new_serial = document.getElementById("new_serial").value;
        var new_quantity = document.getElementById("new_quantity").value;
        var new_price = document.getElementById("new_price").value;
        //check blank space
        if (new_brand == "" || new_model == "" || new_serial == "" || new_quantity == "" || new_price == "") {
            alert("Please do not leave any blank space")
            return
        }
        var table = document.getElementById("data_table");
        var table_len = (table.rows.length) - 1;
        var row = table.insertRow(table_len).outerHTML = "<tr id='row" + table_len + "'><td id='brand_row" + table_len + "'>" + new_brand + "</td><td id='model_row" + table_len + "'>" + new_model + "</td><td id='serial_row" + table_len + "'>" + new_serial + "</td><td id='quantity_row" + table_len + "'>" + new_quantity + "</td><td id='price_row" + table_len + "'>" + new_price + " $ </td><td><input type='button' id='edit_button" + table_len + "' value='Edit' class='edit' onclick='edit_row(" + table_len + ")'> <input type='button' id='save_button" + table_len + "' value='Save' class='save' onclick='save_row(" + table_len + ")'> <input type='button' value='Delete' class='delete' onclick='delete_row(" + table_len + ")'></td></tr>";
    } else {
        return
    }
    totalStocks();
    console.log(total)
    if (total > 100) {
        alert("Total Quantities should not be more than 100");
        totalStocks();
        delete_row(table_len);
        total = 0;
    }else{
        document.getElementById("new_brand").value = "";
        document.getElementById("new_model").value = "";
        document.getElementById("new_serial").value = "";
        document.getElementById("new_quantity").value = "";
        document.getElementById("new_price").value = "";
    }
}
function startManage() {
    const startFormContainer = document.querySelector('.welcome');
    startFormContainer.classList.add('hide-container');
    const inventoryMain = document.querySelector('.main-inventory');
    inventoryMain.classList.remove('hide-container');
    totalStocks();
}
var login_attempts = 0;
function checkPassword() {
    var checkpass = prompt("Enter your password to edit the inventory");
    if (checkpass == 'password') { // check pass
        return 1
    } else { // if in correct then attempt again
        login_attempts = login_attempts + 1;
        alert("Login Failed. You have tried (" + login_attempts + "/3) Login Attempts");
        if (login_attempts >= 3) {
            alert("No Login Attempts Available");
            location.reload();
            return
        }
    }
}
function totalStocks() {
    var table=document.getElementById("data_table");
    var table_len=(table.rows.length)-1;
    var sum = 0;
    for (let i = 1; i < table_len; i++) {
       var s = document.getElementById("quantity_row" + i).innerHTML;
       sum = parseInt(s) + sum;
    }
    if (sum > 100) {
        total = sum;
    }else{
        document.getElementById("totalQuantity").value = Number.parseInt(sum);
    }
}
function exit() {
    location.reload();
    return
}