import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TokenProps {
  tokenId: number; // tokenId is a required number prop
}

interface Metadata {
  name: string;
  image: string;
  [key: string]: any; // Allow additional properties in the metadata object
}

const Token: React.FC<TokenProps> = ({ tokenId }) => {
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch(
          `/api/tokens/getMetadata?tokenId=${tokenId}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to fetch tokens: ${errorData.error}`);
        }
        const responseData: Metadata = await response.json();
        setMetadata(responseData);
        setImageUrl(
          `https://localhost:3000/images/${tokenId.toString()}.gif`
        );
      } catch (error: any) {
        console.error(error.message);
      }
    };

    fetchMetadata();
  }, [tokenId]);

  useEffect(() => {
    if (metadata?.image) {
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
};

export default Token;
