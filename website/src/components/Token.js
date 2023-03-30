import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Token({ tokenId }) {
  const [metadata, setMetadata] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    async function fetchMetadata() {
      const res = await fetch(`http://localhost:3000/metadata/${tokenId}.json`);
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

  if (!imageUrl) return null;

  return (
    <Link
      href={`https://opensea.io/assets/ethereum/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/${tokenId}`}
      target="_blank"
      key={tokenId}
    >
      <div className="flex flex-col items-center font-pressStart">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={`Bobo NFT #${tokenId}`}
            width={200}
            height={200}
          />
        )}
        Bobo #{tokenId.toNumber()}
      </div>
    </Link>
  );
}

export default Token;
