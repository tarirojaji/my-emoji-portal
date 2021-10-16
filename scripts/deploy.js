const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
  
    console.log('Deploying contracts with account: ', deployer.address);
    console.log('Account balance: ', accountBalance.toString());
  
    const emojiContractFactory = await hre.ethers.getContractFactory('EmojiPortal');
    // depoloy contract and fund with some eth
    const emojiContract = await emojiContractFactory.deploy({
      value: hre.ethers.utils.parseEther('0.001'),
    });

    //  wait for deploy
    const portal = await emojiContract.deployed();
  
    console.log('EmojiPortal address: ', portal.address);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  runMain();