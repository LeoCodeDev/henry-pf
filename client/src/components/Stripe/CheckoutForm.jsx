import { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import {
  Button,
  Paper,
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useCartStore } from "../../store/shoppingCartStore";
import { useNavigate } from "react-router-dom";
import { useProductsStore } from "../../store/productsStore";


const CheckoutForm = () => {
  const coupon= JSON.parse(localStorage.getItem('coupon')) || null
  const stripe = useStripe();
  const elements = useElements();
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [address, setAddress] = useState("");
  const [countryCodes, setCountryCodes] = useState([]);
  const { shoppingCart, totalToPay, clearCart} = useCartStore()
  const { actualCurrency } = useProductsStore()
  const navigate = useNavigate()

  useEffect(() => {
    // Hacer una solicitud GET a la API de Rest Countries para obtener la lista de códigos de país
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        // Extraer los códigos de país, nombres y banderas de la respuesta de la API
        const codes = response.data.map((country) => ({
          label: `(${country.cca3})`,
          cod: `${country.idd.root}`,
          suf:
            Array.isArray(country.idd.suffixes) &&
            country.idd.suffixes.length === 1
              ? country.idd.suffixes[0]
              : "",
          value:
            `${country.idd.root}` +
            `${
              Array.isArray(country.idd.suffixes) &&
              country.idd.suffixes.length === 1
                ? country.idd.suffixes[0]
                : ""
            }`,
          flag: country.flags.png, // Obtener la bandera del país
        }));

        // Ordenar los países alfabéticamente por su código de tres letras (cca3)
        codes.sort((a, b) => a.label.localeCompare(b.label));

        setCountryCodes(codes); // Actualizar el estado con los códigos de país y banderas ordenados

        // Establecer el primer código de área como valor predeterminado
        if (codes.length > 0) {
          setCountryCode(codes[0].value);
        }
      })
      .catch((error) => {
        console.error("Error fetching country codes:", error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!address || !countryCode || !phoneNumber) {
      toast.error("Please complete all the required fields.");
      return;
    }

    const fullPhoneNumber = `${countryCode}${phoneNumber}`;
    const phoneNumberPattern = /^\d{5,10}$/;

    if (!phoneNumberPattern.test(phoneNumber)) {
      toast.error("Phone number must be between 5 and 10 digits.");
      return;
    }

    if (address.length < 10) {
      toast.error("Address should be at least 10 characters.");
      return;
    }


    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/order-placed",
      },
      redirect: 'if_required'
    });

    if (error) {
      toast.error(`${error.message}`);
    } else {
        const getEmailFromLs = JSON.parse(localStorage.getItem('authState')).user.email
        await axios.post('/sales/postSale',{
            total: totalToPay,
            address: address,
            phone_number: fullPhoneNumber,
            products: shoppingCart,
            email: getEmailFromLs,
            coupon , 
            currency : actualCurrency
        })
        clearCart()
        localStorage.removeItem('coupon')
        navigate('/order-placed')
    }
  };


  return (
    <Container maxWidth="md" style={{ textAlign: "center" }}>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "10vh", backgroundColor: '#1E1E1E' }}>
        <Typography variant="h4" component="h1" color="primary" gutterBottom>
          Payment Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              marginBottom: "16px",
              display: "flex",
              justifyContent: "center",
              flexDirection: window.innerWidth >= 768 ? "row" : "column",
              gap: "1vw",
            }}
          >
            <TextField
              sx={{ label: { color: '#fff'}, fieldset: { borderColor: '#fff' }, input: { color: '#fff'}}}
              label="Address"

              variant="outlined"
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <Select
            sx={{
                       color: '#fff' ,fieldset: { borderColor: "#fff", color: '#fff' },
                        padding: "0px",
                        "& .MuiSelect-select": { color: "#fff" },
                      }}
                      inputProps={{
                        MenuProps: {
                          PaperProps: {
                            sx: {
                              backgroundColor: "#1E1E1E",
                            },
                          },
                        },
                      }}
              size="small"
              label="Country Code"
              variant="outlined"
              value={countryCode}
              style={{ maxHeight: "6vh" }}
              onChange={(e) => setCountryCode(e.target.value)}
            >
              {countryCodes?.map(
                (code, key) =>
                  code.value != "undefined" ? (
                    <MenuItem
                      key={key}
                      value={code.value}
                      style={{
                        textAlign: "center",
                        alignItems: "center",
                        minWidth: "4vw",
                        color: '#fff'
                      }}
                    >
                      <img
                        src={code.flag}
                        alt={`Flag for ${code.label}`}
                        style={{
                          width: "20px",
                          height: "auto",
                          marginRight: "2px",
                        }}
                      />
                      {`${code.label}`} {code.value}
                    </MenuItem>
                  ) : null // Puedes usar null en lugar de una cadena vacía ""
              )}
            </Select>

            <TextField
              sx={{ label: { color: '#fff'}, fieldset: { borderColor: '#fff' }, input: { color: '#fff'}}}
              label="Phone Number"
              variant="outlined"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={{ minWidth: "12vw" }}
              inputProps={{
                maxLength: 10,
              }}
            />
          </div>
          <PaymentElement />
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
            disabled={!stripe}
            style={{ marginTop: "20px" }}
          >
            Confirm Payment
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            type="button"
            fullWidth
            style={{ marginTop: "20px" }}
            onClick={()=> navigate('/home')}
          >
            Cancel
          </Button>
        </form>
      </Paper>
      <Toaster position="top-center" reverseOrder={false} />
    </Container>
  );
};

export default CheckoutForm;
