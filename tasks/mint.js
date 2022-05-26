const { task } = require("hardhat/config");

task("mint").setAction(async (args, {}, runSuper) => {
  const { ethers } = require("hardhat");

  const [owner] = await ethers.getSigners();

  async function getSig(sender, category) {
    console.log('sender:', sender);
    console.log('category:', category);
    let payload = ethers.utils.solidityPack(
      ["address", "uint256"],
      [sender, category]
    );

    let payloadHash = ethers.utils.keccak256(payload);

    return await owner.signMessage(ethers.utils.arrayify(payloadHash));
  }


  const nft = new ethers.Contract(
    "0xFD43D1dA000558473822302e1d44D81dA2e4cC0d",
    [
      "function mint(uint256 _category, bytes memory _data, bytes memory _signature)",
    ],
    owner
  );

  for (let index = 1; index <= 9; index++) {
    const sig =  await getSig(owner.address, index);
    console.log('sig:', sig);
    await nft.mint(index, "0x1b", sig);
  }
});
