// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract DonationContract {
    address public owner;
    uint256 public totalDonations;

    struct Donation {
        address donor;
        uint256 amount;
        uint256 timestamp;
    }

    Donation[] public donations;

    event DonationReceived(address indexed donor, uint256 amount, uint256 timestamp);
    event FundsWithdrawn(address indexed owner, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can withdraw");
        _;
    }

    constructor() {
        owner = msg.sender; // Set deployer as owner
    }

    function donate() external payable {
        require(msg.value > 0, "Donation must be greater than 0");

        donations.push(Donation(msg.sender, msg.value, block.timestamp));
        totalDonations += msg.value;

        emit DonationReceived(msg.sender, msg.value, block.timestamp);
    }

    function getAllDonations() external view returns (Donation[] memory) {
        return donations;
    }

    function withdrawFunds(uint256 _amount) external onlyOwner {
        require(_amount <= address(this).balance, "Insufficient balance");

        payable(owner).transfer(_amount);
        emit FundsWithdrawn(owner, _amount);
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}

