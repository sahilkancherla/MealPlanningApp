
const calculateTotalList = (arr) => {
    const groceryList = new Map();

    console.log(arr.length)
    for(let i = 0; i < arr.length; i++){
        const currRecipe = arr[i];
        const name = currRecipe.name;
        if(groceryList.has(name)) {
            groceryList.set(name, groceryList.get(name)+1); 
        }
        else{
            groceryList.set(name, 1); 
        }
        
    }
    console.log(groceryList);
}



module.exports.calculateTotalList = calculateTotalList;