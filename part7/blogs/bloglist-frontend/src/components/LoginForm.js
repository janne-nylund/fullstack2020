import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div className="container">
      <h2>Login</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <input
            id='username'
            value={username}
            onChange={handleUsernameChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password:</Form.Label>
          <input
            id='password'
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>
        <Form.Group>
          <Button id="login-button" type="submit">login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm