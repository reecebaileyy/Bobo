// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract HelloAbstract {
    function sayHello() public pure virtual returns (string memory) {
        return "Hello, World!";
    }
}
