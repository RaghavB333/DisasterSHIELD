const hre = require("hardhat");

async function main() {
    const DonationContract = await hre.ethers.getContractFactory("DonationContract");
    const donation = await DonationContract.deploy();

    try {
        await donation.waitForDeployment();
        console.log("Contract deployed to:", donation.target);
    } catch (deploymentError) {
        console.error("Deployment failed:", deploymentError);
        process.exit(1);
    }
}

main().catch((error) => {
    console.error("Main function error:", error);
    process.exitCode = 1;
});