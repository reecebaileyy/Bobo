import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Token({ tokenId }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [newName, setNewName] = useState('');
  
  useEffect(() => {
    async function fetchMetadata() {
      try {
        const response = await fetch(`/api/tokens/${tokenId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to fetch tokens: ${errorData.error}`);
        }
        const data = await response.json();
        console.log("response", data)
        setImageUrl(data?.metadata?.image);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchMetadata();
  }, [tokenId]);
  
  

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
          Bobo #4
        </div>
      </Link>
      <input
        type="text"
        value={newName}
        
        placeholder="name"
        className="my-2 w-3/4 text-center rounded-lg" 
      />
      <button  className="bg-black text-white py-1 px-2 rounded-lg">
        Update Name
      </button>
    </div>
  );
}

export default Token;
