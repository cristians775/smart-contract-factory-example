// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import "./GameItem.sol";

contract GameItemFactory {
  mapping(address => GameItem[]) _ownerAddresses;
  event GameItemCreated(GameItem gameItem);

  address private _owner;

  constructor() {
    _owner = msg.sender;
  }

  function createNftCollection(
    address owner,
    uint256 tokenId,
    uint256 amount
  ) external {
    GameItem gameItem = new GameItem(owner, tokenId, amount);

    _ownerAddresses[owner].push(gameItem);
    emit GameItemCreated(gameItem);
  }

  function getCollectionByOwnerAddress(address owner)
    external
    view
    returns (GameItem[] memory)
  {
    return _ownerAddresses[owner];
  }
}
