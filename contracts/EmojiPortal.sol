// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract EmojiPortal {
    uint256 totalEmojis;

    constructor() {
        console.log('issa smart contract');
    }

    function emoji() public {
        totalEmojis += 1;
        console.log('%s has sent emoji number: %s', msg.sender, totalEmojis);
    }

    function getTotalEmojis() public view returns (uint256) {
        console.log('We have had %d total emojis', totalEmojis);
        return totalEmojis;
    }
}

