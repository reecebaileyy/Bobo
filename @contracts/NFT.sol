// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../node_modules/erc721a/contracts/ERC721A.sol";
import "../node_modules/erc721a/contracts/interfaces/IERC721ABurnable.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../node_modules/@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";
import "../node_modules/erc721a/contracts/extensions/ERC721AQueryable.sol";
import "../node_modules/hardhat/console.sol";


contract Boogers is
    Ownable,
    ERC721A,
    ERC721AQueryable,
    IERC721ABurnable,
    PaymentSplitter,
    ReentrancyGuard
{
    using Strings for uint256;

    address private _owner;
    uint256 private _currentIndex = 1;
    uint256 public _burnCounter;
    string public _name;
    string private _symbol;
    uint256 public cost = 1 ether;
    string public baseURI = "https://www.bobovision.xyz/api/tokens/";
    uint256 public _maxSupply = 4444;
    bool public isSaleActive = true;

    constructor()
        payable
        ERC721A("Boogers", "BOOG")
        PaymentSplitter(_team, _teamShares)
    {
        _owner = msg.sender;
        _currentIndex = _startTokenId();
    }

    /*---------- ----------- ---------- Events & Mappings ---------- ----------- ----------*/

    /*---------- ----------- ---------- Public Functions ---------- ----------- ----------*/

    /** 
    @notice
    Mint Function
  */
    function _mint(uint256 count) external payable nonReentrant {
        require(isSaleActive, "Sale is not active");
        uint256 userBalance = balanceOf(msg.sender);
        require(totalSupply() + count <= _maxSupply, "Maximum supply reached");
        
        if (msg.sender == _owner) {
            _safeMint(msg.sender, count);
        }

        else if (userBalance < 1) {
            // Allow the user to mint one NFT for free
            require(msg.value >= (cost * count) - cost, "Insufficient Payment");
            for (uint256 i = 0; i < count; i++) {
                _safeMint(msg.sender, 1);
            }
            
        }

        else if (userBalance > 0) {
            require(msg.value >= cost * count, "Insufficient Payment");
            for (uint256 i = 0; i < count; i++) {
                _safeMint(msg.sender, 1);
            }
        }
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override(ERC721A, IERC721A) returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return string(abi.encodePacked(baseURI,tokenId.toString()));
    }

    function owner() public view virtual override returns (address) {
        return _owner;
    }

    /*---------- ----------- ---------- Deployer Functions ---------- ----------- ----------*/

    function _teamMint() external onlyOwner {
        _safeMint(msg.sender, 1);
    }

    function _startTokenId() internal view virtual override returns (uint256) {
        return 1;
    }

    function tokensOfOwner(
        address user
    ) external view virtual override returns (uint256[] memory) {
        unchecked {
            uint256 tokenIdsIdx;
            address currOwnershipAddr;
            uint256 tokenIdsLength = balanceOf(user);
            uint256[] memory tokenIds = new uint256[](tokenIdsLength);
            TokenOwnership memory ownership;
            for (
                uint256 i = _startTokenId();
                tokenIdsIdx != tokenIdsLength;
                ++i
            ) {
                ownership = _ownershipAt(i);
                if (ownership.burned) {
                    continue;
                }
                if (ownership.addr != address(0)) {
                    currOwnershipAddr = ownership.addr;
                }
                if (currOwnershipAddr == user) {
                    tokenIds[tokenIdsIdx++] = i;
                }
            }
            return tokenIds;
        }
    }

    function _flipSale() external onlyOwner {
        isSaleActive = !isSaleActive;
    }

    function setSupply(uint256 supply_) public onlyOwner {
        _maxSupply = supply_;
    }

    function setCost(uint256 cost_) public onlyOwner {
        cost = cost_;
    }

    function setBaseURI(string memory uri) public onlyOwner {
        baseURI = uri;
    }

    function burn(uint256 tokenId) external virtual override onlyOwner {
        _burn(tokenId, true);
    }

    /*---------- ----------- ---------- Internal Functions ---------- ----------- ----------*/

    // Team Address For Payout
    uint256[] private _teamShares = [50, 50];
    address[] private _team = [
        0x0529ed359EE75799Fd95b7BC8bDC8511AC1C0A0F, //REPLACE
        0x57b18277B530Fa0C1748C29F9b1887B7691FF701 //REPLACE
    ];
}
