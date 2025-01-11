// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title DeFi Credit Score
 * @dev Contract for managing decentralized credit scores based on on-chain activity
 */
contract CreditScore {
    // State variables
    mapping(address => UserProfile) private userProfiles;
    address public owner;
    bool public paused;

    // Structs
    struct UserProfile {
        uint256 creditScore;
        uint256 transactionCount;
        uint256 walletCreationTime;
        uint256 defiInteractions;
        uint256 loanRepayments;
        uint256 transactionVolume;
        uint256 lastUpdateTime;
    }

    // Events
    event ScoreUpdated(address indexed user, uint256 newScore);
    event ProfileCreated(address indexed user);

    // Errors
    error Unauthorized();
    error ContractPaused();
    error InvalidInput();

    // Modifiers
    modifier onlyOwner() {
        if (msg.sender != owner) revert Unauthorized();
        _;
    }

    modifier whenNotPaused() {
        if (paused) revert ContractPaused();
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Creates or updates a user's credit profile
     * @param _transactionCount Number of transactions
     * @param _defiInteractions Number of DeFi protocol interactions
     * @param _loanRepayments Number of successful loan repayments
     * @param _transactionVolume Total volume of transactions in wei
     */
    function updateProfile(
        uint256 _transactionCount,
        uint256 _defiInteractions,
        uint256 _loanRepayments,
        uint256 _transactionVolume
    ) external whenNotPaused {
        // Input validation
        if (_transactionCount == 0) revert InvalidInput();

        UserProfile storage profile = userProfiles[msg.sender];
        
        // If new user, initialize wallet creation time
        if (profile.walletCreationTime == 0) {
            profile.walletCreationTime = block.timestamp;
            emit ProfileCreated(msg.sender);
        }

        // Update profile data
        profile.transactionCount = _transactionCount;
        profile.defiInteractions = _defiInteractions;
        profile.loanRepayments = _loanRepayments;
        profile.transactionVolume = _transactionVolume;
        profile.lastUpdateTime = block.timestamp;

        // Calculate new credit score
        uint256 newScore = calculateScore(msg.sender);
        profile.creditScore = newScore;

        emit ScoreUpdated(msg.sender, newScore);
    }

    /**
     * @dev Calculates credit score based on user's profile
     * @param user Address of the user
     * @return score Credit score between 300 and 850
     */
    function calculateScore(address user) public view returns (uint256 score) {
        UserProfile storage profile = userProfiles[user];
        
        // Base score starts at 300
        score = 300;

        // Wallet age score (15%) - Max 82.5 points
        uint256 walletAge = (block.timestamp - profile.walletCreationTime) / 1 days;
        score += (walletAge * 82) / 365 with { max: 82 };

        // Transaction history (30%) - Max 165 points
        score += (profile.transactionCount * 165) / 1000 with { max: 165 };

        // DeFi interactions (25%) - Max 137.5 points
        score += (profile.defiInteractions * 137) / 100 with { max: 137 };

        // Loan repayments (20%) - Max 110 points
        score += (profile.loanRepayments * 110) / 100 with { max: 110 };

        // Transaction volume (10%) - Max 55 points
        score += (profile.transactionVolume * 55) / 1000 ether with { max: 55 };

        // Ensure score doesn't exceed 850
        if (score > 850) {
            score = 850;
        }
    }

    /**
     * @dev Retrieves a user's credit profile
     * @param user Address of the user
     * @return UserProfile struct containing user's credit data
     */
    function getProfile(address user) external view returns (UserProfile memory) {
        return userProfiles[user];
    }

    /**
     * @dev Emergency pause function
     * @param _paused New pause state
     */
    function setPaused(bool _paused) external onlyOwner {
        paused = _paused;
    }
}