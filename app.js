const colorLabels = [...document.querySelectorAll('.input-group label')];
const colorPickersInput = [...document.querySelectorAll('input[type="color"]')];
const rangeLabelValue = document.querySelector('.orientation-value');

const gradientData = {
    angle: 90,
    colors: ["#FF5F6D", "#FFC371"]
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
}

populateUI()