import React, { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

export default function Results({ element, artwork: initialArtwork, resetQuiz }) {
  const { name } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!initialArtwork);
  const [artwork, setArtwork] = useState(initialArtwork);
  const [error, setError] = useState(false);

  async function fetchArtworkAgain() {
    setLoading(true);
    setError(false);
    try {
      const keyword = element && element.toLowerCase();
      const res = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${keyword}`
      );
      const data = await res.json();
      if (data.objectIDs && data.objectIDs.length > 0) {
        const artRes = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${data.objectIDs[0]}`
        );
        const artData = await artRes.json();
        setArtwork(artData);
      } else {
        setArtwork(null);
      }
    } catch (e) {
      setError(true);
      setArtwork(null);
    }
    setLoading(false);
  }

  React.useEffect(() => {
    if (!artwork && element) {
      fetchArtworkAgain();
    }
    // eslint-disable-next-line
  }, [element]);

  function handleGoBack() {
    resetQuiz();
    navigate("/");
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 32, minWidth: 320, maxWidth: 400, textAlign: 'center' }}>
        <p style={{ fontSize: 20, marginBottom: 24 }}>
          <strong>{name}</strong>, your element is: <span style={{ color: '#0074D9' }}>{element}</span>
        </p>
        {loading ? (
          <p style={{ color: '#888', marginBottom: 24 }}>Can't wait... (loading artwork)</p>
        ) : error ? (
          <>
            <p style={{ color: 'red', marginBottom: 24 }}>Failed to load artwork. Please try again.</p>
            <button onClick={fetchArtworkAgain} style={{ background: '#0074D9', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: 6, fontSize: 16, cursor: 'pointer', marginTop: 10 }}>Refresh</button>
          </>
        ) : artwork ? (
          <div className="artwork" style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 22, margin: '10px 0' }}>{artwork.title}</h2>
            <img src={artwork.primaryImage} alt={artwork.title} style={{ maxWidth: '80%', borderRadius: 10, margin: '10px 0' }} />
            <p style={{ fontStyle: 'italic', color: '#555' }}>{artwork.artistDisplayName}</p>
            <p style={{ color: '#888' }}>{artwork.objectDate}</p>
            <button onClick={fetchArtworkAgain} style={{ background: '#0074D9', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: 6, fontSize: 16, cursor: 'pointer', marginTop: 10 }}>Refresh</button>
          </div>
        ) : (
          <>
            <p style={{ color: '#888', marginBottom: 24 }}>No artwork found.</p>
            <button onClick={fetchArtworkAgain} style={{ background: '#0074D9', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: 6, fontSize: 16, cursor: 'pointer', marginTop: 10 }}>Refresh</button>
          </>
        )}
        <button onClick={handleGoBack}
          style={{ background: '#0074D9', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: 6, fontSize: 16, cursor: 'pointer', marginTop: 10 }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
