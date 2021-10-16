// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract EmojiPortal {
    uint256 totalEmojis;

    // seed for generating a random number for prizes
    uint256 private seed;

    event NewEmoji(address indexed from, uint256 timestamp, string message);

    // A struct is basically a custom datatype where we can customize what we want to hold inside it.
    struct Emoji {
        address emojer; // The address of the user who waved.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user waved.
    }

    Emoji[] emojis;

    // This is an address => uint mapping, meaning I can associate an address with a number!
    // Storing the address with the last time the user sent emoji.
    mapping(address => uint256) public lastEmojiAt;

    constructor() payable {
        console.log('A payable constructor');
    }

    // emoji function requires a string called _message. This is the message our user
    // sends us from the frontend!

    function emoji(string memory _message) public {

        // make sure the current timestamp is at least 15-minutes bigger than the last timestamp stored
        // if current address => uint + 15min is less than current timestamp the wait 15min
        require(
            // lastEmojiAt[msg.sender] + 15 minutes < block.timestamp,
            // "Wait 15m"
            lastEmojiAt[msg.sender] + 30 seconds < block.timestamp,
            "Wait 30sec"
        );

        // Update the current timestamp we have for the user
        lastEmojiAt[msg.sender] = block.timestamp;

        // update total emojis
        totalEmojis += 1;
        console.log('%s has sent this emoji: %s', msg.sender, _message);

        // store the emoji data
        emojis.push(Emoji(msg.sender, _message, block.timestamp));

        // Generate a Psuedo random number between 0 and 100
        uint256 randomNumber = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated: %s", randomNumber);

        // Set the generated, random number as the seed for the next wave
        seed = randomNumber;

        // Give a 50% chance that the user wins the prize.
        if (randomNumber < 50) {
            console.log("%s won!", msg.sender);

            // set price amount and check if contract balance is enough to fund prize
            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}(""); //send prize
            require(success, "Failed to withdraw money from contract."); //check if txn was successful
        }

        emit NewEmoji(msg.sender, block.timestamp, _message);
    }


    function getAllEmojis() public view returns (Emoji[] memory) {
        return emojis;
    }

    function getTotalEmojis() public view returns (uint256) {
        console.log('We have had %d total emojis', totalEmojis);
        return totalEmojis;
    }
}

