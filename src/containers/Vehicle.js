import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { vehicleList, vehicleDelete } from '../api/apiCalls';
import alertify from 'alertifyjs';

const Vehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    vehicleList().then(response => {
      setVehicles(response.data.data);
    });
  }, []);
  const deleteVehicle = async id => {
    await vehicleDelete(id);
    var model = vehicles.filter(x => x.id !== id);
    setVehicles([...model]);
    alertify.success('Kayıt Silindi.');
  };
  return (
    <div className="container p-3">
      <h5 className="float-left p-2">Araba Listesi</h5>
      <Link className="float-right p-2" to={'/vehicleCreate'}>
        {<button className="btn btn-primary">Araba Ekle</button>}
      </Link>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Araç Markası</th>
            <th scope="col">Araç Modeli</th>
            <th scope="col">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {vehicles?.map(c => (
            <tr>
              <td>{c.brand}</td>
              <td>{c.model}</td>
              <td>
                <Link to={'/vehicleDetail/' + c.id}>{<button className="btn btn-info m-1">Detay</button>}</Link>
                {
                  <button className="btn btn-danger m-1" onClick={() => deleteVehicle(c.id)}>
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

export default Vehicle;
