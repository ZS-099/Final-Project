import React from "react";
import Login from "./Login";
import Welcome from "./Welcome";
import About from "./About";
import Shop from "./Shop";
import Quiz from './Quiz';
import Profile from "./Profile";
import ProductList from "./products/ProductList";
const Main = ({
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  dateOfBirth,
  setDateOfBirth,
  street,
  setStreet,
  streetNumber,
  setStreetNumber,
  city,
  setCity,
  country,
  setCountry,
  phone,
  setPhone,
  file,
  handleFileChange,
  handleLogin,
  handleSignup,
  hasAccount,
  setHasAccount,
  emailError,
  passwordError,
  activeComponent,
  user,
  products,
  setSelectedProduct,
  selectedProduct,
  handleApprovalSubmit,
  handleDeleteProfile,
  hasShippingDetails,
  checkout,
  setCheckout,
  added,
  setAdded,
  userDetails,
  setPostalCode,
  postalCode,
  setBasketCount
}) => {
  const renderComponents = () => {
    switch (activeComponent) {
      case "Login":
        if (!user) {
          return (
            <Login
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              name={name}
              setName={setName}
              dateOfBirth={dateOfBirth}
              setDateOfBirth={setDateOfBirth}
              handleLogin={handleLogin}
              handleSignup={handleSignup}
              hasAccount={hasAccount}
              setHasAccount={setHasAccount}
              emailError={emailError}
              passwordError={passwordError}
            />
          );
        }
        return <Welcome 
        body={`We aim to sell reptiles ethically, please read the About us page to understand how we plan on doing this`}
        message={`Welcome To Safe Scales `} />;
      case "Products":
        return (
          <ProductList
            user={user}
            setSelectedProduct={setSelectedProduct}
            products={products}
            selectedProduct={selectedProduct}
            setBasketCount={setBasketCount}
          />
        );
      case "About":
        return <About />;
      case "Quiz":
        return <Quiz/>
      case "Shop":
        return (
          <Shop
            setPostalCode={setPostalCode}
            name={name}
            setName={setName}
            street={street}
            setStreet={setStreet}
            streetNumber={streetNumber}
            setStreetNumber={setStreetNumber}
            city={city}
            setCity={setCity}
            country={country}
            setCountry={setCountry}
            phone={phone}
            setPhone={setPhone}
            file={file}
            handleFileChange={handleFileChange}
            handleApprovalSubmit={handleApprovalSubmit}
            hasShippingDetails={hasShippingDetails}
            checkout={checkout}
            setCheckout={setCheckout}
            added={added}
            setAdded={setAdded}
            userDetails={userDetails}
            postalCode={postalCode}
            setPostalCode={setPostalCode}
            setBasketCount={setBasketCount}
            user = {user}
          />
        );
      case "Profile":
        return <Profile handleDeleteProfile={handleDeleteProfile} user={user}/>;
      default:
        return <Welcome 
        body={`We aim to sell reptiles ethically, please read the About us page to understand how we plan on doing this`}
        message={`Welcome To Safe Scales `} />;
    }
  };
  return (
    <main className="main-view">
      <div className="detail">{renderComponents()}</div>
    </main>
  );
};
export default Main;
