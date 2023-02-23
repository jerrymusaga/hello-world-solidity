import { expect } from "chai";
import { ethers } from "hardhat";
import { HelloWorld } from "../typechain-types";

describe("Hello World", function () {

    let helloWorldContract: HelloWorld;

    beforeEach(async function () {
        const helloWorldContractFactory = await ethers.getContractFactory("HelloWorld");
        helloWorldContract = await helloWorldContractFactory.deploy();
        await helloWorldContract.deployed();
    })

    it("it should return hello world", async function (){
        
        const text = await helloWorldContract.getText();
        expect(text).to.eq("Hello World");
    })

    it("set owner to deployer account", async function(){

        const signers = await ethers.getSigners();
        const deployerAccount = signers[0].address ;

        const owner = await helloWorldContract.owner();
        expect(owner).to.eq(deployerAccount);
    })

    it("should not allow any other owner to call transferOwnership function", async function(){
        const signers = await ethers.getSigners();
        await expect(helloWorldContract.connect(signers[1]).transferOwnership(signers[1].address)).to.be.revertedWith("This is not the owner address");
        
    })

})