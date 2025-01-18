import React, { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TokenProps {
  tokenId: number;
}

interface Metadata {
  name: string;
  image: string; // Include the image URL in metadata if needed
}

const ProfileToken: React.FC<TokenProps> = ({ tokenId }) => {
  console.log(`ProfileToken component rendered for tokenId: ${tokenId}`);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [newName, setNewName] = useState<string>("");
  const [metadata, setMetadata] = useState<Metadata | null>(null);

  const router = useRouter();

  useEffect(() => {
    console.log(`Fetching metadata for token ${tokenId}`);
    const fetchMetadata = async () => {
      try {
        const response = await fetch(`/api/tokens/getMetadata?tokenId=${tokenId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to fetch tokens: ${errorData.error}`);
        }
        const responseData: Metadata = await response.json();
        console.log(`Metadata for token ${tokenId}:`, responseData); // Log the metadata
        setMetadata(responseData);
  
        setImageUrl(responseData.image || `/images/${tokenId}.gif`);
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

      alert("Your new name has been updated");
      router.refresh();
    } catch (error) {
      console.error(error);
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

export default ProfileToken;
