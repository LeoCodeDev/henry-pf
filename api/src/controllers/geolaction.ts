import axios from "axios";
const { API_KEY_IP } = process.env;
const { isIPv6 } = require('net');


const geoLocation = async () => {
  const {data} = await axios.get('https://api.ipgeolocation.io/getip')
  const {ip} = data



  console.log("estamos dentro de la funcion" , ip)
 try {
    if (ip && isIPv6(ip)) {
      const { data } = await axios.get(
        `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY_IP}&ip=${ip}`
      );
      const currency = data.currency.code;
      const flag = data.country_flag;
      const countryName = data.country_name;
      const symbol = data.currency.symbol;
      const currencyName = data.currency.name;

      console.log( 'aqui esta el console log que tanto buscaste    ' + currency +flag +countryName + symbol + currencyName);

    //  const location = JSON.({ currency, flag, countryName, symbol, currencyName });
    return { currency, flag, countryName, symbol, currencyName }

    //  return location

    } else {
       return
    }}
    catch (error: any) {
        console.log(error.message);
      }
return
};

export default geoLocation;
