// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "creator-token-contracts/contracts/erc721c/ERC721AC.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFT is ERC721AC, Ownable {
    using Strings for uint256;

    uint256 public cost = 0.0069 ether;
    string public baseURI = "https://www.WEBSITE.xyz/api/tokens/";
    uint256 public maxSupply = 999;
    bool public isSaleActive = true;

    // Royalty parameters (for example, 5% royalty fee in basis points)
    uint256 public constant ROYALTY_BPS = 500;
    address public royaltyRecipient;

    constructor() ERC721AC("Boogers", "NFT") Ownable(msg.sender) {
        royaltyRecipient = msg.sender; // Set initial royalty recipient
    }

    // --- Required Implementation for CreatorTokenBase ---
    function _requireCallerIsContractOwner() internal view override {
        require(owner() == msg.sender, "Caller is not the contract owner");
    }

    // --- Example Royalty Validation ---
    // Override the _validateBeforeTransfer hook to add custom royalty logic.
    // Note: This is just an example. In practice, you need a mechanism to actually
    // collect fees – standard transfers don't carry Ether, so this might require a
    // custom sale function or marketplace integration.
    function _validateBeforeTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        // When transferring between users (not minting or burning)
        if (from != address(0) && to != address(0)) {
            // For example, you might want to require that a royalty fee is "sent"
            // This is only illustrative – standard transfers don't carry msg.value.
            // You could instead enforce that transfers only occur via your sale function.
            // require(msg.value >= calculateRoyaltyFee(salePrice), "Insufficient royalty fee");
        }
        // Call any parent validation if necessary (or leave empty if not)
    }

    // --- Public Mint Function ---
    function mint(uint256 count) external payable {
        require(isSaleActive, "Sale is not active");
        require(totalSupply() + count <= maxSupply, "Maximum supply reached");

        if (balanceOf(msg.sender) == 0) {
            // First NFT is free: charge for (count - 1)
            require(msg.value >= cost * (count - 1), "Insufficient Payment");
        } else {
            require(msg.value >= cost * count, "Insufficient Payment");
        }
        _safeMint(msg.sender, count);
    }

    // --- Metadata ---
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return string(abi.encodePacked(baseURI, tokenId.toString()));
    }

    // Override _startTokenId to begin token IDs at 1
    function _startTokenId() internal view virtual override returns (uint256) {
        return 1;
    }

    // --- Owner-only Functions ---
    function teamMint() external onlyOwner {
        _safeMint(msg.sender, 1);
    }

    function flipSale() external onlyOwner {
        isSaleActive = !isSaleActive;
    }

    function setSupply(uint256 supply_) external onlyOwner {
        maxSupply = supply_;
    }

    function setCost(uint256 cost_) external onlyOwner {
        cost = cost_;
    }

    function setBaseURI(string memory uri) external onlyOwner {
        baseURI = uri;
    }

    // Optional: A function to update the royalty recipient
    function setRoyaltyRecipient(address newRecipient) external onlyOwner {
        royaltyRecipient = newRecipient;
    }
    
    // Example: Calculate a royalty fee based on a given sale price.
    // Note that this is just a helper function – collecting fees on transfers requires a custom sale mechanism.
    function calculateRoyaltyFee(uint256 salePrice) public pure returns (uint256) {
        return (salePrice * ROYALTY_BPS) / 10000;
    }
}
