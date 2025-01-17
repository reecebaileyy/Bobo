import React, { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TokenProps {
  tokenId: number; // Specify that tokenId is a number
}

interface Metadata {
  name: string;
  [key: string]: any; // In case the metadata object has additional properties
}

const Token: React.FC<TokenProps> = ({ tokenId }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [newName, setNewName] = useState<string>("");
  const [metadata, setMetadata] = useState<Metadata | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch(`/api/tokens/getMetadata?tokenId=${tokenId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to fetch tokens: ${errorData.error}`);
        }
        const responseData: Metadata = await response.json();
        setMetadata(responseData);
        setImageUrl(`localhost:3000/images/${tokenId}.gif`);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMetadata();
  }, [tokenId]);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleNameUpdate = async () => {
    try {
      const response = await fetch(`/api/tokens/${tokenId}/update-name`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update name: ${errorData.error}`);
      }

      // Show success message
      alert("Your new name has been updated");

      // Refresh the page after updating the name
      router.replace(router.asPath);
    } catch (error: any) {
      console.error(error);

      // Show error message
      alert("Oops! Bobo is rugging... try one more time.");
    }
  };

  return (
    <div className="flex flex-col items-center font-pressStart text-center">
      <Link
        href={`https://opensea.io/assets/ethereum/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/${tokenId}`}
        target="_blank"
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
          {metadata && <div className="my-2">{metadata.name}</div>}
        </div>
      </Link>
      <input
        type="text"
        value={newName}
        onChange={handleNameChange}
        placeholder="Name"
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
};

export default Token;
