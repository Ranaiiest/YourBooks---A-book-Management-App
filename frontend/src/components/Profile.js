import React, { useRef, useState, useEffect } from 'react';
import axios from '../api/api';
import Avatar from '@mui/material/Avatar';

const defaultProfileImg = 'https://cdn-icons-png.flaticon.com/512/1077/1077012.png'; // Replace with local asset if preferred

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [profileImg, setProfileImg] = useState(defaultProfileImg);
  const fileInputRef = useRef();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/auth/user');
        setUser({ name: res.data.name, email: res.data.email });
      } catch (err) {
        console.error('Failed to fetch profile info');
      }
    };
    fetchUser();
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfileImg(ev.target.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', margin: "44px auto", maxWidth: 370,
      background: "var(--card-bg)", padding: "32px", borderRadius: "20px", boxShadow: "0 4px 14px rgb(0 0 0 / 0.05)"
    }}>
      <h2 style={{ fontSize: "2.5rem", textAlign: "center", fontWeight: 700, letterSpacing: ".5px", marginBottom: 20 }}>Profile</h2>
      <Avatar
        src={profileImg}
        alt="Profile"
        sx={{ width: 100, height: 100, mb: 2, border: '2px solid var(--primary-color)', cursor: 'pointer' }}
        onClick={() => fileInputRef.current.click()}
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <p style={{ textAlign: "center", marginTop: "10px" }}><strong>Name:</strong> {user.name || 'N/A'}</p>
      <p style={{ textAlign: "center" }}><strong>Email:</strong> {user.email || 'N/A'}</p>
      <p style={{ fontSize: "0.97rem", color: "#999", textAlign: "center" }}>Click the avatar to upload your profile photo.</p>
    </div>
  );
};

export default Profile;
