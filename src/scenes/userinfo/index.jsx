import React from 'react';
import { UserAuth } from 'state/AuthContext';


const Userinfo = () => {
  const {user} = UserAuth();


  return (
    <div>
        return <div><h1>Name: {user && user.email}</h1></div>
        <div>
<div><h1>Name: {user.fname}</h1></div>
    </div>
    </div>
  )
}

export default Userinfo