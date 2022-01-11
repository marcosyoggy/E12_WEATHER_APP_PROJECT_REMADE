

const form = document.querySelector('[data-app="inputData"')
const cityName = document.querySelector('[data-app="cityname"]')
const localTemperature = document.querySelector('[data-app="temperature"]')
const day_Image = document.querySelector('[data-app="time"]')
const display_Weather = document.querySelector('[data-app="display_Weather"]')
const display_Weather_Icon = document.querySelector('[data-app="weatherIcon"]')
const displayInfoCard = document.querySelector('[data-app="infoCard"]')

const infoCityData = async inputData => {
    const [{ Key, LocalizedName }] = await getInfoCityWeather(inputData)
    const [{ IsDayTime, WeatherText, WeatherIcon, Temperature }] = await fetchURL(urlConditions(Key))

    cityName.textContent = LocalizedName
    display_Weather.textContent = WeatherText
    display_Weather_Icon.innerHTML = `<img data-app="icon-ref" src="./icons/${WeatherIcon}.svg" class="icon-Ref "></img>`
    localTemperature.textContent = Temperature.Metric.Value
    IsDayTime ? day_Image.src = "./src/day.svg" : day_Image.src = "./src/night.svg"
}

const displayCard = () => displayInfoCard.classList.contains('d-none') ? displayInfoCard.classList.remove('d-none') : null

form.addEventListener("submit", event => {
    event.preventDefault()
    const inputData = event.target.inputCity.value.trim()

    displayCard()

    infoCityData(inputData)

    form.reset()
})

















