import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/pesagem/"; 

const PesagemService = {

  async listarPesagens() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Erro ao listar pesagens:", error);
      throw error;
    }
  },


  async cadastrarPesagem(pesagemData) {
    try {
      const response = await axios.post(API_URL, pesagemData);
      return response.data;
    } catch (error) {
      console.error("Erro ao cadastrar pesagem:", error);
      throw error;
    }
  },


  async atualizarPesagem(id, pesagemData) {
    try {
      const response = await axios.put(`${API_URL}${id}/`, pesagemData);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar pesagem:", error);
      throw error;
    }
  },


  async deletarPesagem(id) {
    try {
      await axios.delete(`${API_URL}${id}/`);
    } catch (error) {
      console.error("Erro ao deletar pesagem:", error);
      throw error;
    }
  }
};

export default PesagemService;
