import axios from './axios';

export const signupRequest = user => axios.post(`/signup`, user);
export const loginRequest = user => axios.post(`/login`, user);

export const profileRequest = (id, user) => axios.put(`/profile/${id}`, user);

export const userRequest = id => axios.get(`/user/${id}`);

export const verifyTokenRequest = () => axios.get('/verify');
