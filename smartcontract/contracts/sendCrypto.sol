// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC20/ERC20.sol";


contract sendCrypto {

    struct Token {
        string token;
        address contractAddress;
    }

    mapping(string => Token) public tokens;

    address public  owner ;

    constructor() {

        owner = payable(msg.sender);
    }

    /* receive() external payable {}

    function withdraw (uint _amount) external {
        require(msg.sender == owner, "Only the owner can call this method");
        payable(msg.sender).transfer(_amount);
    }
    

    function getBalance() external view returns (uint) {
        return address(this).balance;
    }
    
    */


    function getTokenAddress(string memory token) external view returns(address memory) {
       return tokens[token].contractAddress;
    }

     function transfer(address to, uint256 amount) external returns (bool) {
        require(msg.sender == owner, "Only the owner can withdraw funds");
        balanceOf[msg.sender] -= amount;
        balanceOf[recepient] += amount;
        emit Transfer(msg.sender, recepient, amount);
        return true;
     }
       
}
