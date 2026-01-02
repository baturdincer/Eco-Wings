import axios from "axios";

const API_URL = "http://localhost:5000/api/Payment";

export const paymentService = {
  // Bilet ödemesi yapma - Swagger'a göre query parametresi kullanılır
  payTicket: async (ticketId, amount) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_URL}/pay`, null, {
        params: {
          ticketId: ticketId,
          amount: amount,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Webhook işlemi
  handleWebhook: async (webhookData) => {
    try {
      const response = await axios.post(`${API_URL}/webhook`, webhookData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
