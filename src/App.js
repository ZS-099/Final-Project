import React, { useState, useEffect } from 'react';
import firebaseSetup from './firebase/init';
import { db, storage } from './firebase/init';
import Header from './components/Header';
import Feedback from './components/Feedback';
import Content from './components/Content';
import products from './products.json';
import './sass/main.scss';

const App = () => {
  const [appProducts, setAppProducts] = useState(products);
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [file, setFile] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState('');
  const [dbError, setDbError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeComponent, setActiveComponent] = useState(null);
  const [hasShippingDetails, setHasShippingDetails] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [added, setAdded] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [userName, setUserName] = useState(localStorage.getItem('user'));
  const [basketCount, setBasketCount] = useState( JSON.parse(localStorage.getItem('products')) );

  const clearInputs = () => {
    setEmail('');
    setPassword('');
    setName('');
  };

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
    setDbError('');
  };

  const handleLogin = async e => {
    e.preventDefault();
    clearErrors();
    try {
      await firebaseSetup.auth().signInWithEmailAndPassword(email, password);
      let user = firebaseSetup.auth().currentUser;

      db.collection('users')
        .doc(user.uid)
        .onSnapshot(snap => localStorage.setItem('user', snap.data().name));
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
        case 'auth/user-disabled':
        case 'auth/user-not-found':
          setEmailError(error.message);
          break;
        case 'auth/wrong-password':
          setPasswordError(error.message);
          break;
        default:
          setDbError(error.message);
      }
    }
  };

  const handleSignup = async e => {
    e.preventDefault();
    clearErrors();
    try {
      firebaseSetup
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          db.collection('users')
            .doc(userCredential.user.uid)
            .set({
              dateOfBirth: dateOfBirth,
              name: name,
              city: '',
              country: '',
              phone: '',
              streetNumber: '',
              street: '',
            })
            // .then(() => setHasShippingDetails(true))
            .then(() => {})
            .catch(e => console.log(e));
        });
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
        case 'auth/invalid-email':
          setEmailError(error.message);
          break;
        case 'auth/weak-password':
          setPasswordError(error.message);
          break;
        default:
          setDbError(error.message);
      }
    }
  };
  const handleSignout = async e => {
    e.preventDefault();
    firebaseSetup.auth().signOut();
    localStorage.clear();
    setBasketCount(JSON.parse(localStorage.getItem('products')))
    setSelectedProduct(null)
    // setCurrentTab(1, 'Products')
    // setActiveTab(1);
    // setActiveComponent('Products');
  };

  const handleFileChange = e => {
    setAdded(false);
    const storageRef = storage.ref(`${user.email}/${e.target.files[0].name}`);
    storageRef.put(e.target.files[0]).on('state_changed', snap => {
      setCheckout(true);
      setHasShippingDetails(false);
      setAdded(true);
    });
    storageRef.parent
      .list()
      .then(res => localStorage.setItem('files', res.items.length));
  };

  const getUserDetails = async () => {
    const uid = firebaseSetup.auth().currentUser.uid;
    const user = await db.collection('users').doc(uid).get();
    setUserDetails(user.data());
  };

  const handleApprovalSubmit = async e => {
    e.preventDefault();
    const uid = firebaseSetup.auth().currentUser.uid;

    db.collection('users')
      .doc(uid)
      .update({
        name,
        city,
        country,
        phone,
        streetNumber,
        street,
        postalCode,
      })
      .then(() => setHasShippingDetails(true))
      .catch(e => console.log(e));
    getUserDetails();
  };

  useEffect(() => {
    const authListener = () => {
      firebaseSetup.auth().onAuthStateChanged(user => {
        if (user) {
          getUserDetails();
          return setUser(user);
        }
        setUser(null);
      });
    };
    authListener();
    const localStorageListener = () => {
      console.log(JSON.parse(localStorage.getItem('products')));
      // setBasketCount(JSON.parse(localStorage.getItem('products')));
      setUserName(localStorage.getItem('user'));
    };
    window.addEventListener('storage', localStorageListener);
    return () => {
      window.removeEventListener('storage', localStorageListener);
    };
  }, []);

  const filterProducts = name => {
    if (!name) {
      setAppProducts(products);
    }
    const filtered = products.filter(product =>
      product.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
    );
    setAppProducts([...filtered]);
  };

  const handleDeleteProfile = () => {
    const user = firebaseSetup.auth().currentUser;
    if (user) {
      user.delete().then(() => {
        setUser(null);
        setActiveComponent('Login');
      });
    }
  };
  return (
    <div className="container">
      <Header
        filterProducts={filterProducts}
        user={user}
        handleSignout={handleSignout}
        setActiveComponent={setActiveComponent}
        userName={userName}
        basketCount={basketCount}
        setBasketCount={setBasketCount}
      />
      <Content
        setBasketCount={setBasketCount}
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
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
        dateOfBirth={dateOfBirth}
        setDateOfBirth={setDateOfBirth}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        emailError={emailError}
        passwordError={passwordError}
        user={user}
        products={appProducts}
        setSelectedProduct={setSelectedProduct}
        selectedProduct={selectedProduct}
        handleApprovalSubmit={handleApprovalSubmit}
        hasShippingDetails={hasShippingDetails}
        checkout={checkout}
        setCheckout={setCheckout}
        handleDeleteProfile={handleDeleteProfile}
        added={added}
        setAdded={setAdded}
        userDetails={userDetails}
        setPostalCode={setPostalCode}
        postalCode={postalCode}
      />
    </div>
  );
};

export default App;
