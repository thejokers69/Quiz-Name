import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

export default function Results({ element, artwork }) {
  const { name } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 32, minWidth: 320, maxWidth: 400, textAlign: 'center' }}>
        <p style={{ fontSize: 20, marginBottom: 24 }}>
          <strong>{name}</strong>, your element is: <span style={{ color: '#0074D9' }}>{element}</span>
        </p>
        {artwork ? (
          <div className="artwork" style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 22, margin: '10px 0' }}>{artwork.title}</h2>
            <img src={artwork.primaryImage} alt={artwork.title} style={{ maxWidth: '80%', borderRadius: 10, margin: '10px 0' }} />
            <p style={{ fontStyle: 'italic', color: '#555' }}>{artwork.artistDisplayName}</p>
            <p style={{ color: '#888' }}>{artwork.objectDate}</p>
          </div>
        ) : (
          <p style={{ color: '#888', marginBottom: 24 }}>No artwork found.</p>
        )}
        <button onClick={() => navigate("/")}
          style={{ background: '#0074D9', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: 6, fontSize: 16, cursor: 'pointer', marginTop: 10 }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
