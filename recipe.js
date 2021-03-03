function salad() {
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
    var choice = document.querySelector("option selected");
    console.log(choice);
    function restrictions() {
        var choice = document.getElementById("inputState");
        var allergies = document.querySelector(".checkbox-1");
        console.log(choice);
        if(choice == "Vegan") {
            proteins = ["Tofu", "Soy Bean Protein"]
        }
        else if(choice == "Vegetarian") {
            proteins = ["Boiled Eggs","Tofu", "Soy Bean Protein"]
        }
        else if(choice == "Pescetarian") {
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
    
}
