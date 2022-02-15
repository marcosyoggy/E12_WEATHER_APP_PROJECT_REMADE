/*
  06
  
  - Na Weather Application, refatore para uma factory function o código que 
    executa os requests e obtém as informações do clima da cidade;
  - Se ao fazer o request, uma mensagem "Access to fetch at 'http://...' from 
    origin 'http://...'"... for exibida no console, crie uma nova app na 
    plataforma da accuweather e pegue uma nova chave: 
    https://developer.accuweather.com/;
  - O procedimento é o mesmo mostrado nas aulas da etapa em que construímos essa
    aplicação.
*/

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

const requests_Methods = {

    showInfoCity(
        LocalizedName,
        WeatherText,
        WeatherIcon,
        Temperature,
        IsDayTime) {
        cityName.textContent = LocalizedName
        display_Weather.textContent = WeatherText
        display_Weather_Icon.innerHTML = `<img data-app="icon-ref" src="./icons/${WeatherIcon}.svg" class="icon-Ref "></img>`
        localTemperature.textContent = Temperature.Metric.Value
        IsDayTime ? day_Image.src = "./src/day.svg" : day_Image.src = "./src/night.svg"
    },

    async infoCityData(inputData) {
        const responseCity = await getInfoCityWeather(inputData)
        const [{ Key, LocalizedName }] = JSON.parse(storeDataCity(responseCity))

        const responseConditions = await fetchURL(urlConditions(Key))
        const [{ IsDayTime, WeatherText, WeatherIcon, Temperature }] = JSON.parse(storeDataConditions(responseConditions))

        this.showInfoCity(LocalizedName, WeatherText, WeatherIcon, Temperature, IsDayTime)
    }
}

function factory_Request_APP() {
    let new_obj = Object.create(requests_Methods)
    return new_obj
}

const enter_City_Name = factory_Request_APP()

form.addEventListener("submit", event => {
    event.preventDefault()
    const inputData = event.target.inputCity.value.trim()

    enter_City_Name.infoCityData(inputData)

    localStorage.setItem('lastCity', inputData)

    form.reset()
})

const lastCity = localStorage.getItem('lastCity')

lastCity ? enter_City_Name.infoCityData(lastCity) : null
