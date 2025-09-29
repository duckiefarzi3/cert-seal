# CertifyChain - Technical Documentation

## 🏗️ Architecture Overview

This is a blockchain-based certificate verification system built with modern web3 technologies.

### Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite (Build Tool)
- Tailwind CSS (Styling)
- shadcn/ui (UI Components)
- Ethers.js (Blockchain Interaction)
- React Router (Navigation)

**Smart Contract:**
- Solidity ^0.8.0
- OpenZeppelin (AccessControl, Ownable)
- Hardhat (Development & Testing)

**Storage:**
- IPFS/Arweave (Certificate Files)
- Ethereum Blockchain (Certificate Hashes & Metadata)

**Backend API (To Be Implemented):**
- Node.js + Express
- IPFS Client Integration
- Database (Optional - for indexing)

---

## 📋 Smart Contract Structure

### Core Contract: `CertificateRegistry.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract CertificateRegistry is AccessControl {
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");
    
    struct Certificate {
        bytes32 certificateHash;
        address issuer;
        address recipient;
        uint256 issueDate;
        string metadataURI; // IPFS/Arweave link
        bool isRevoked;
        string revocationReason;
        uint256 revocationDate;
    }
    
    mapping(bytes32 => Certificate) public certificates;
    mapping(bytes32 => bool) public issuedCertificates;
    
    event CertificateIssued(
        bytes32 indexed certificateHash,
        address indexed issuer,
        address indexed recipient,
        string metadataURI,
        uint256 timestamp
    );
    
    event CertificateRevoked(
        bytes32 indexed certificateHash,
        string reason,
        uint256 timestamp
    );
    
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ISSUER_ROLE, msg.sender);
    }
    
    function issueCertificate(
        bytes32 _certificateHash,
        address _recipient,
        string memory _metadataURI
    ) external onlyRole(ISSUER_ROLE) {
        require(!issuedCertificates[_certificateHash], "Certificate already issued");
        
        certificates[_certificateHash] = Certificate({
            certificateHash: _certificateHash,
            issuer: msg.sender,
            recipient: _recipient,
            issueDate: block.timestamp,
            metadataURI: _metadataURI,
            isRevoked: false,
            revocationReason: "",
            revocationDate: 0
        });
        
        issuedCertificates[_certificateHash] = true;
        
        emit CertificateIssued(_certificateHash, msg.sender, _recipient, _metadataURI, block.timestamp);
    }
    
    function revokeCertificate(
        bytes32 _certificateHash,
        string memory _reason
    ) external onlyRole(ISSUER_ROLE) {
        require(issuedCertificates[_certificateHash], "Certificate not found");
        require(!certificates[_certificateHash].isRevoked, "Already revoked");
        
        certificates[_certificateHash].isRevoked = true;
        certificates[_certificateHash].revocationReason = _reason;
        certificates[_certificateHash].revocationDate = block.timestamp;
        
        emit CertificateRevoked(_certificateHash, _reason, block.timestamp);
    }
    
    function verifyCertificate(bytes32 _certificateHash) 
        external 
        view 
        returns (bool exists, bool isValid, Certificate memory cert) 
    {
        exists = issuedCertificates[_certificateHash];
        if (exists) {
            cert = certificates[_certificateHash];
            isValid = !cert.isRevoked;
        }
    }
    
    function batchIssueCertificates(
        bytes32[] memory _hashes,
        address[] memory _recipients,
        string[] memory _metadataURIs
    ) external onlyRole(ISSUER_ROLE) {
        require(_hashes.length == _recipients.length, "Length mismatch");
        require(_hashes.length == _metadataURIs.length, "Length mismatch");
        
        for (uint i = 0; i < _hashes.length; i++) {
            if (!issuedCertificates[_hashes[i]]) {
                certificates[_hashes[i]] = Certificate({
                    certificateHash: _hashes[i],
                    issuer: msg.sender,
                    recipient: _recipients[i],
                    issueDate: block.timestamp,
                    metadataURI: _metadataURIs[i],
                    isRevoked: false,
                    revocationReason: "",
                    revocationDate: 0
                });
                
                issuedCertificates[_hashes[i]] = true;
                emit CertificateIssued(_hashes[i], msg.sender, _recipients[i], _metadataURIs[i], block.timestamp);
            }
        }
    }
}
```

---

## 🔧 Implementation Steps

### Phase 1: Smart Contract Development ✅ (Design Complete)
- [x] Design contract architecture
- [ ] Implement Solidity contract
- [ ] Write comprehensive tests
- [ ] Deploy to testnet (Polygon Mumbai/Goerli)
- [ ] Verify contract on Etherscan

### Phase 2: Backend API Development
- [ ] Set up Express.js server
- [ ] Integrate IPFS client (Pinata/Infura)
- [ ] Implement file upload endpoint
- [ ] Implement hash computation (keccak256)
- [ ] Create verification endpoint
- [ ] Add database indexing (optional)

### Phase 3: Frontend Integration
- [ ] Connect MetaMask wallet
- [ ] Implement Web3 provider setup
- [ ] Create certificate issuance flow
- [ ] Build verification system
- [ ] Add QR code generation
- [ ] Implement QR scanner

### Phase 4: Enhancements
- [ ] Soulbound NFT implementation (ERC-721)
- [ ] Analytics dashboard
- [ ] Multi-chain support
- [ ] Zero-Knowledge Proof verification
- [ ] Encrypted certificates
- [ ] AI fraud detection

---

## 🚀 Deployment Guide

### Smart Contract Deployment

```bash
# Install dependencies
npm install --save-dev hardhat @openzeppelin/contracts

# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy to testnet
npx hardhat run scripts/deploy.js --network mumbai
```

### Frontend Deployment

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🔐 Security Considerations

1. **Access Control**: Only authorized issuers can issue certificates
2. **Hash Verification**: keccak256 ensures tamper detection
3. **Immutability**: Blockchain storage prevents modification
4. **Decentralized Storage**: IPFS/Arweave prevents single point of failure
5. **Revocation Mechanism**: Transparent revocation with reasons

---

## 📊 API Endpoints (To Be Implemented)

### POST /api/certificates/issue
```json
{
  "recipientAddress": "0x...",
  "certificateFile": "file",
  "metadata": {
    "name": "Bachelor of Science",
    "institution": "University Name",
    "date": "2024-01-15"
  }
}
```

### GET /api/certificates/verify/:hash
```json
{
  "exists": true,
  "isValid": true,
  "certificate": {
    "issuer": "0x...",
    "recipient": "0x...",
    "issueDate": 1705276800,
    "metadataURI": "ipfs://...",
    "isRevoked": false
  }
}
```

### POST /api/certificates/revoke
```json
{
  "certificateHash": "0x...",
  "reason": "Fraud detected"
}
```

---

## 🎯 Future Enhancements

1. **Zero-Knowledge Proofs**: Verify credentials without revealing details
2. **On-Chain Endorsements**: Third-party validations
3. **Multi-Signature Issuance**: Require multiple approvers
4. **Encrypted Certificates**: Privacy-preserving verification
5. **AI Fraud Detection**: Machine learning for tampering detection
6. **Cross-Chain Verification**: Support multiple blockchains
7. **Revocation Lists**: Efficient batch revocation checks
8. **Certificate Templates**: Pre-defined certificate formats
9. **Integration APIs**: Easy third-party verification
10. **Mobile App**: Native iOS/Android apps

---

## 📱 QR Code Format

Each certificate QR code encodes:
```
https://certifychain.app/verify?hash=0x1234567890abcdef...
```

Scanning redirects to verification page with auto-verification.

---

## 🧪 Testing

### Smart Contract Tests
```javascript
describe("CertificateRegistry", function () {
  it("Should issue certificate", async function () {
    // Test implementation
  });
  
  it("Should prevent double issuance", async function () {
    // Test implementation
  });
  
  it("Should revoke certificate", async function () {
    // Test implementation
  });
  
  it("Should verify certificate", async function () {
    // Test implementation
  });
});
```

### Frontend Tests
- Unit tests for components
- Integration tests for Web3 interactions
- E2E tests for user flows

---

## 📞 Integration Examples

### JavaScript/TypeScript
```typescript
import { ethers } from 'ethers';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(contractAddress, abi, provider);

// Verify certificate
const result = await contract.verifyCertificate(certificateHash);
console.log(result.isValid); // true/false
```

### API Integration
```javascript
const response = await fetch(`/api/verify/${hash}`);
const data = await response.json();
if (data.isValid) {
  console.log('Certificate is valid!');
}
```

---

## 🔗 Useful Links

- [Hardhat Documentation](https://hardhat.org/docs)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)
- [IPFS Documentation](https://docs.ipfs.tech/)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [Polygon Mumbai Testnet](https://mumbai.polygonscan.com/)

---

Built with ❤️ for transparent and trustworthy credential verification.
