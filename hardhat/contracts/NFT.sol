// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {
    ERC721ACQueryable, ERC721A, IERC721A
} from "../external/misc/ERC721ACQueryable.sol";
import {SafeTransferLib} from "external/solady/src/utils/SafeTransferLib.sol";
import {ERC2981} from "external/solady/src/tokens/ERC2981.sol";
import {Ownable} from "solady/src/auth/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFT is ERC721ACQueryable, Ownable, ERC2981 {
    using Strings for uint256;

    uint256 public cost = 0.0069 ether;
    string public baseURI = "https://www.WEBSITE.xyz/api/tokens/"; // Maybe Make Private
    uint256 public maxSupply = 999;
    bool public isSaleActive = true;


    constructor(
        string memory _name, 
        string memory _symbol, 
        address _owner
    ) ERC721ACQueryable(_name, _symbol) {
        _initializeOwner(_owner);
        _setDefaultRoyalty(_owner, 500);
    }


    // Override supportsInterface to include IERC2981
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721ACQueryable, ERC2981)
        returns (bool)
    {
        return ERC721ACQueryable.supportsInterface(interfaceId) || ERC2981.supportsInterface(interfaceId);
    }

    // --- Public Mint Function ---
    ///@dev Mints NFTs to the sender address (one free per wallet)
    function mint(uint256 count) external payable {
        require(isSaleActive, "Sale is not active");
        require(totalSupply() + count <= maxSupply, "lol too slow, minted out");
        require(count > 0, "At least one token bruh...");

        // Use auxiliary storage to track if an address has minted before.
        // _getAux returns a uint64 value stored per address.
        if (_getAux(msg.sender) == 0) {
            // First NFT is free: charge for (count - 1)
            require(msg.value >= cost * (count - 1), "Insufficient Payment");
            _setAux(msg.sender, 1);
        } else {
            require(msg.value >= cost * count, "Insufficient Payment");
        }
        _safeMint(msg.sender, count);
    }

    // --- Internal Functions ---
    ///@dev Returns the base URI for the token metadata
    function _baseURI() internal view override(ERC721A) returns (string memory) {
        return baseURI;
    }

    // Override _startTokenId to begin token IDs at 1
    function _startTokenId() internal view virtual override returns (uint256) {
        return 1;
    }

    ///  @dev Throws if the sender is not the owner.
    function _requireCallerIsContractOwner() internal view virtual override {
        _checkOwner();
    }

    // --- Owner-only Functions ---
    ///@dev Mints 1 NFT to the team
    function teamMint() external onlyOwner {
        _safeMint(msg.sender, 1);
    }

    ///@dev flips the sale state
    function flipSale() external onlyOwner {
        isSaleActive = !isSaleActive;
    }

    /// @dev Sets Base URI for metadata.
    function setBaseURI(string memory uri) external onlyOwner {
        baseURI = uri;
    }

    /// @dev Sets the default royalty `receiver` and `feeNumerator`.
    function setDefaultRoyalty(address receiver, uint96 feeNumerator) external onlyOwner {
        _setDefaultRoyalty(receiver, feeNumerator);
    }

    ///@dev Withdraws all ETH from the contract to the owner
    function withdrawETH(address to) external onlyOwner {
        SafeTransferLib.safeTransferAllETH(to);
    }
}
