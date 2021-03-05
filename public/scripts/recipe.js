var greens = ["Lettuce", "Cabbage", "Spinach", "Kale", "Parsley"];
var proteins = ["Salmon", "Tuna", "Shrimp", "Eggs", "Turkey", "Tofu", "Chicken", "Soy Bean Protein"];
var toppings = ["Walnuts", "Almonds", "Apples", "Broccoli", "Carrots", "Chickpeas", "Croutons",  
                "Olives", "Kidney Beans", "Cucumbers", "Jalapeno", "Banana Pepper",
                "Mushrooms", "Red Bell Peppers", "Red Onions", "Roasted Peppers",
                "Scallions", "Brussels Sprouts", "Edamame", "Bean Sprouts", 
                "Raisins", "Sunflower Seeds", "Sweet Corn", "Peas", "Tomatoes", 
                "Avocado", "Sun-Dried Tomatoes", "Celery" ,"Blue Cheese", 
                "Feta Cheese", "Cheddar Cheese", "Mozzarella"];


var dressing = ["Blue Cheese Dressing", "Caesar Dressing", "Ranch Dressing", "Thousand Island Dressing",
                "Chipotle Ranch", "Lemon Herb Dressing", "French Dressing", "Roasted Garlic Dressing", "Sriracha Mayo"];
var vinaigrette = ["Lemon Juice", "Sesame Oil", "Raspberry Vinaigrette", "Honey Dijon Vinaigrette", "Red Wine Vinegar", "Balsamic Vinegar", "Honey Balsamic Vinaigrette", "Olive Oil"]

var restrictions = ["Vegan", "Vegetarian", "No Dairy", "Pescetarian", "I only like meat", "Spicy", "Nuts"];

var gVal, pVal, tVal, dVal, bg = 0;
var numOfToppings = 4;

var range; // The highest volume recorded in the recording 

var preference = {
    "diet": "",
    "dairy": "",
    "nuts": "",
    "greens": "",
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

    // Gets the highest value from recording, a random number is generated from that range
    range = randomNumberGenerator(vol); // e.g highest volume was 50
    var percentage = 100/greens.length; // 20%
    
    var prob = (range/vol)*100

    if(prob < percentage) {
        preference["greens"] = greens[0];   
    }
    else if(prob < percentage*2) {
        preference["greens"] = greens[1];
    }
    else if(prob < percentage*3) {
        preference["greens"] = greens[2];
    }
    else if(prob < percentage*4) {
        preference["greens"] = greens[3];
    }
    else {
        preference["greens"] = greens[4];
    }
    
}

function selectProtein(vol) {
    var percentage = 100/proteins.length;
   

    var randomProtein = randomNumberGenerator(vol);
    var prob = (randomProtein/vol)*100;
    
    for(var i = 0; i < proteins.length; i++) {
        if(prob < percentage*(i+1)) {
            preference["proteins"] = proteins[i];
            break;
        }
    }


    
    
}

function selectTopping(vol) {
    var len = toppings.length;
    var percent = 100/len;

    var randTopping = randomNumberGenerator(vol);
    var prob =  (randTopping/len)*100;
    for(var i = 0; i < len; i++) {
        if(prob < percent*(i+1)) {
            preference["toppings"].push(toppings[i]);
            break;
        }
    }

    
    
}

function selectDressing(freq) {
    
    var rando = randomNumberGenerator(freq);
    console.log(freq)
    console.log(rando)
    var dWeight = 100/dressing.length;
    var vWeight = 100/vinaigrette.length;


    var dProb = 100*(rando/freq); 
    var vProb = 100*(rando/freq);



    if(preference["greens"] == "Lettuce" || preference["greens"] == "Cabbage") { 
        for(var i = 0; i < dressing.length; i++) {
            if(dProb < dWeight*(i+1)) {
                preference["dressing"] = dressing[i];
            }
        }
        
    }
    else {
        for(var i = 0; i < vinaigrette.length; i++) {
            if(vProb < vWeight*(i+1)) {
                preference["dressing"] = vinaigrette[i];
            }
        }
        
    }
    console.log(preference);
    displayRecipe();
}


/*  Base: mode of the volume list (largest volume recorded) e.g 44 (count all items in leaves, give them equal weight, 
    20%each, generate a random number between 100 and choose leaf)
    Protein: median of the volume list 
    Toppings:
    Dressing:
 */
function randomNumberGenerator(volume) {
    return (Math.floor(Math.random() * volume));
}

function randomPercentageGenerator() {
    return(Math.floor(Math.random() * 100));
}

function displayRecipe() {
    var display = "Start off with some <b>";
    display += preference["greens"] + "</b> in a bowl. ";
    
    document.getElementById("greens").innerHTML = display;
    
    if(preference["proteins"] != "") {
        display = "Then add some <b>" + preference["proteins"] + "</b>";
    }
    
    document.getElementById("proteins").innerHTML = display;
    display = "Now add some ";
    for(var i = 0; i < preference["toppings"].length; i++) {
        
        if(i == preference["toppings"].length - 1) {
            display += "and ";
            display += preference["toppings"][i];
        }
        else {
            display += preference["toppings"][i] + ", ";    
        }
    }
    
    document.getElementById("toppings").innerHTML = display;
    display = "Top it off with some " + preference["dressing"] + " and enjoy!";

    document.getElementById("dressing").innerHTML = display;
    
    
}

window.removeEventListener("click", init, false);