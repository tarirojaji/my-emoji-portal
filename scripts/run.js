const main = async () => {
  // grab owner and random user wallet address
  const [owner, randomPerson] = await hre.ethers.getSigners();
  // will compile contract & generate artifacts files
  const emojiContractFactory = await hre.ethers.getContractFactory('EmojiPortal');
  // hardhat creates local blockckain to deploy to
  const emojiContract = await emojiContractFactory.deploy();
  // wait until deployed then run
  await emojiContract.deployed();

  // log address of contract on blockchain
  console.log("Contract deployed to:", emojiContract.address);
  console.log("Contract deployed by:", owner.address);

  // grab current emoji count, post an emoji, then check the count again
  let emojiCount;
  emojiCount = await emojiContract.getTotalEmojis();

  let emojiTxn = await emojiContract.emoji();
  await emojiTxn.wait();

  emojiCount = await emojiContract.getTotalEmojis();

  // connect address of random person calling emoji function
  emojiTxn = await emojiContract.connect(randomPerson).emoji();
  await emojiTxn.wait();

  emojiCount = await emojiContract.getTotalEmojis();
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