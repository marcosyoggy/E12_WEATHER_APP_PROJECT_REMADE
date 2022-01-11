
const myAPIKey = 'bvsFtJOb7CoBi7g4zEOH05RfRIz1vAAA'

const urlCity = inputData => `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${myAPIKey}&q=${inputData}`

const urlConditions = keyCode => `http://dataservice.accuweather.com/currentconditions/v1/${keyCode}?apikey=${myAPIKey}&Language=pt-br`

const fetchURL = async url => {
    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error('IHHH...Deu Pau...REFAÇA!!!')
        }

        const objPromise = await response.json()
        return objPromise

    } catch (error) { alert(error.message) }
}

const getInfoCityWeather = async inputData => {
    const response = await fetchURL(urlCity(inputData))
    return response
}


// const getInfoCityWeather = async inputData => {
//     const [{Key}] = await fetchURL(urlCity(inputData))
//     return Key
//     // const response = await fetchURL(urlCity(inputData))
//     // return response
// }

// getInfoCityWeather('Quintana').then(console.log)

// const infoData = async inputData => {
//     const keyCod = await getInfoCityWeather(inputData)
//     const response = await fetchURL(urlConditions(keyCod))
//     return response
// }

// infoData('Quintana').then(console.log)
