import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { vehicleDelete, vehicleGet } from "../api/apiCalls";
import alertify from "alertifyjs";

const VehicleDetail = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState({});

  useEffect(() => {
    vehicleGet(id).then((response) => {
      setVehicle(response.data.data);
    });
  }, [id]);
  const deleteVehicle = async (id) => {
    await vehicleDelete(id);
    alertify.success("Kayıt Silindi.");
  };
  return (
    <div className="container p-3">
      <div className="card">
        <div className="card-header font-weight-bold text-info">
          {vehicle.brand} Marka Araç Bilgisi
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="font-weight-bold">Araç Marka:</span> {vehicle.brand}
          </li>
          <li className="list-group-item">
          <span className="font-weight-bold">Araç Model:</span> {vehicle.model} ₺
          </li>
         
        </ul>
      </div>
      <Link to={"/vehicle"}>
        {<button className="btn btn-info m-1 mt-2">Geri Dön</button>}
      </Link>
      {
        <button
          className="btn btn-danger m-1 mt-2"
          onClick={() => deleteVehicle(vehicle.id)}
        >
          Sil
        </button>
      }
      {<Link to={"/vehicleCreate/"+vehicle.id}><button className="btn btn-warning m-1 mt-2">Düzenle</button></Link>}
    </div>
  );
};

export default VehicleDetail;
