import axios from 'axios'

const baseUrl = 'http://localhost:3001/usuarios'

class UsuarioService {
    getUsuarios() {
        return axios.get(`${baseUrl}/listar`)
            .then((response) => response.data)
            .catch((error) => {
                console.error('Error fetching data:', error)
            }
        )
    }

    getUsuario(id: any) {
        return axios.get(`${baseUrl}/buscar/${id}`)
            .then((response) => response.data)
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }

    addUsuario(data: any) {
        return axios.post(`${baseUrl}/registrar`, data)
            .then((response) => response.status)
            .catch((error) => {
                console.error('Error fetching data:', error)
            }
        )
    }

    deleteUsuario(id: any) {
        return axios.delete(`${baseUrl}/remover/${id}`)
            .then((response) => response.status)
            .catch((error) => {
                console.error('Erro ao remover usuario', error)
            })
    }

    updateUsuario(id: any, data: any) {
        return axios.put(`${baseUrl}/atualizar/${id}`, data)
            .then((response) => response.status)
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }
}

export default new UsuarioService()