import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Token({ token, initialMetadata }) {
  const [metadata, setMetadata] = useState(initialMetadata);
  const [imageUrl, setImageUrl] = useState(null);
  const [newName, setNewName] = useState('');
  
  useEffect(() => {
    console.log('First useEffect hook called with token:', token);
    async function fetchMetadata() {
      console.log('Fetching metadata for token', token);
      try {
        const res = await fetch(`/api/getMetadata?token=${token}`);
        console.log('Response:', res);
        if (res.ok) {
          const data = await res.json();
          console.log('Metadata:', data);
          setMetadata(data);
          console.log('Metadata state:', metadata);
        } else {
          console.error(`Failed to fetch metadata for token ${token}: ${res.statusText}`);
          console.log('Error response:', await res.json());
        }
      } catch (error) {
        console.error(`Failed to fetch metadata for token ${token}: ${error.message}`);
      }
    }
    
  
    if (token) {
      fetchMetadata();
    }
  }, [token]);

  useEffect(() => {
    // console.log('Metadata:', metadata);
  console.log('Image URL:', imageUrl);
    if (metadata) {
      console.log('Metadata:', metadata);
      if (metadata && metadata.image) {
        setImageUrl(metadata.image);
      }
    }
  }, [metadata]);

  console.log('Image:', imageUrl)
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const updateMetadataName = async () => {
    try {
      const res = await fetch('/api/updateMetadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, name: newName }),
      });
      if (res.ok) {
        setMetadata({ ...metadata, name: newName });
        alert('Metadata updated successfully');
      } else {
        const errorData = await res.json();
        alert(`Error updating metadata: ${errorData.message}`);
      }
    } catch (error) {
      alert(`Error updating metadata: ${error.message}`);
    }
  };

  if (!metadata || !imageUrl) {
    return (
      <div className="flex flex-col items-center font-pressStart text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center font-pressStart text-center">
      <Link
        href={`https://opensea.io/assets/ethereum/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/${token}`}
        target="_blank"
        key={token}
      >
        <div>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={`Bobo NFT #${token}`}
              width={200}
              height={200}
            />
          )}
          Bobo #{parseInt(token, 10)}
        </div>
      </Link>
      <input
        type="text"
        value={newName}
        onChange={handleNameChange}
        placeholder="name"
        className="my-2 w-3/4 text-center rounded-lg" 
      />
      <button onClick={updateMetadataName} className="bg-black text-white py-1 px-2 rounded-lg">
        Update Name
      </button>
    </div>
  );
}

export default Token;
