import React, { useState,useEffect } from "react";
import Input from "../tools/Input";
import { customerCreate,customerUpdate,customerGet } from "../api/apiCalls";
import alertify from "alertifyjs";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

const CustomerCreate = () => {
  let history = useHistory();
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [form, setForm] = useState({
    Name: null,
    Email: null,
    PhoneNumber: null,
    TaxNo: null,
    Adress: null,
  });
  const { name, email, phoneNumber, taxNo, adress } = form;
  useEffect(()=>{
    if(id){
      customerGet(id).then((response) => {
        setForm(response.data.data);      
      });
    }
  },[id])
  const onChange = (e) => {
    const { name, value } = e.target;
    setErrors((previousError) => ({
      ...previousError,
      [name]: undefined,
    }));
    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const cred = {
      email,
      name,
      phoneNumber,
      taxNo,
      adress,
    };
    setPendingApiCall(true);
    let response;
    if(!id){
      response=await customerCreate({...cred,id:id});
    }else{
      response=await customerUpdate({...cred,id:id});
    }
    if (response.data.resultStatus === 0) {
      alertify.success("Müşteri Oluşturuldu.");
      history.push("/customer");
    } else {
      setErrors(response.data.validationErrors);
      alertify.error("Kayıt Başarısız!");
    }
    setPendingApiCall(false);
  };
  return (
    <div className="container p-3">
      <h4 className="font-weight-bold text-info text-center">Müşteri İşlemleri</h4>
      <div  className="row justify-content-md-center">
      <form onSubmit={(e) => onSubmit(e)} className="col-sm-8">
        <Input
          label="E-Posta"
          type="email"
          placeholder="E-Posta"
          name="email"
          error={errors.Email}
          value={email}
          onChange={(e) => onChange(e)}
        />
        <Input
        label="İsim"
          type="text"
          placeholder="İsim"
          name="name"
          error={errors.Name}
          value={name}
          onChange={(e) => onChange(e)}
        />
        <Input
        label="Telefon"
          type="text"
          placeholder="Telefon"
          name="phoneNumber"
          error={errors.PhoneNumber}
          value={phoneNumber}
          onChange={(e) => onChange(e)}
        />
        <Input
        label="Vergi Numarası"
          type="text"
          placeholder="Vergi No"
          name="taxNo"
          error={errors.TaxNo}
          value={taxNo}
          onChange={(e) => onChange(e)}
        />
        <Input
        label="Adres"
          type="text"
          placeholder="Adres"
          name="adress"
          error={errors.Adress}
          value={adress}
          onChange={(e) => onChange(e)}
        />
        <button
          className="btn btn-primary"
          type="submit"
          disabled={pendingApiCall}
        >
          {pendingApiCall && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          Oluştur
        </button>
      </form>
      </div>
    </div>
  );
};

export default CustomerCreate;
