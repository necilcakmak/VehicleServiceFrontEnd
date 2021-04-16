import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { customerGet,customerDelete } from "../api/apiCalls";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";

const CustomerDetail = (props) => {
  const { id } = useParams();
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    customerGet(id).then((response) => {
      setCustomer(response.data.data);
    });
  }, [id]);
  const deleteCustomer = async (id) => {
    await customerDelete(id);
    alertify.success("Kayıt Silindi.");
  };
  return (
    <div className="container p-3">
    <div className="card">
      <div className="card-header text-info font-weight-bold">
        {customer.name} isimli müşteri bilgisi
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
         <span className="font-weight-bold">Müşteri Adı:</span>  {customer.name}
        </li>
        <li className="list-group-item">
        <span className="font-weight-bold">Müşteri E-posta:</span> {customer.email} 
        </li>
        <li className="list-group-item">
        <span className="font-weight-bold">Telefon:</span> {customer.phoneNumber} 
        </li>
        <li className="list-group-item">
        <span className="font-weight-bold">Vergi Numarası:</span> {customer.taxNo} 
        </li>
        <li className="list-group-item">
        <span className="font-weight-bold">Adres:</span> {customer.adress} 
        </li>
      </ul>
    </div>
    <Link to={"/customer"}>
      {<button className="btn btn-info m-1 mt-1">Geri Dön</button>}
    </Link>
    {
      <button
        className="btn btn-danger m-1 mt-1"
        onClick={() => deleteCustomer(customer.id)}
      >
        Sil
      </button>
    }
    {<Link to={"/customerCreate/"+customer.id}><button className="btn btn-warning m-1 mt-1">Düzenle</button></Link>}
  </div>
  );
};

export default CustomerDetail;
