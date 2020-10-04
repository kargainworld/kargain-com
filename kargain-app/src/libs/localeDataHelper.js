const getLocaleData = async (vehicleType, lang) => {
    return new Promise((resolve, reject) => {
        if(!lang || !vehicleType) return reject("invalid parameters")
        const fallbackLang = lang === "en" ? "en" : "fr"
        const data = import(`../components/Products/${vehicleType}/form.data_${fallbackLang}`)
        if(!data) return reject("missing data")
        setTimeout(() => {
            return resolve(data)
        }, 300)
    })
}

export default {
    getLocaleData
}
