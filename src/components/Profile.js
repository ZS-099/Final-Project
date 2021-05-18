import React, { useEffect, useState } from 'react';

const Profile = ({ handleDeleteProfile, user }) => {
  // const [name, setName] = useState(localStorage.getItem('user'));

  // useEffect(() => {
  //   setName(localStorage.getItem('user'));
  // }, [name]);
// console.log(user)
  return (
    <section className="profile">
      <div className="profile__container">
        <div className="profile__container--header">
          <h4 className="profile__container--header__text">Profile</h4>
        </div>
        <div>
          {user?
            <button
              onClick={handleDeleteProfile}
              className="product-detail_return-btn"
            >
              Delete my account
            </button>
            :
            <p>Please Login to see your profile</p>
          }
        </div>
      </div>
    </section>
  );
};

export default Profile;
