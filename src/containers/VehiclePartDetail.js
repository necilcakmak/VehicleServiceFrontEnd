import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { vehiclePartGet, vehiclePartDelete } from "../api/apiCalls";
import alertify from "alertifyjs";
const VehiclePartDetail = () => {
  const { id } = useParams();
  const [vehiclePart, setVehiclePart] = useState({});

  useEffect(() => {
    vehiclePartGet(id).then((response) => {
      setVehiclePart(response.data.data);
    });
  }, [id]);
  
  const deleteVehiclePart = async (id) => {
    await vehiclePartDelete(id);
    alertify.success("Kayıt Silindi.");
  };
  return (
    <div className="container p-3">
      <div className="card">
        <div className="card-header font-weight-bold text-info">
          {vehiclePart.partCode} Kodlu Parça Bilgisi
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="font-weight-bold">Parça Tipi:</span> {vehiclePart.partType}
          </li>
          <li className="list-group-item">
          <span className="font-weight-bold">Alış Fiyatı:</span> {vehiclePart.buyPrice} ₺
          </li>
          <li className="list-group-item">
          <span className="font-weight-bold">Stok Adeti: </span>{vehiclePart.stock}</li>
          <li className="list-group-item">
          <span className="font-weight-bold">Vergi Oranı:</span> %{vehiclePart.taxRate}
          </li>
          <li className="list-group-item">
          <span className="font-weight-bold">Satış Fiyatı:</span> {vehiclePart.sellPrice} ₺
          </li>
          <li className="list-group-item">
          <span className="font-weight-bold">Vergi Durumu:</span> {vehiclePart.taxStatus}
          </li>
        </ul>
      </div>
      <Link to={"/vehiclePart"}>
        {<button className="btn btn-info m-1 mt-1">Geri Dön</button>}
      </Link>
      {
        <button
          className="btn btn-danger m-1 mt-1"
          onClick={() => deleteVehiclePart(vehiclePart.id)}
        >
          Sil
        </button>
      }
      {<Link to={"/vehiclePartCreate/"+vehiclePart.id}><button className="btn btn-warning m-1 mt-1">Düzenle</button></Link>}
    </div>
  );
};

export default VehiclePartDetail;
