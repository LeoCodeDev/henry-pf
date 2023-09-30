function validateNumbers(inputValue) {
    const numbersPattern = /^\d+$/;
    return numbersPattern.test(inputValue);
    }
function validateLetters(inputValue) {
    const lettersPattern = /^[A-Za-z\s]+$/;
    return lettersPattern.test(inputValue);
    }

const validName=(name)=>{
    return validateLetters(name) && name.length>=3 && name.length<=15
}

const validDescription=(description)=>{
    return validateLetters(description) && description.length>=3 && description.length<=100
}

const validPrice=(price)=>{
    return validateNumbers(price) && price>=1 && price<=1000000
}

const validStock=(stock)=>{
    return validateNumbers(stock) && stock>=1 && stock<=1000000
}

const validCategory=(category)=>{
    return validateLetters(category) 
}

const validImage=(image)=>{
    return image
}

export {validName,validDescription,validPrice,validStock,validCategory,validImage}