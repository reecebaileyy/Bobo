// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "erc721a/contracts/ERC721A.sol";
import "erc721a/contracts/interfaces/IERC721ABurnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "erc721a/contracts/extensions/ERC721AQueryable.sol";

contract Lock is
    Ownable,
    ERC721A,
    ERC721AQueryable,
    IERC721ABurnable,
    PaymentSplitter,
    ReentrancyGuard
{
    using Strings for uint256;

    // Deployer Address
    address private _owner;
    // The next token ID to be minted.
    uint256 private _currentIndex = 1;
    // The number of tokens burned.
    uint256 public _burnCounter;
    // Token name
    string public _name;
    // Revealed
    bool public revealed = true;
    // Token symbol
    string private _symbol;
    // Cost
    uint256 public cost = 0.008 ether;
    // Base URI
    string public baseURI = "http://localhost:3000/";
    // Total Number of ScreenAgers
    uint256 public _maxSupply = 4444;
    // Sale active or not
    bool public isSaleActive = true;

    constructor()
        payable
        ERC721A("Test", "Test")
        PaymentSplitter(_team, _teamShares)
    {
        _owner = msg.sender;
        _currentIndex = _startTokenId();
    }

    /*---------- ----------- ---------- Events & Mappings ---------- ----------- ----------*/
    event TokenRenamed(uint256 indexed tokenId, string newName);
    mapping(uint256 => string) private _tokenNames;

    /*---------- ----------- ---------- Public Functions ---------- ----------- ----------*/

    /** 
    @notice
    Mint Function
  */
    function _mint(uint256 count) external payable nonReentrant {
        require(isSaleActive, "Sale is not active");
        uint256 userBalance = balanceOf(msg.sender);

        if (userBalance < 1) {
            // Allow the user to mint one NFT for free
            _safeMint(msg.sender, 1);
            count -= 1;
        }

        if (count > 0) {
            require(msg.value >= cost * count, "Insufficient Payment");
            for (uint256 i = 0; i < count; i++) {
                _safeMint(msg.sender, 1);
            }
        }
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override(ERC721A, IERC721A) returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return
            string(
                abi.encodePacked(
                    baseURI,
                    "metadata/",
                    tokenId.toString(),
                    ".json"
                )
            );
    }

    function owner() public view virtual override returns (address) {
        return _owner;
    }

    /*---------- ----------- ---------- Deployer Functions ---------- ----------- ----------*/

    function _teamMint() external onlyOwner {
        _safeMint(msg.sender, 1);
    }

    function _reveal() public onlyOwner {
        revealed = !revealed;
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
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    // Team Address For Payout
    uint256[] private _teamShares = [50, 50];
    address[] private _team = [
        0x0529ed359EE75799Fd95b7BC8bDC8511AC1C0A0F, //REPLACE
        0x57b18277B530Fa0C1748C29F9b1887B7691FF701 //REPLACE
    ];
}
