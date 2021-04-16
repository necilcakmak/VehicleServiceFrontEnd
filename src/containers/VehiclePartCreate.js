import React, { useState, useEffect } from "react";
import Input from "../tools/Input";
import { vehiclePartCreate, vehicleList,vehiclePartGet,vehiclePartUpdate } from "../api/apiCalls";
import alertify from "alertifyjs";
import SelectInput from "../tools/SelectInput";
import { useParams } from "react-router";
const VehiclePartCreate = () => {
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({
    PartType: null,
    PartCode: null,
    PartPrice: null,
    Stock: null,
    TaxRate: null,
    BuyPrice: null,
    SellPrice: null,
    TaxStatus: null,
    VehicleId: null,
  });
  const {
    partType,
    partCode,
    partPrice,
    stock,
    taxRate,
    buyPrice,
    sellPrice,
    taxStatus,
    vehicleId,
  } = form;
  useEffect(()=>{
    if(id){
      vehiclePartGet(id).then((response) => {
        setForm(response.data.data);      
      });
    }
  },[id])

  useEffect(() => {
    vehicleList().then((response) => {
      setVehicles(response.data.data);
    });
  }, []);
  
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
      partType,
      partCode,
      partPrice,
      stock,
      taxRate,
      buyPrice,
      sellPrice,
      taxStatus,
      vehicleId,
    };
    setPendingApiCall(true);
    let response;
    if(!id){
      response=await vehiclePartCreate({...cred,id:id});
    }else{
      response=await vehiclePartUpdate({...cred,id:id});
    }
    if (response.data.resultStatus === 0) {
      alertify.success("Araç Parçası Kaydedildi.");
    } else {
      setErrors(response.data.validationErrors);
      alertify.error("Kayıt Başarısız!");
    }
    setPendingApiCall(false);
  };
  return (
    <div className="container p-3">
      <h4 className="text-info font-weight-bold text-center">Araba Parçası İşlemleri</h4>
      <div  className="row justify-content-md-center">
      <form onSubmit={(e) => onSubmit(e)} className="col-sm-8">
        <Input
          label="Parça Tipi"
          type="text"
          placeholder="Parça Tipi"
          name="partType"
          error={errors.PartType}
          value={partType}
          onChange={(e) => onChange(e)}
        />
        <Input
        label="Parça Kodu"
          type="text"
          placeholder="Parça Kodu"
          name="partCode"
          error={errors.PartCode}
          value={partCode}
          onChange={(e) => onChange(e)}
        />
        
        <Input
        label="Stok Adet"
          type="number"
          placeholder="Stok Adeti"
          name="stock"
          error={errors.Stock}
          value={stock}
          onChange={(e) => onChange(e)}
        />
        <Input
        label="Vergi Oranı"
          type="number"
          placeholder="Vergi Oranı"
          name="taxRate"
          error={errors.TaxRate}
          value={taxRate}
          onChange={(e) => onChange(e)}
        />
        <Input
        label="Alış Fiyatı"
          type="number"
          placeholder="Alış Fiyatı"
          name="buyPrice"
          error={errors.BuyPrice}
          value={buyPrice}
          onChange={(e) => onChange(e)}
        />
        <Input
        label="Satış Fiyatı"
          type="number"
          placeholder="Satış Fiyatı"
          name="sellPrice"
          error={errors.SellPrice}
          value={sellPrice}
          onChange={(e) => onChange(e)}
        />
        <Input
        label="Vergi Durumu"
          type="text"
          placeholder="Vergi Durumu"
          name="taxStatus"
          error={errors.TaxStatus}
          value={taxStatus}
          onChange={(e) => onChange(e)}
        />
        <SelectInput
        label="Araç"
          defaultOption="Araç Seçiniz."
          name="vehicleId"
          value={vehicleId}
          error={errors.VehicleId}
          options={vehicles.map((v) => ({
            value: v.id,
            text: v.brand + " " + v.model,
          }))}
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

export default VehiclePartCreate;
