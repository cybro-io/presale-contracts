require('@nomicfoundation/hardhat-verify');
require('@nomicfoundation/hardhat-chai-matchers');
require("hardhat-contract-sizer");
require('hardhat-dependency-compiler');
require('hardhat-deploy');
require('hardhat-gas-reporter');
require('hardhat-tracer');
require('dotenv').config();

module.exports = {
    tracer: {
        enableAllOpcodes: true,
    },
    solidity: {
      compilers: [
        {
          version: '0.8.24',
          settings: {
            optimizer: {
              enabled: true,
              runs: 1_000_000,
            },
            viaIR: true,
          },
        }
      ]
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
    contractSizer: {
        runOnCompile: true,
        unit: "B",
    },
    gasReporter: {
      enabled: true,
      currency: 'USD',
      token: 'MATIC',
      noColors: false
    },
    dependencyCompiler: {
        paths: [
            '@1inch/solidity-utils/contracts/mocks/TokenCustomDecimalsMock.sol',
            '@1inch/solidity-utils/contracts/mocks/TokenMock.sol'
        ],
    },
    etherscan: {
      apiKey:{
        polygonMumbai: `${process.env.POLYGONSCAN_API_KEY}` || '',
        polygon: `${process.env.POLYGONSCAN_API_KEY}` || '',
        bsc: `${process.env.BSCSCAN_API_KEY}` || '',
        bscTestnet: `${process.env.BSCSCAN_API_KEY}` || '',
        ethereum: `${process.env.ETHERSCAN_API_KEY}` || '',
        sepolia: `${process.env.ETHERSCAN_API_KEY}` || '',
        mainnet: `${process.env.ETHERSCAN_API_KEY}` || '',
        blastSepolia: `blast_sepolia`, // no api key required
      },
      customChains: [
        {
          network: "blastSepolia",
          chainId: 168587773,
          urls: {
            apiURL: "https://api.routescan.io/v2/network/testnet/evm/168587773/etherscan",
            browserURL: "https://testnet.blastscan.io"
          }
        },
      ]
    },
    namedAccounts: {
      deployer: {
          default: 0,
      },
    },
    defaultNetwork: "hardhat",
    networks: {
      hardhat: {
        chainId: 31337,
        blockGasLimit: 30000000,
        gasPrice: 70_000_000_000,
        mining:{
          auto: true,
          interval: 5000
        }
      },
      mumbai: {
        chainId: 80001,
        url: `https://polygon-mumbai.infura.io/v3/${process.env.ALCHEMY_MUMBAI_KEY}`,
        accounts: {
          mnemonic: `${process.env.SEED_PHRASE_DEPLOYER}`,
        }
      },
      polygon: {
        chainId: 137,
        url: `https://polygon-mainnet.infura.io/v3/${process.env.ALCHEMY_POLYGON_KEY}`,
        accounts: {
          mnemonic: `${process.env.SEED_PHRASE_DEPLOYER}`,
        }
      },
      bsc: {
        chainId: 56,
        url: `https://bsc-dataseed1.bnbchain.org`,
        accounts: [ `0x${process.env.PRIVATE_KEY_DEPLOYER}` ]
      },
      bscTestnet: {
        chaindId: 97,
        url: `https://bsc-testnet.blockpi.network/v1/rpc/public`,
        account: {
            mnemonic: `${process.env.SEED_PHRASE_DEPLOYER}`,
        }
      },
      ethereum: {
        chainId: 1,
        url: `https://mainnet.infura.io/v3/${process.env.ALCHEMY_ETHEREUM_KEY}`,
        accounts: [ `0x${process.env.PRIVATE_KEY_DEPLOYER}` ]
      },
      sepolia: {
        chainId: 11155111,
        url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_ETHEREUM_SEPOLIA_KEY}`,
        accounts: [ `0x${process.env.PRIVATE_KEY_DEPLOYER}` ]
      },
      arbitrum: {
        chainId: 42161,
        url: `https://arbitrum-mainnet.infura.io/v3/${process.env.ALCHEMY_ARBITRUM_KEY}`,
        accounts: [ `0x${process.env.PRIVATE_KEY_DEPLOYER}` ]
      },
      blastSepolia: {
        chainId: 168587773,
        url: `https://sepolia.blast.io`,
        accounts: [ `0x${process.env.PRIVATE_KEY_DEPLOYER}` ]
      }
    },
};
