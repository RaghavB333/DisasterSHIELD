import { ethers } from "ethers";

const contractAddress = "3661ebfa779ffc14cbdb1b0bb5e079732b1787698384fdaa6051e683de0f00d0";  // Replace with actual deployed address
const abi = [
    "function sendDonation(address _receiver) public payable",
    "function getAllDonations() public view returns (tuple(address sender, address receiver, uint256 amount, uint256 timestamp)[])"
];

export async function donate(receiverAddress, amount) {
    if (!window.ethereum) {
        alert("MetaMask is required!");
        return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const transaction = await contract.sendDonation(receiverAddress, { value: ethers.parseEther(amount) });

    alert("Transaction sent! Waiting for confirmation...");
    await transaction.wait();
    alert("Donation Successful ✅");
}

export async function getDonations() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    
    return await contract.getAllDonations();
}
