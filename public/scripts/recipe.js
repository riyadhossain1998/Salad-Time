var greens = ["Lettuce", "Cabbage", "Spinach", "Kale", "Parsley", "Cilantro"];
var proteins = ["Salmon", "Tuna", "Shrimp", "Chicken", "Turkey", "Tofu", "Boiled Eggs", "Soy Bean Protein"];
var toppings = ["Walnuts", "Almonds", "Apples", "Broccoli", "Carrots", "Chickpeas", "Croutons",  
                "Olives", "Kidney Beans", "Cucumbers", "Jalapeno", "Banana Pepper",
                "Mushrooms", "Red Bell Peppers", "Red Onions", "Roasted Peppers", "Scallions",
                "Scallions", "Brussels Sprouts", "Edamame", "Bean Sprouts", 
                "Raisins", "Sunflower Seeds", "Sweet Corn", "Sweet Peas", "Tomatoes", 
                "Avocado", "Sun-Dried Tomatoes", "Blue Cheese", 
                "Feta Cheese", "Cheddar Cheese", "Mozzarella"];

var dressing = ["Blue Cheese", "Caesar", "Ranch", "Thousand Island",
                "Chipotle Ranch", "Lemon Herb", "French", "Roasted Garlic"];
var vinaigrette = ["Raspberry", "Honey Dijon", "Red Wine", "Balsamic", "Honey Balsamic", "Olive Oil"]

var restrictions = ["Vegan", "Vegetarian", "No Dairy", "Pescetarian", "I only like meat", "Spicy", "Nuts"];

var gVal, pVal, tVal, dVal, bg = 0;
var numOfToppings = 4;

var preference = {
    "diet": "",
    "dairy": "",
    "nuts": "",
    "greens": [],
    "proteins": "",
    "toppings": [],
    "dressing": ""
}

function salad() {
    init();

    //var choice = document.querySelector("option selected");
    //console.log(choice);
    //document.querySelector(".sing").addEventListener("click", init);

    setPref();
    
    function restrictions() {
        // 1-none 2-vegan 3-veg 4-carnivore 5-fish
       
        var choice = preference["diet"];
        
        if(choice == "2") {
            proteins = ["Tofu", "Soy Bean Protein"]
            dressing.splice(0, 6)
            toppings.splice(31, 34)
        }
        else if(choice == "3") {
            proteins = ["Boiled Eggs","Tofu", "Soy Bean Protein"]
        }
        else if(choice == "4") {
            proteins = ["Chicken", "Turkey"]
        }
        else if(choice == "5") {
            proteins = ["Salmon", "Tuna", "Shrimp"]
        }
        else {
            
        }

        if(preference["dairy"]) {
            dressing.splice(0, 6)
            toppings.splice(31, 34)
        }
        else if(preference["nuts"]) {
            toppings.splice(0, 2)
        }
        
    }

    function spicy() {
        var spicy = 5;
       
    }
    function checkDropdown() {

    }
    function getCheckBoxValue(number) {
        var boxValue = document.getElementById("checkbox-" + number).checked
        if(number == 1) {
            preference["nuts"] = boxValue;
            
        }
        else if(number == 2) {
            preference["dairy"] = boxValue;
        }
        else {

        }

    }

    function getDropDownValue() {
        for(var i = 1; i <= 5; i++) {
            var diet = document.getElementById("option" + i);
            if(diet.selected == 1) {
                preference["diet"] = i;
                break;
            }
            
        }
    }

    function setPref() {
        getCheckBoxValue(1); //nuts
        getCheckBoxValue(2); //dairy
        getDropDownValue(); //diet pref
        console.log(preference);
        restrictions();
    }

    
}
function selectGreen(vol) {
    
    bg = vol;
    if(bg < 5) {
        gVal = gVal + bg*2;
    }
    else if(bg < 10) {
        gVal = gVal + bg;
    }
    
    if(gVal < 20) {
        preference["greens"].push("Lettuce");
    }
    else if(gVal < 30) {
        preference["greens"].push("Lettuce");
        preference["greens"].push("Cabbage");
    }
    else if(gVal < 40) {
        preference["greens"].push("Kale");
    }
    else if(gVal < 50) {
        preference["greens"].push("Spinach");
    }
    else {
        preference["greens"].push(greens[Math.floor(Math.random() * (greens.length))]);   
    }
    
}

function selectProtein(vol) {
    if(bg < 2) {
        preference["proteins"] = ""
        
    }
    else {
        var tmp;
        if(vol < proteins.length) {
            tmp = Math.floor(vol); 
        }
        else {
            tmp = Math.floor(Math.random() * proteins.length); 
        }
        
        preference["proteins"] = proteins[tmp];
    }
    
}

function selectTopping(vol) {
    
    if(vol > toppings.length) {
        preference["toppings"].push(toppings[Math.floor(vol-toppings.length)])
    }
    else {
        preference["toppings"].push(toppings[Math.floor(toppings.length - vol)])
    }
}

function selectDressing(freq) {
    
    var num;
    if(preference["greens"][0] == "Lettuce" || preference["greens"][1] == "Cabbage") { 
        if(freq < dressing.length) {
            num = Math.floor(freq)
        }
        else {
            num = Math.floor(Math.random() * dressing.length)
        }
        preference["dressing"] = dressing[num];
    }
    else {
        if(freq < vinaigrette.length) {
            num = Math.floor(freq);    
        }
        else {
            num = Math.floor(Math.random() * vinaigrette.length)
        }    
        preference["dressing"] = vinaigrette[num];
    }
    console.log(preference);
    displayRecipe();
}

function displayRecipe() {
    var display = "Start off with some ";
    if(preference["greens"].length > 1) {
        for(var i = 0; i < preference["greens"].length; i++) {
            display += preference["greens"][i] 
            display += "and ";

        }
        display += " in a bowl.";
    }
    else {
        display += preference["greens"][0] + "in a bowl. ";
    }
    document.getElementById("greens").innerHTML = display;
    
    if(preference["proteins"] != "") {
        display = "Then add some <b>" + preference["proteins"] + "</b>";
    }
    
    document.getElementById("proteins").innerHTML = display;
    display = "Now add some ";
    for(var i = 0; i < preference["toppings"].length; i++) {
        var ig = "";
        if(i == preference["toppings"].length - 1) {
            display += "and ";
            display += preference["toppings"][i];
        }
        else {
            display += preference["toppings"][i] + ", ";    
        }
    }
    
    document.getElementById("toppings").innerHTML = display;
    display = "Top it off with some " + preference["dressing"] + "and enjoy!";

    document.getElementById("dressing").innerHTML = display;
    
    
}

window.removeEventListener("click", init, false);