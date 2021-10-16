const main = async () => {
  // grab owner and random user wallet address
  const [owner, randomPerson] = await hre.ethers.getSigners();
  // will compile contract & generate artifacts files
  const emojiContractFactory = await hre.ethers.getContractFactory('EmojiPortal');
  // hardhat creates local blockckain to deploy to
  const emojiContract = await emojiContractFactory.deploy({
    // deploy contract with 0.1 eth from owner wallet
    value: hre.ethers.utils.parseEther('0.1'),
  });
  // wait until deployed then run
  await emojiContract.deployed();
  // log address of contract on blockchain
  console.log("Contract deployed to:", emojiContract.address);
  console.log("Contract deployed by:", owner.address);

  // get contract balance
  // let contractBalance = await hre.ethers.provider.getBalance(
  //   emojiContract.address
  // );
  // console.log(
  //   'Contract balance:',
  //   hre.ethers.utils.formatEther(contractBalance)
  // );

  let getContractBalance = async () => {
    let contractBalance = await hre.ethers.provider.getBalance(
      emojiContract.address
    );
    console.log(
      'Contract balance:',
      hre.ethers.utils.formatEther(contractBalance)
    );
  }
  getContractBalance()


  // grab current emoji count, post an emoji, then check the count again
  let emojiCount;
  emojiCount = await emojiContract.getTotalEmojis();
  console.log(emojiCount.toNumber());

  // test sending an emoji
  const emojiTxn = await emojiContract.emoji('emoji #1');
  await emojiTxn.wait();

  getContractBalance()

  const emojiTxn2 = await emojiContract.emoji('emoji #2');
  await emojiTxn2.wait();

  //check balance again
  getContractBalance()


  // connect address of random person calling emoji function
  // emojiTxn = await emojiContract.connect(randomPerson).emoji('another emoji');
  // await emojiTxn.wait();

  let allEmojis = await emojiContract.getAllEmojis();
  console.log(allEmojis);

  // emojiCount = await emojiContract.getTotalEmojis();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();