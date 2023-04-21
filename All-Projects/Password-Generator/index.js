

const inputSlider = document.querySelector('[data-LengthSlider]');
const lengthDisplay = document.querySelector('[data-lengthNumber]');
const passwordDisplay = document.querySelector('[data-passwordDisplay]');
const copyBtn = document.querySelector('[data-copy]');
const copyMsg = document.querySelector('[data-copyMsg]');
const uppercaseCheck = document.querySelector('#uppercase');
const lowercaseCheck = document.querySelector('#lowercase');
const numbersCheck = document.querySelector('#numbers');
const symbolsCheck = document.querySelector('#symbols');
const indicator = document.querySelector('[data-indicator]');
const generateBtn = document.querySelector('.generateBtn');
const allCheckBox = document.querySelectorAll('input[type="checkbox"]');

let password = "";
let passwordLength = 10;
let checkCnt = 1;
// set color of circle to grey
setIndicator('#ccc')
const symbols = "~`!@#$%^&*()_-+={[}]|\\:;<,>.?/"

handleSlider();

// set length of slider using slider or change slider using passwordlength
// update ui using passwordLength value
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const mini = inputSlider.min;
    const maxi = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength-mini)*100 / (maxi-mini) ) + "% 100%";
}

// set indicator
function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0 0 12px 1px ${color}`;
    passwordDisplay.style.color = color;

}

function getRndInt(min, max){
    return Math.floor( Math.random()*(max-min) ) + min;   
}

function generateNumber(){
    return getRndInt(0,10);
}

function generateLowercase(){
    return String.fromCharCode(getRndInt(97,123));
}

function generateUppercase(){
    return String.fromCharCode(getRndInt(65,91));
}

function generateSymbol(){
    return symbols.charAt(getRndInt(0, symbols.length));
    // return symbols[getRndInt(0, symbols.length)];
}

function calculateStrength(){
    let cnt = 0;
    if(uppercaseCheck.checked) cnt++;
    if(lowercaseCheck.checked) cnt++;
    if(numbersCheck.checked) cnt++;
    if(symbolsCheck.checked) cnt++;
    
    if(cnt>2){
        if(passwordLength >= 5)
            setIndicator("#ff0");
        else
            setIndicator("#f00");
    }
    else if(cnt ==2){
        if(passwordLength >= 6)
            setIndicator("#ff0");
        else
            setIndicator("#f00");
    }
    else{
        if(passwordLength >= 8)
            setIndicator("#ff0");
        else
            setIndicator("#f00");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    }
    catch(e){
        copyMsg.innerText = "Failed";
    }
    
    copyMsg.classList.add("active");
    
    setTimeout(()=>{
        copyMsg.classList.remove("active");
        copyMsg.innerText = "";

    }, 2000);


    // console.log(passwordDisplay.value);
    // console.log(123);
}

inputSlider.addEventListener('input', (e)=>{
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', ()=>{
    if(passwordDisplay.value.length)
        copyContent();
    console.log(passwordDisplay.value.length);
})


function handleCheckBoxChange(){
    if(this.checked)
        checkCnt++;
    else
        checkCnt--;

    if(passwordLength<checkCnt)
        passwordLength = checkCnt;
        handleSlider();
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('click', handleCheckBoxChange)
})

function shufflePassword(arr){
    // fisher yates method      apply on array
    for(let i=arr.length-1; i>0; i--){
        const j = Math.floor(Math.random(0, i+1));
        // swap a[i] and a[j]
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    let str = "";
    arr.forEach((element) => {str += element});
    return str;
}

generateBtn.addEventListener('click', ()=>{
    password = "";
    if(checkCnt==0){
        passwordDisplay.value = password;
        return;
    }
    else if(passwordLength<checkCnt){
        passwordLength = checkCnt;
        handleSlider();
    }


    // fulfill condition of checkboxes first
    
    let funcArr = [];
    if(uppercaseCheck.checked)
        funcArr.push(generateUppercase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowercase);

    if(numbersCheck.checked)
        funcArr.push(generateNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);
    
    for(let i=0; i<funcArr.length; i++){
        password += funcArr[i]();
        console.log(password);
    }

    for(let i=0; i<passwordLength-funcArr.length; i++){
        let rndIndex = getRndInt(0, funcArr.length);
        password += funcArr[rndIndex]();
    }

    // shuffle the password
    password = shufflePassword(Array.from(password));

    passwordDisplay.value = password;
    calculateStrength();
})