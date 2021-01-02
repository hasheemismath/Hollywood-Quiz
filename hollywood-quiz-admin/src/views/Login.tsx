import React from 'react';
import { useState } from 'react';
import ApiService from 'services/ApiService';
import Button from '../components/Button';
import { toast } from 'react-toastify';

const Login = (props) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isWorking, setIsWorking] = useState(false);

    const apiService = ApiService();

    function tryLogin() {
        if (!username || !password) {
            toast("Required username and password!")
            return;
        }

        setIsWorking(true);
        apiService.authenticate(username, password, (data) => {
            setIsWorking(false);
            if (!data) {
                toast("Wrong username or password");
            } else {
                props.history.push("/admin/dashboard");
            }
        }, (err) => {
            toast("Error! try again");
            setIsWorking(false);
        });
    }

    return (
        <div className="container-fluid login-wrapper">
            <div className="row login-row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="header text-center">
                            <h4 className="title">Hollywood Quiz - <strong>Login</strong></h4>
                            <p className="category"></p>
                        </div>
                        <div className="content">
                            <div>
                                <div className="form-group">
                                    <label className="control-label">Username</label>
                                    <input
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Enter username" type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Password</label>
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password" type="password" className="form-control" />
                                </div>
                            </div>
                            <div className="footer text-right">
                                <div className="legend">
                                    <Button
                                        onClick={tryLogin}
                                        className="btn-fill btn-wd btn btn-black"
                                        text="Login"
                                        isWorking={isWorking}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;