import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Token({ tokenId }) {
  const [metadata, setMetadata] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    async function fetchMetadata() {
      const res = await fetch(`/api/getMetadata?token=${tokenId}`);
      const data = await res.json();
      setMetadata(data);
    }

    if (tokenId) {
      fetchMetadata();
    }
  }, [tokenId]);

  useEffect(() => {
    if (metadata) {
      setImageUrl(metadata.image);
    }
  }, [metadata]);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const updateMetadataName = async () => {
    const token = tokenId.toString()
    console.log(token, newName)
    try {
      const res = await fetch('/api/updateMetadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newName }),
      });
      const data = await res.json();

      if (res.ok) {
        console.log(data.message);
        setMetadata({ ...metadata, name: newName });
      } else {
        const error = await res.json();
        console.error(error.message);
      }
    } catch (error) {
      console.log(token)
      console.error('Failed to update metadata name:', error);
    }
  };
  


  if (!imageUrl) return null;

  return (
    <div className="flex flex-col items-center font-pressStart text-center">
      <Link
        href={`https://opensea.io/assets/ethereum/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/${tokenId}`}
        target="_blank"
        key={tokenId}
      >
        <div>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={`Bobo NFT #${tokenId}`}
              width={200}
              height={200}
            />
          )}
          Bobo #{parseInt(tokenId, 10)}
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
