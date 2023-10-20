import axios from "axios";

const emailSender = async (email, title, message) => {
      
  try {
    const response = await axios.post("/users/send-email", {
      email: email,
      title: title,
      message: message,
    });

    console.log("Email sent successfully:", response.data);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}

export default emailSender;

