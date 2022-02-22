import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { URL_API } from '../helper/url';
import { useDispatch, useSelector } from 'react-redux';
import {
  toastError,
  toastInfo,
  toastSuccess,
} from '../redux/actions/toastActions';
import Logo from '../assets/img/logo.png';

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory()

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    var data = {
      username: email,
      password: password,
    };
    axios
      .post(`${URL_API}/users/login`, data)
      .then((res) => {
        // console.log('Res1', res.data.data)
        dispatch(toastInfo('Please wait getting user data...'));

        setTimeout(() => {
          dispatch({
            type: 'LOGIN',
            payload: {
              id: res.data.data.id,
              token: res.data.data.token,
              name: res.data.data.profile.name,
              businessName: res.data.data.profile.name,
              photo: res.data.data.profile.profilePhoto,
              address: res.data.data.profile.address,
              email: res.data.data.email,
            },
          });
          localStorage.setItem('userid', res.data.data.id);
          localStorage.setItem('token', res.data.data.token);
          window.location = '/homepage';
        }, 2000);

        // var configGetOneUser = {
        //   headers: { Authorization: `Bearer ${res.data.token}` },
        // };
        // axios
        //   .get(`${URL_API}/users`, configGetOneUser)
        //   .then((res2) => {
        //     console.log('Res2', res2)
        //     dispatch(toastSuccess('You are now logged in!'));
        //     setTimeout(() => {
        //       dispatch({
        //         type: 'LOGIN',
        //         payload: {
        //           id: res2.data.result.id,
        //           token: res.data.token,
        //           name: res2.data.result.name,
        //           businessName: res2.data.result.businessName,
        //           photo: res2.data.result.photo,
        //           address: res2.data.result.address,
        //           email: res2.data.result.email,
        //         },
        //       });
        //       localStorage.setItem('token', res.data.token);
        //     }, 2000);
        //   })
        //   .catch((err2) => {
        //     dispatch(toastError(`${err2.response.data.message}`));
        //     setIsLoading(false);
        //   });
      })
      .catch((err) => {
        dispatch(toastError(`${err.response.data.message}`));
        setIsLoading(false);
      });
  }

  if (isLoading) {
    return (
      <>
        <div className="loader"></div>
      </>
    );
  }

  return (
    <>
      <div className="port-background">
        <div className="port-main">
          <div className="port-main-header">
            <div className="port-main-header-logo">
              <img src={Logo} alt="portlogo" />
            </div>
            <div className="port-main-header-link">
              Don't have account? <Link to="/register">Signup</Link>
            </div>
          </div>
          <div className="port-text">Login</div>
          <div className="user-form">
            <Form onSubmit={handleSubmit}>
              <Form.Group size="lg" controlId="email">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  autoFocus
                  className="custom-form-port"
                  type="text"
                  value={email}
                  placeholder="e.g. Diora"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="custom-form-port"
                  type="password"
                  value={password}
                  placeholder="********"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button block size="lg" type="submit">
                Login
              </Button>
            </Form>
          </div>
          <div className="port-main-footer-login">
            <Link to="/">Cancel and back to website</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
