 import exchange, {Currency} from 'node-currency-exchange-rates';

const currenciesExchange = async (from:Currency, to:Currency, amount:string)=>{
    const parsedAmount=parseInt(amount)
try {

      const convertedValue = await exchange.convert(from, parsedAmount, to);

      return convertedValue

} catch (error:any) {
    return {error: error.message}
}}

export default currenciesExchange;