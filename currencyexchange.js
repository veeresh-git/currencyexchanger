const axios = require('axios');

const getexchanger = async (fromcurrency,tocurrency) =>{
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1')
    const rate = response.data.rates
    const euro = 1/rate[fromcurrency];
    const exchangeamnt = euro*rate[tocurrency]
    if(isNaN(exchangeamnt))
    {
        throw new Error(`unable to get currency ${fromcurrency} to ${tocurrency}`)
    }
    return exchangeamnt;
}

const getcountries = async (tocurrency) =>{
    try{ 
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${tocurrency}`)
        const countries = response.data.map(country=>country.name)
        return countries;
    }
    catch(error){
        throw new Error(`unabe to find countries with ${tocurrency}`)
    }   
}

const convertcurrency = async (fromcurrency,tocurrency,amount) =>{
    const countries = await getcountries(tocurrency)
    const exchange = await getexchanger(fromcurrency,tocurrency)
    const convertedamount = amount*exchange;

    return `${amount} ${fromcurrency} is worth ${convertedamount} ${tocurrency} and is used in following countries ${countries}`
}
//specify below currency to convert
convertcurrency('USD','EUR',30).then(
    (message)=>console.log(message)
).catch((error)=>console.log(error.message));
