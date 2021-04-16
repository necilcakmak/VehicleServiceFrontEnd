import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { invoiceList, invoiceDelete } from "../api/apiCalls";
import alertify from "alertifyjs";
import Moment from 'moment';

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    invoiceList().then((response) => {
      setInvoices(response.data.data);
    });
  }, []);
  const deleteInvoice = async (id) => {
    await invoiceDelete(id);
    var model=invoices.filter(x=>x.id!==id)
    setInvoices([...model])
    alertify.success("Kayıt Silindi.");
  };
  return (
    <div className="container p-3">
      <h5 className="float-left p-2">Fatura Listesi</h5>
            <Link className="float-right p-2" to={"/invoiceCreate"}>
            {<button className="btn btn-primary">Fatura Oluştur</button>}
          </Link>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Açıklama</th>
            <th scope="col">Ödeme Türü</th>
            <th scope="col">Fatura Tarihi</th>
            <th scope="col">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {invoices?.map((c) => (
            <tr key={c.id}>
              <td>{c.description}</td>
              <td>{c.payment}</td>
              <td>{Moment(c.invoiceDate).format('DD.MM.YYYY')} Tarihinde Kesildi</td>
              <td>
                <Link to={"/invoiceDetail/" + c.id}>
                  {<button className="btn btn-info">Detay</button>}
                </Link>
                {
                  <button
                    className="btn btn-danger m-1"
                    onClick={() => deleteInvoice(c.id)}
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

export default Invoice;
