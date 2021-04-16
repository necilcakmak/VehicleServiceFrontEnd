import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { invoiceGet } from "../api/apiCalls";
import Moment from "moment";

const InvoiceDetail = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState({});

  useEffect(() => {
    invoiceGet(id).then((response) => {
      setInvoice(response.data.data);
    });
  }, [id]);
  return (
    <div className="container p-3">
      <div className="card">
        <div className="card-header font-weight-bold ">
          <span className=" text-info">Fatura Açıklaması:</span> {invoice.description}
        </div>
        <ul className="list-group list-group-flush">
          <h5 className="p-2 text-success">Şirket Bilgisi</h5>
          <li className="list-group-item">
          <span className="font-weight-bold">Faturayı Kesen:</span>  {invoice.companyPersonName}
          </li>
          <h5  className="p-2 text-success">Müşteri Bilgisi</h5>
          <li className="list-group-item">
          <span className="font-weight-bold">Müşteri Adı:</span>  {invoice.customerName}
          </li>
          <li className="list-group-item">
          <span className="font-weight-bold">Müşteri Adres:</span>   {invoice.customerAdress}
          </li>
          <li className="list-group-item">
          <span className="font-weight-bold">Müşteri E-Posta:</span> {invoice.customerEmail}
          </li>
          <li className="list-group-item">
          <span className="font-weight-bold">Müşteri Telefon:</span> {invoice.customerPhoneNumber}
          </li>
          <h5 className="p-2 text-success">Ödeme Bilgisi</h5>
          <li className="list-group-item">
          <span className="font-weight-bold">Ödeme Türü:</span> {invoice.payment}
            </li>
          <li className="list-group-item">
          <span className="font-weight-bold">Ödeme Tarihi:</span>  {Moment(invoice.invoiceDate).format("DD.MM.YYYY")}
          </li>
          <h5 className="p-2 text-success">Ürün Bilgisi</h5>
          <li className="list-group-item">
          <table className="table table-hover p-3">
        <thead>
          <tr>
            <th scope="col">Ürün Açıklama</th>
            <th scope="col">Adet</th>
            <th scope="col">Ara Toplam</th>
            <th scope="col">Vergi Toplamı</th>
            <th scope="col">Toplam Net Fiyat</th>
          </tr>
        </thead>
        <tbody>
        {invoice.invoiceProducts?.map((i) => (
              <tr key={i.id}>
              <td>{i.itemDescription}</td>
              <td>{i.quantity}</td>
              <td>{i.subTotal}</td>
              <td>{i.totalTax}</td>
              <td>{i.totalPrice}</td>
            </tr>))}
            <tr key={1}>
              <td className="font-weight-bold text-info">Toplam</td>
              <td></td>
              <td className="font-weight-bold ">{invoice?.invoiceProducts?.reduce((tSubTotal, product) => tSubTotal + product.subTotal, 0)}</td>
              <td className="font-weight-bold ">{invoice?.invoiceProducts?.reduce((tSubTotal, product) => tSubTotal + product.totalTax, 0)}</td>
              <td className="font-weight-bold text-success">{invoice?.invoiceProducts?.reduce((tSubTotal, product) => tSubTotal + product.totalPrice, 0)}</td>
            </tr>
        </tbody>
      </table>
      </li>
        </ul>
      </div>
      <Link to={"/invoice"}>
        {<button className="btn btn-info m-1">Geri Dön</button>}
      </Link>
    </div>
  );
};

export default InvoiceDetail;
