

const form = document.querySelector('[data-app="inputData"')
const cityName = document.querySelector('[data-app="cityname"]')
const localTemperature = document.querySelector('[data-app="temperature"]')
const day_Image = document.querySelector('[data-app="time"]')
const display_Weather = document.querySelector('[data-app="display_Weather"]')
const display_Weather_Icon = document.querySelector('[data-app="weatherIcon"]')
const displayInfoCard = document.querySelector('[data-app="infoCard"]')

const storeDataCity = response => {
    const objData = JSON.stringify(response)
    localStorage.setItem('cityData', objData)
    const getCityData = localStorage.getItem('cityData')
    return getCityData
}

const storeDataConditions = response => {
    const objData = JSON.stringify(response)
    localStorage.setItem('cityConditions', objData)
    const getCityConditions = localStorage.getItem('cityConditions')
    return getCityConditions
}

const showInfoCity = (
LocalizedName,
WeatherText,
WeatherIcon,
Temperature,
IsDayTime) => {
    cityName.textContent = LocalizedName
    display_Weather.textContent = WeatherText
    display_Weather_Icon.innerHTML = `<img data-app="icon-ref" src="./icons/${WeatherIcon}.svg" class="icon-Ref "></img>`
    localTemperature.textContent = Temperature.Metric.Value
    IsDayTime ? day_Image.src = "./src/day.svg" : day_Image.src = "./src/night.svg"
}

const infoCityData = async inputData => {
    const responseCity = await getInfoCityWeather(inputData)
    const [{Key, LocalizedName}] = JSON.parse(storeDataCity(responseCity))

    const responseConditions = await fetchURL(urlConditions(Key))
    const [{IsDayTime, WeatherText, WeatherIcon, Temperature }] = JSON.parse(storeDataConditions(responseConditions))

    showInfoCity(LocalizedName, WeatherText, WeatherIcon, Temperature, IsDayTime)
}

const showLastCity = () => {
    const [{LocalizedName}] = JSON.parse(localStorage.getItem("cityData"))
    const [{IsDayTime, WeatherText, WeatherIcon, Temperature }] = JSON.parse(localStorage.getItem("cityConditions"))

    showInfoCity(LocalizedName, WeatherText, WeatherIcon, Temperature, IsDayTime)
}

form.addEventListener("submit", event => {
    event.preventDefault()
    const inputData = event.target.inputCity.value.trim()
    
    infoCityData(inputData)
    
    form.reset()
})

showLastCity()



































































// infoCityData()
// localStorage.clear()

// const storeData = response => {
//     const objData = JSON.stringify(response)
//     localStorage.setItem('cityData', objData)
//     const getCityData = localStorage.getItem('cityData')
//     return getCityData
// }


// const dataJSON = async inputData => {
    // const responseCity = await getInfoCityWeather(inputData)
    // const [{Key, LocalizedName}] = JSON.parse(storeData(responseCity))

    // const responseConditions = await fetchURL(urlConditions(Key))
    // const [{IsDayTime, WeatherText, WeatherIcon, Temperature }] = JSON.parse(storeData(responseConditions))
    



    
    

    // return LocalizedName + IsDayTime + WeatherText + WeatherIcon + Temperature.Metric.Value 
// }
//  dataJSON("Quintana").then(console.log)//Retorna um array de objetos;   
//  dataJSON("Quintana").then(console.log)   
//  dataJSON("São Paulo").then(console.log)   
    
// const dataJSON2 = async inputData => {
//     const [{Key}] = await getInfoCityWeather(inputData)
//     return response2
// }    
// dataJSON2('Quintana').then(console.log)//Retorna dados do clima da city;
    
// localStorage.removeItem('Key')
    
    
    





