// SPDX-License-Identifier: GPL-3.0 
pragma solidity ^0.8.9;

contract HelloWorld {
    address public owner;
    string private text;

    constructor(){
        text = "Hello World";
        owner = msg.sender ;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "This is not the owner address");
        _;
    }

    function getText () public view returns (string memory){
        return text;
    }

    function setText(string calldata _text) public {
        text = _text;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        owner = newOwner;
    }

}