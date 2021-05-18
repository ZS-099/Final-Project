import React from "react";

const Login = ({
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  dateOfBirth,
  setDateOfBirth,
  handleLogin,
  handleSignup,
  hasAccount,
  setHasAccount,
  emailError,
  passwordError,
}) => {
  return (
    <div className="login">
      <form className="login__form">
        <div className="login__header">
          <h1 className="login__header-text">
            {hasAccount ? "Sign in" : "Signup"}
          </h1>
        </div>
        {!hasAccount && (
          <>
            <div className="login__group">
              <label className="login__label">Name</label>
              <input
                className="login__input"
                type="text"
                autoFocus
                required
                value={name}
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="login__group">
              <label className="login__label">Date Of Birth</label>
              <input
                className="login__input"
                required
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
          </>
        )}
        <div className="login__group">
          <label className="login__label">Email</label>
          <input
            className="login__input"
            type="email"
            placeholder="Enter Email"
            autoFocus
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="login__error"> {emailError}</p>
        </div>
        <div className="login__group">
          <label className="login__label">Password</label>
          <input
            className="login__input"
            required
            placeholder="Enter Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="login__error">{passwordError}</p>
        </div>
        <div>
          {hasAccount ? (
            <>
              <div className="login__button">
                <button className="login__btn" onClick={handleLogin}>
                  Sign In
                </button>
              </div>
              <p className="login__account">
                Dont have an account?
                <span
                  className="login__link"
                  onClick={() => setHasAccount(!hasAccount)}
                >
                  Sign Up!
                </span>
              </p>
            </>
          ) : (
            <>
              <div className="login__button">
                <button className="login__btn" onClick={handleSignup}>
                  Sign UP
                </button>
              </div>
              <p className="login__account">
                have an account?
                <span
                  className="login__link"
                  onClick={() => setHasAccount(!hasAccount)}
                >
                  Sign In!
                </span>
              </p>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
