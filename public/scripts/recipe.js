function salad() {
    init();
    var greens = ["Lettuce", "Spinach", "Kale", "Mix"];
    var proteins = ["Salmon", "Tuna", "Shrimp", "Chicken", "Turkey", "Tofu", "Boiled Eggs", "Soy Bean Protein"];
    var toppings = ["Walnuts", "Almonds", "Apples", "Broccoli", "Carrots", "Chickpeas", "Croutons",  
                    "Olives", "Artichokes", "Kidney Beans", "Cucumbers", "Jalapeno", "Banana Pepper",
                    "Mushrooms", "Red Bell Peppers", "Red Onions", "Roasted Peppers", "Scallions",
                    "Scallions", "Brussels Sprouts", "Raisins", "Edamame", "Bean Sprouts", 
                    "Raisins", "Sunflower Seeds", "Sweet Corn", "Sweet Peas", "Tomatoes", 
                    "Avocado", "Sun-Dried Tomatoes", "Blue Cheese", 
                    "Feta Cheese", "Cheddar Cheese", "Mozzarella"];
    
    var dressing = ["Blue Cheese", "Caesar", "French", "Thousand Island",
                    "Roasted Garlic", "Chipotle Ranch", "Lemon Herb", "Ranch", 
                    "Sesame Ginger", "Olive Oil"];
    var vinaigrette = ["Raspberry", "Honey Dijon", "Red Wine", "Balsamic", "Honey Balsamic"]

    var restrictions = ["Vegan", "Vegetarian", "No Dairy", "Pescetarian", "I only like meat", "Spicy", "Nuts"];
    //var choice = document.querySelector("option selected");
    //console.log(choice);

    var date = new Date();

    var preference = {
        "diet": "",
        "dairy": "",
        "nuts": ""
    }

    console.log(date.getHours());
    //document.querySelector(".sing").addEventListener("click", init);

    setPref();

    function restrictions() {
        // 1-none 2-vegan 3-veg 4-carnivore 5-fish
        var choice = document.getElementById("inputState");
        var allergies = document.querySelector(".checkbox-1");
        console.log(choice);
        if(choice == "2") {
            proteins = ["Tofu", "Soy Bean Protein"]
        }
        else if(choice == "3") {
            proteins = ["Boiled Eggs","Tofu", "Soy Bean Protein"]
        }
        else if(choice == "5") {
            proteins = ["Salmon", "Tuna", "Shrimp", "Tofu", "Soy Bean Protein"]
        }
        else {
            
        }

        
    }


    function selectGreen() {

    }
    
    function selectTopping() {
    
    }
    
    function selectDressing() {
        
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
    }

    
}

window.removeEventListener("click", init, false);