import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { invoiceLastList } from "../api/apiCalls";
import Moment from "moment";

const Home = () => {
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    invoiceLastList().then((response) => {
      setInvoices(response.data.data);
    });
  }, []);

  return (
    <div className="container p-3">
      <div className="row">
      
        {/*son 10 fatura işlemi col*/}
        <div className="col-12">
            <h5 className="float-left p-2">Son 10 Fatura</h5>
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
                  <td>
                    {Moment(c.invoiceDate).format("DD.MM.YYYY")} Tarihinde
                    Kesildi
                  </td>
                  <td>
                    <Link to={"/invoiceDetail/" + c.id}>
                      {<button className="btn btn-info">Detay</button>}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
      </div>
    </div>
  );
};

export default Home;
