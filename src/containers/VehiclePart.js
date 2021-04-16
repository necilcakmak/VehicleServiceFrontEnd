import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { vehiclePartList,vehiclePartDelete } from "../api/apiCalls";
import alertify from "alertifyjs";

const VehiclePart = () => {
  const [vehiclePart, setVehiclePart] = useState([]);
  useEffect(() => {
    vehiclePartList().then((response) => {
      setVehiclePart(response.data.data);
    });
  }, []);
  const deleteVehiclePart = async (id) => {
    await vehiclePartDelete(id);
    var model=vehiclePart.filter(x=>x.id!==id)
    setVehiclePart([...model])
    alertify.success("Kayıt Silindi.");
  };
  return (
    <div className="container p-3">
      <h5 className="float-left p-2">Araba Parçası Listesi</h5>
            <Link className="float-right p-2" to={"/vehiclePartCreate"}>
            {<button className="btn btn-primary">Parça Oluştur</button>}
          </Link>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Parça Tipi</th>
            <th scope="col">Parça Kodu</th>
            <th scope="col">Araç</th>
            <th scope="col">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {vehiclePart?.map((c) => (
            <tr key={c.partCode}>
              <td>{c.partType}</td>
              <td>{c.partCode}</td>
              <td>{c.vehicle.brand+" "+c.vehicle.model}</td>
              <td>
                <Link to={"/vehiclePartDetail/" + c.id}>
                  {<button className="btn btn-info m-1">Detay</button>}
                </Link>
                {
                  <button
                    className="btn btn-danger m-1"
                    onClick={()=>deleteVehiclePart(c.id)}
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

export default VehiclePart;
