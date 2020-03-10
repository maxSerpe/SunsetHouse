import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertReservation = payload => api.post(`/reservation`, payload)
export const getAllReservations = () => api.get(`/reservations`)
export const getApprovedReservations = () => api.get(`/approvedReservations`)
export const updateReservationById = payload => api.put(`/reservation`, payload)
export const deleteReservationById = id => api.delete(`/reservation/${id}`)
export const getReservationById = id => api.get(`/reservation/${id}`)



const apis = {
    insertReservation,
    getAllReservations,
    updateReservationById,
    deleteReservationById,
    getReservationById,
    getApprovedReservations
}

export default apis