import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { customerList, customerDelete } from "../api/apiCalls";
import alertify from "alertifyjs";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    customerList().then(response => {
      setCustomers(response.data.data);
    });
  }, []);
  const deleteCustomer = async (id) => {
    await customerDelete(id);
    var model=customers.filter(x=>x.id!==id)
    setCustomers([...model])
    alertify.success("Kayıt Silindi.");
  };
  return (
    <div className="container p-3">
      <h5 className="float-left p-2">Müşteri Listesi</h5>
            <Link className="float-right p-2" to={"/customerCreate"}>
            {<button className="btn btn-primary">Müşteri Ekle</button>}
          </Link>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Müşteri Adı</th>
            <th scope="col">E-Posta</th>
            <th scope="col">Telefon</th>
            <th scope="col">Vergi Numarası</th>
            <th scope="col">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {customers?.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phoneNumber}</td>
              <td>{c.taxNo}</td>
              <td>
                <Link to={"/customerDetail/" + c.id}>
                  {<button className="btn btn-info">Detay</button>}
                </Link>
                {
                  <button
                    className="btn btn-danger m-1"
                    onClick={() => deleteCustomer(c.id)}
                  >
                    Sil
                  </button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customer;
