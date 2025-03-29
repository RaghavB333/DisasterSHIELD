require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/7787cdae4eff4959bc20c31bd668d362",
      accounts: ["3661ebfa779ffc14cbdb1b0bb5e079732b1787698384fdaa6051e683de0f00d0"]
    }
  }
};
