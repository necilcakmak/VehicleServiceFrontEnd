import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Input from '../tools/Input';
import SelectInput from '../tools/SelectInput';
import { customerList, vehiclePartList, invoiceCreate } from '../api/apiCalls';
import alertify from 'alertifyjs';
import { useHistory } from "react-router-dom";

const InvoiceCreate = ({ user }) => {
  let history = useHistory();
  const [errors, setErrors] = useState({});
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [vehicleParts, setVehicleParts] = useState([]);
  const [invoiceProducts, setInvoiceProducts] = useState([]);
  useEffect(() => {
    customerList().then(response => {
      setCustomers(response.data.data);
    });
    vehiclePartList().then(response => {
      setVehicleParts(response.data.data);
    });
  }, []);
  const list = [
    { id: 'Nakit', method: 'Nakit' },
    { id: 'Kredi Kartı', method: 'Kredi Kartı' },
  ];
  const [form, setForm] = useState({
    CustomerId: null,
    CompanyPersonId: user.id,
    Description: null,
    Payment: null,
    InvoiceDate: null,
  });
  const [productForm, setProductForm] = useState({
    quantity: null,
    vehiclePartId: null,
  });
  const { customerId,CompanyPersonId, description, payment, invoiceDate } = form;
  const { vehiclePartId, quantity } = productForm;
  const onSubmit = async e => {
    e.preventDefault();
    const cred = {
      customerId,
      CompanyPersonId,
      description,
      payment,
      invoiceProducts,
      invoiceDate,
    };
    setPendingApiCall(true);
    const response = await invoiceCreate(cred);
    if (response.data.resultStatus === 0) {
      alertify.success('Fatura Oluşturuldu.');
      history.push("/invoice");
    } else {
      setErrors(response.data.validationErrors);
      alertify.error('Kayıt Başarısız!');
    }
    setPendingApiCall(false);
  };
  const onChange = e => {
    const { name, value } = e.target;
    setErrors(previousError => ({
      ...previousError,
      [name]: undefined,
    }));
    setForm(previousForm => ({
      ...previousForm,
      [name]: value,
    }));
  };
  const onChangeProduct = e => {
    const { name, value } = e.target;
    setProductForm(() => ({
      ...productForm,
      [name]: parseInt(value),
    }));
  };
  const addProduct = () => {
    if (invoiceProducts.filter(x => x.vehiclePartId === productForm.vehiclePartId).length > 0) {
      var model = invoiceProducts.filter(x => x.vehiclePartId === productForm.vehiclePartId)[0];
      var array = invoiceProducts.filter(x => x.vehiclePartId !== productForm.vehiclePartId); 
      model.quantity += productForm.quantity;
      array.push(model);
      setInvoiceProducts(array);
    } else {
      setInvoiceProducts([...invoiceProducts, productForm]);
    }
  };
  function productDelete(k) {
    const array = [...invoiceProducts];
    array.splice(k,1)
    if (array.length === 0) {
      setInvoiceProducts([]);
    } else {
      setInvoiceProducts(array);
    }
  }
  return (
    <div className="container p-3">
      <h3 className="font-weight-bold text-info text-center">Fatura Oluştur</h3>
      <form onSubmit={e => onSubmit(e)}>
        <Input
          label="Açıklama"
          type="text"
          placeholder="Açıklama"
          name="description"
          error={errors.Description}
          value={description}
          onChange={e => onChange(e)}
        />
        <SelectInput
          label="Ödeme Yöntemi"
          defaultOption="Ödeme Yöntemi Seçiniz"
          name="payment"
          value={payment}
          error={errors.Payment}
          options={list.map(v => ({
            value: v.id,
            text: v.method,
          }))}
          onChange={e => onChange(e)}
        />
        <SelectInput
          label="Müşteri"
          defaultOption="Müşteri Seçiniz"
          name="customerId"
          value={customerId}
          error={errors.CustomerId}
          options={customers.map(v => ({
            value: v.id,
            text: v.name,
          }))}
          onChange={e => onChange(e)}
        />
        <Input
          label="Fatura Kesilme Tarihi"
          type="datetime-local"
          value={invoiceDate}
          placeholder="Tarih"
          name="invoiceDate"
          id="example-datetime-local-input"
          onChange={e => onChange(e)}
        />
        <h4>Faturada ki Ürünler</h4>
        <SelectInput
          label="Araç Parça"
          defaultOption="Araç Parça Seçiniz"
          name="vehiclePartId"
          value={vehiclePartId}
          error={errors.VehiclePartId}
          options={vehicleParts.map(v => ({
            value: v.id,
            text: 'Araba Markası: ' + v.vehicle.brand + ' - Parça Kodu: ' + v.partCode + ' - ' + v.sellPrice + '₺',
          }))}
          onChange={e => onChangeProduct(e)}
        />
        <label>Mevcut Stok:{vehicleParts?.filter(y => y.id === vehiclePartId)[0]?.stock}</label>
        <Input
          label="Adet"
          type="number"
          placeholder="Adet"
          name="quantity"
          error={errors.Quantity}
          value={quantity}
          onChange={e => onChangeProduct(e)}
        />
        <button className="btn btn-primary float-right" type="submit" disabled={pendingApiCall || invoiceProducts.length === 0}>
          {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
          Oluştur
        </button>
        <button
          disabled={
            parseInt(quantity) <= 0 || quantity == null || parseInt(quantity) > vehicleParts?.filter(y => y.id === vehiclePartId)[0]?.stock
          }
          className="btn btn-primary float-left "
          type="button"
          onClick={addProduct}
        >
          Ürün Ekle
        </button>
      </form>

      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Marka</th>
            <th scope="col">Model</th>
            <th scope="col">Parça Kodu</th>
            <th scope="col">Vergi Oranı</th>
            <th scope="col">Adet</th>
            <th scope="col">Satış Fiyat</th>
            <th scope="col">Toplam Fiyat</th>
            <th scope="col">Sil</th>
          </tr>
        </thead>
        <tbody>
          {invoiceProducts?.map((x, k) => (
            <tr>
              <td>{vehicleParts?.filter(y => y.id === x?.vehiclePartId)[0]?.vehicle.brand}</td>
              <td>{vehicleParts?.filter(y => y.id === x?.vehiclePartId)[0]?.vehicle.model}</td>
              <td>{vehicleParts?.filter(y => y.id === x?.vehiclePartId)[0]?.partCode}</td>
              <td>%{vehicleParts?.filter(y => y.id === x?.vehiclePartId)[0]?.taxRate}</td>
              <td>{x?.quantity}</td>
              <td>{vehicleParts?.filter(y => y.id === x?.vehiclePartId)[0]?.sellPrice + '₺'}</td>
              <td>{vehicleParts?.filter(y => y.id === x?.vehiclePartId)[0]?.sellPrice * x?.quantity + '₺'}</td>
              <td>
                <button className="btn btn-danger" type="button" onClick={() => productDelete(k)}>
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, null)(InvoiceCreate);
