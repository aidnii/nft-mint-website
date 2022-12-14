import { useState } from "react";
import { ethers, BigNumber } from 'ethers';
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import roboPunksNFT from './RoboPunksNFT.json';

const roboPunksNFTAddress = "0x6ffFF872D307e495afDC2c2f48390bfD914397e8";

const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount ] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                roboPunksNFTAddress,
                roboPunksNFT.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber(mintAmount), {
                    value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
                });
                console.log('response: ', response);
            } catch (err) {
                console.log("error: ", err)
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };

    const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    };

    return (
        <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
            <Box width="520px">
                <div>
                    <Text fontSize="48px" textShadow="0 5px #00000">RoboPunks</Text>
                    <Text
                        fontSize="30px"
                        letterSizing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 2px 2px #000000"
                        >
                            It's 2078. Can the RoboPunks NFT save humans from destructive rampant NFT speculation? Mint RoboPunks to find out. 
                    </Text>
                </div>
                {isConnected ? (
                    <div>
                        <Flex align="center" justify="center">
                            <Button 
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                margin="10px"
                                onClick={handleDecrement}
                                >
                                    -    
                            </Button>
                            <Input 
                                fontFamily="inherit"
                                width="100px"
                                height="40px"
                                textAlign="center"
                                paddingLeft="19px"
                                marginTop="10px"
                                type="number" 
                                value={mintAmount} 
                            />
                            <Button 
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                margin="10px"
                                onClick={handleIncrement}
                                >
                                    +
                            </Button>
                        </Flex>
                        <Button
                            backgroundColor="#D6517D"
                            borderRadius="5px"
                            boxShadow="0 2px 2px 1px #0F0F0F"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            margin="10px"
                            onClick={handleMint}
                            >
                                Mint Now
                        </Button>
                    </div>
                ) : (
                    <Text
                        color="#D6517D"
                        fontSize="30px"
                        letterSizing="-5.5%"
                        fontFamily="inherit"
                        textShadow="0 3px #000000"
                        marginTop="70px"
                        >
                            You must be connected to Mint.
                    </Text>
                )}
            </Box>
        </Flex>
    );
};

export default MainMint;