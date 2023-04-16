import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Token({ tokenId }) {
  const [metadata, setMetadata] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

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
        setImageUrl("https://www.bobovision.xyz/images/" + tokenId.toString() + ".gif");
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchMetadata();
  }, [tokenId]);

  const router = useRouter();

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
        {metadata && <div className="my-2">{metadata.name}</div>}
      </div>
    </Link>
  );
}

export default Token;