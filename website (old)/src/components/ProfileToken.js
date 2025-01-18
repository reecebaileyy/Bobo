import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';


function Token({ tokenId }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [newName, setNewName] = useState('');
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    async function fetchMetadata() {
      try {
        const response = await fetch(`/api/tokens/getMetadata?tokenId=${tokenId.toString()}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to fetch tokens: ${errorData.error}`);
        }
        const responseData = await response.json();
        const metadata = responseData;
        setMetadata(metadata);
        setImageUrl("https://www.bobovision.vercel.app/images/" + tokenId.toString() + ".gif");
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchMetadata();
  }, [tokenId]);


  const router = useRouter();

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNameUpdate = async () => {
    try {
      const response = await fetch(`/api/tokens/${tokenId}/update-name`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newName }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update name: ${errorData.error}`);
      }
  
      // Show success message
      alert("your new name has been updated");
  
      // Refresh the page after updating the name
      router.replace(router.asPath);
    } catch (error) {
      console.error(error.message);
  
      // Show error message
      alert("oops Bobo is rugging.. that one more time");
    }
  };
  

  return (
    <div className="flex flex-col items-center font-pressStart text-center">
      <Link
        href={`https://opensea.io/assets/ethereum/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/5`}
        target="_blank"

      >
        <div>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={`Bobo NFT #4`}
              width={200}
              height={200}
            />
          )}
          {metadata && <div className="my-2">{metadata.name}</div>}
        </div>
      </Link>
      <input
        type="text"
        value={newName}
        onChange={handleNameChange}
        placeholder="name"
        className="my-2 w-3/4 text-center rounded-lg"
      />
      <button
        onClick={handleNameUpdate}
        className="bg-black text-white py-1 px-2 rounded-lg"
      >
        Update Name
      </button>
    </div>
  );
}

export default Token;