import axios from "axios";

export const loginUrl = (body) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/api/login`, body);
};

//customer urls
export const customerGet = (id) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/api/customer/${id}`);
};

export const customerList = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/api/customers`);
};
export const customerCreate = (body) => {
  return axios.post(
    `${process.env.REACT_APP_API_URL}/api/customer/create`,
    body
  );
};

export const customerUpdate = (body) => {
  return axios.put(`${process.env.REACT_APP_API_URL}/api/customer/update`,body);
};

export const customerDelete = (id) => {
  return axios.delete(
    `${process.env.REACT_APP_API_URL}/api/customer/${id}`
  );
};

//Vehicle Urls
export const vehicleGet = (id) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/api/vehicle/${id}`);
};

export const vehicleList = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/api/vehicles`);
};

export const vehicleCreate = (body) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/api/vehicle/create`,body);
};
export const vehicleUpdate = (body) => {
  return axios.put(`${process.env.REACT_APP_API_URL}/api/vehicle/update`,body);
};

export const vehicleDelete = (id) => {
  return axios.delete(
    `${process.env.REACT_APP_API_URL}/api/vehicle/${id}`
  );
};

//Vehicle Part Urls
export const vehiclePartGet = (id) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/api/vehiclePart/${id}`);
};

export const vehiclePartList = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/api/vehicleParts`);
};

export const vehiclePartCreate = (body) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/api/vehiclePart/create`,body);
};

export const vehiclePartUpdate = (body) => {
  return axios.put(`${process.env.REACT_APP_API_URL}/api/vehiclePart/update`,body);
};

export const vehiclePartDelete = (id) => {
  return axios.delete(
    `${process.env.REACT_APP_API_URL}/api/vehiclePart/${id}`
  );
};

//Invoice Urls
export const invoiceGet = (id) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/api/invoice/${id}`);
};

export const invoiceList = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/api/invoices`);
};

export const invoiceLastList = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/api/invoiceLast`);
};

export const invoiceCreate = (body) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/api/invoice/create`,body);
};

export const invoiceDelete = (id) => {
  return axios.delete(
    `${process.env.REACT_APP_API_URL}/api/invoice/${id}`
  );
};