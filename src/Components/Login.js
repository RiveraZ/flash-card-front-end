import axios from "axios";
import React, { useState } from "react";
import PropTypes from "prop-types";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmitButton = async (e) => {
    e.preventDefault();
    const token = await loginUser({ username, password });
    setToken(token);
  };
};
