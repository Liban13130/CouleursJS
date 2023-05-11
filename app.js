const colorLabels = [...document.querySelectorAll('.input-group label')];
const colorPickersInput = [...document.querySelectorAll('input[type="color"]')];
const rangeLabelValue = document.querySelector('.orientation-value');

const gradientData = {
    angle: 90,
    colors: ["#111111", "#FFC371"]
}

function populateUI(){
    colorLabels[0].textContent = gradientData.colors[0]
    colorLabels[1].textContent = gradientData.colors[1]

    colorPickersInput[0].value = gradientData.colors[0]
    colorPickersInput[1].value = gradientData.colors[1]

    colorLabels[0].style.background = gradientData.colors[0]
    colorLabels[1].style.background = gradientData.colors[1]

    document.body.style.background = `linear-gradient(${gradientData.angle}deg, ${gradientData.colors[0]}, ${gradientData.colors[1]})`

    rangeLabelValue.textContent = `${gradientData.angle}°`

    adapInputColor()
}

populateUI()

function adapInputColor(){
    colorLabels.forEach(label => {
        const hexaColor = label.textContent.replace("#", "");
        const red = parseInt(hexaColor.slice(0,2), 16)
        const green = parseInt(hexaColor.slice(2,4), 16)
        const blue = parseInt(hexaColor.slice(4,6), 16)
        const yiq = (red * 299 + green * 587 + blue * 144) / 1000

        if(yiq >= 128){
            label.style.color = "#111"
        } else{
            label.style.color = "#f1f1f1"
        }
    })
}

const rangeInput = document.querySelector('.input-range');
rangeInput.addEventListener('input', handleInclination)

function handleInclination(){
    gradientData.angle = rangeInput.value;
    rangeLabelValue.textContent = `${gradientData.angle}°`
    populateUI()
}

colorPickersInput.forEach(input => input.addEventListener('input', colorInputModif));

function colorInputModif(e){
    const currentInput = e.target;
    const currentIndex = colorPickersInput.indexOf(e.target);

    gradientData.colors[currentIndex] = currentInput.value.toUpperCase();
    populateUI()
}

const copyBtn = document.querySelector('.copy-btn');
copyBtn.addEventListener('click', handleGradientCopy);

let lock = false

function handleGradientCopy(){
    const gradient = `linear-gradient(${gradientData.angle}deg, ${gradientData.colors[0]}, ${gradientData.colors[1]})`
    navigator.clipboard.writeText(gradient) // Ces 2 lignes servent a copier tout ce qu'on veut. Ici en l'occurence on copie le linear gradient
    if(lock) return 

    lock = true
    copyBtn.classList.add('active')

    setTimeout(() => {
        copyBtn.classList.remove('active')
        lock = false
    }, 1000)
}

const randomGradiantButton = document.querySelector('.random-btn')
randomGradiantButton.addEventListener('click', createRandomGradient)

function createRandomGradient(){
    for(let i = 0; i < colorLabels.length; i++){
        randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`
        console.log(randomColor);
        gradientData.colors[i] = randomColor.toUpperCase()
    }
    populateUI()
}