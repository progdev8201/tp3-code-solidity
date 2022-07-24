const PickUpLiner = artifacts.require("PickUpLiner");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("PickUpLiner", function (accounts) {
  let contract;
  let owner;

  beforeEach(async () => {
    contract = await PickUpLiner.deployed();
    owner = await contract.owner.call();
  });

  describe("on component creation", () => {
    it("should assert true", async function () {
      return assert.isTrue(true);
    });

    it("should assign owner with value", async () => {
      return assert.equal(owner, accounts[0]);
    });
  });

  describe('on make donation to owner', () => {
    const senderAccount = accounts[1];
    const valueToSend = web3.utils.toWei("0.01", "ether");
    const valueToSubstract = web3.utils.toBN(web3.utils.toWei("0.0105909", "ether"));
    let ownerInitialBalance;
    let senderInitialBalance;
    let ownerFinalBalance;
    let senderFinalBalance;

    beforeEach(async () => {
      ownerInitialBalance = web3.utils.toBN(await web3.eth.getBalance(owner));
      senderInitialBalance = web3.utils.toBN(await web3.eth.getBalance(senderAccount));

      await contract.makeDonationToOwner.sendTransaction({
        from: senderAccount,
        value: valueToSend,
      });

      ownerFinalBalance = web3.utils.toBN(await web3.eth.getBalance(owner));
      senderFinalBalance = web3.utils.toBN(await web3.eth.getBalance(senderAccount));
    });
  
    it('should add value to owner', () => {
      return assert.equal(ownerInitialBalance.add(web3.utils.toBN(valueToSend)).toString(), ownerFinalBalance.toString());
    });

    it('should sub value to sender', () => {
      return parseInt(senderInitialBalance.sub(valueToSubstract).toString()) > parseInt(senderFinalBalance.toString());
    });
  });

  describe('on add pick up line and get pick up line and get pick up line length', () => {
    const amountOfPickUpLineToAdd = 1;
    let pickUpLineToAdd = {id: 5, line: 'Tu est tellement belle que j\'en perd l\'équilibire', amountToPay: 154658};
    let initialPickUpLineLength;
    let finalPickUpLineLength;
    let pickUpLineAdded;
    
    beforeEach(async () => {
      initialPickUpLineLength = await contract.getPickUpLineLength.call();
      result = await contract.addPickUpLine(pickUpLineToAdd, { from: owner });
      finalPickUpLineLength = await contract.getPickUpLineLength.call();
      pickUpLineAdded = await contract.getPickUpLine.call(0);
    });
    
    it('should add pickUpLine to array', async () => {
      return assert.equal(initialPickUpLineLength.toNumber() + amountOfPickUpLineToAdd, finalPickUpLineLength.toNumber());
    });

    it('should emit pick up line added event', () => {
      return assert.equal(result.logs[0].event, 'PickUpLineAdded');
    });
    
    it('should have same pick up line', () => {
      return assert.equal(pickUpLineAdded.line, pickUpLineToAdd.line) && assert.equal(pickUpLineAdded.amountToPay, pickUpLineToAdd.amountToPay);
    });
  });
  
  describe('on complete pick up line', () => {
    let userThatComplete = accounts[1];

    beforeEach(async () => {
      let pickUpLineToAdd = {id: 5, line: 'Tu est tellement belle que j\'en perd l\'équilibire', amountToPay: 1};
      await contract.addPickUpLine(pickUpLineToAdd, { from: owner });
    });

    describe('when all modifiers are satisfied', () => {
      let userPickUpLineIdCompleted;

      beforeEach(async () => {
        await contract.completePickUpLine(web3.utils.toBN(0), { from: userThatComplete });
        userPickUpLineIdCompleted = (await contract.getUserPickUpLineArray(userThatComplete))[0].toNumber();
      });
    
      it('should add user to usertopickupline map', async () => {
        return assert.equal(userPickUpLineIdCompleted, 0);
      });
    });
  
    describe('when pick up line inexistant', () => {
      it('should fail', async () => {
        try {
          await contract.completePickUpLine(2, { from: userThatComplete });
        } catch (error) {
          return assert.equal(error.message, 'Returned error: VM Exception while processing transaction: revert')
        }
      });
    });

    describe('when pickUpLine already completed', () => {
      beforeEach(async () => {
        userThatComplete = accounts[2];
        await contract.completePickUpLine(0, { from: userThatComplete });
      });
    
      it('should fail', async () => {
        try {
          await contract.completePickUpLine(0, { from: userThatComplete });
        } catch (error) {
          return assert.equal(error.message, 'Returned error: VM Exception while processing transaction: revert Contract is already completed')
        }
      });
    });
  });
});
