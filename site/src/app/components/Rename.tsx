// Rename.tsx
import React, { useState, ChangeEvent } from "react";

interface RenameProps {
  tokenId: number;
}

const Rename: React.FC<RenameProps> = ({ tokenId }) => {
  const [newName, setNewName] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/tokens/${tokenId}/update-name`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newName }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        console.error("Failed to update name");
      }
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        value={newName}
        onChange={handleNameChange}
        placeholder="Enter new name"
        className="text-center border rounded mb-2 p-1"
      />
      <button
        onClick={handleUpdate}
        className="bg-black text-white py-1 px-2 rounded"
      >
        Update Name
      </button>
      {success && (
        <p className="text-green-500 mt-2">Name updated successfully!</p>
      )}
    </div>
  );
};

export default Rename;
