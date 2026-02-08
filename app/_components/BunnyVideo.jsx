"use client";
import React, { useEffect, useState } from "react";

const BunnyVideo = ({ libraryId, videoId, title = "Bunny Video Player" }) => {
  const [secureUrl, setSecureUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSecureUrl = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:5000/api/bunny/bunny-token?libraryId=${libraryId}&videoId=${videoId}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch secure URL: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
        setSecureUrl(data?.url);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSecureUrl();
  }, [libraryId, videoId]);

  if (loading) return <p>Loading video...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!secureUrl) return <p>Video URL not available.</p>;

  return (
    <div style={{
      position: "relative",
      paddingBottom: "56.25%",
      height: 0,
      overflow: "hidden",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      maxWidth: "900px",
      margin: "0 auto"
    }}>
      <iframe
        src={secureUrl}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        frameBorder="0"
        allowFullScreen
        allow="autoplay; encrypted-media"
        title={title}
      ></iframe>
    </div>
  );
};

export default BunnyVideo;
