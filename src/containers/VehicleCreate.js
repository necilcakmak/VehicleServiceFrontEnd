import React, { useState,useEffect } from "react";
import Input from "../tools/Input";
import { vehicleCreate,vehicleUpdate,vehicleGet } from "../api/apiCalls";
import alertify from "alertifyjs";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

const VehicleCreate = () => {
  let history = useHistory();
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [form, setForm] = useState({
    Model: null,
    Brand: null,
  });
  const { model, brand } = form;
  useEffect(()=>{
    if(id){
      vehicleGet(id).then((response) => {
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
      model,
      brand,
    };
    setPendingApiCall(true);
    let response;
    if(!id){
      response=await vehicleCreate({...cred,id:id});
    }else{
      response=await vehicleUpdate({...cred,id:id});
    }
    if (response.data.resultStatus === 0) {
      alertify.success("Araç Kaydedildi.");
      history.push("/vehicle");
    } else {
      setErrors(response.data.validationErrors);
      alertify.error("Kayıt Başarısız!");
    }
    setPendingApiCall(false);
  };
  return (
    <div className="container p-3">
      <h4 className="text-info font-weight-bold text-center">Araba İşlemleri</h4>
      <div  className="row justify-content-md-center">
      <form onSubmit={(e) => onSubmit(e)} className="col-sm-8">
        <Input
          label="Marka"
          type="text"
          placeholder="Marka"
          name="brand"
          error={errors.Brand}
          value={brand}
          onChange={(e) => onChange(e)}
        />
        <Input
         label="Model"
          type="text"
          placeholder="Model"
          name="model"
          error={errors.Model}
          value={model}
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

export default VehicleCreate;
