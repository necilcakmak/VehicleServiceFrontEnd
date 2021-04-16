import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../tools/Input';
import { loginUrl } from '../api/apiCalls';
import alertify from 'alertifyjs';
import { userSetRedux } from '../redux/actions/auth';

const Login = ({ userSetRedux, isAuthenticated }) => {
  const [errors, setErrors] = useState({});
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [form, setForm] = useState({
    Password: null,
    Email: null,
  });

  const { Email, Password } = form;
  const onChange = e => {
    const { name, value } = e.target;
    setErrors(previousError => ({
      ...previousError,
      [name]: undefined,
    }));
    setForm(previousForm => ({
      ...previousForm,
      [name]: value,
    }));
  };
  const onSubmit = async e => {
    e.preventDefault();
    const cred = {
      Email,
      Password,
    };
    setPendingApiCall(true);
    const response = await loginUrl(cred);
    if (response.data.resultStatus === 0) {
      alertify.success('Giriş Başarılı.');
      await userSetRedux(response.data);
    } else {
      setErrors(response.data.validationErrors);
      alertify.error('Giriş Başarısız!');
    }
    setPendingApiCall(false);
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className="container mt-5">
      
      
      <div class="row justify-content-md-center">
        <div class="col-sm-5">
        <h3 class="text-center">Sistem Giriş</h3>
        <form onSubmit={e => onSubmit(e)}>
        <Input type="email" placeholder="E-Posta" name="Email" error={errors.Email} value={Email} onChange={e => onChange(e)} />
        <Input
          type="password"
          placeholder="Parola"
          name="Password"
          error={errors.Password}
          value={Password}
          onChange={e => onChange(e)}
          minLength="3"
        />
        {errors.Hata && <div className="alert alert-danger">{errors.Hata}</div>}
        <button className="btn btn-primary" type="submit" disabled={pendingApiCall}>
          {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
          Giriş
        </button>
      </form>

        </div>
      </div>
      
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { userSetRedux })(Login);
