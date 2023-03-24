const { MaxKey } = require("mongodb");

const calculateTotalList = (arr) => {
    const groceryList = new Map();

    
    console.log(arr.length)
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr[i].length; j++){
            const currRecipe = arr[i][j];
            
            if(currRecipe != null){
                const ingredients = currRecipe.ingredients;
                console.log(ingredients);
                for(let k = 0; k < ingredients.length; k++){
                    const currIngredient = ingredients[k];
                    const name = currIngredient.ingredientName;
                    const quantity = parseInt(currIngredient.quantity);

                    
                    if(groceryList.has(name)) {
                        groceryList.set(name, groceryList.get(name)+quantity); 
                    }
                    else{
                        groceryList.set(name, quantity);
                    }
                }
                
            }
            
        }
    }

    const toReturn = []
    for (let [key, value] of groceryList) {
        const item = key;
        const count = value;
        const newVal = {
            item: item,
            count: count,
        }
        toReturn.push(newVal);
    }

    return toReturn;
}



