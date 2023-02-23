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
        let owner = await helloWorldContract.owner()
        console.log("owner before is" + owner)
        const tx = await helloWorldContract.transferOwnership(signers[1].address);
        await tx.wait();
        owner = await helloWorldContract.owner()
        console.log("owner after is" + owner)
    })

})