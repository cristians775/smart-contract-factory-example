// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract GameItem is ERC1155, Ownable {
  address private _owner;
  uint256 private _tokenId;
  uint256 private _amount;

  constructor(
    address owner,
    uint256 tokenId,
    uint256 amount
  )
    ERC1155(
      "https://bafybeiehwiqzcumfuuxp3jiihyioxbc42cdqcbct6op24obnm2cr6abk2a.ipfs.dweb.link/{id}.json"
    )
  {
    _owner = owner;
    _tokenId = tokenId;
    _amount = amount;
    _mint(owner, _tokenId, _amount, "");
  }

  function setURI(string memory newuri) public onlyOwner {
    _setURI(newuri);
  }

  function mintBatch(
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  ) public onlyOwner {
    _mintBatch(to, ids, amounts, data);
  }
}
