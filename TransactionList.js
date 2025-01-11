// Replace with your actual wallet address and API key
const userAddress = '0x54d3666eee6EFC5Efd0bF54C3933640BBf589a1e'; // Your wallet address here
const apiKey = '8HVYVEQI8HQ2YB31SW1ZNKCRSYJSM9QDMA'; // Your Polygonscan API key here

// Construct the API URL
const url = `https://api.polygonscan.com/api?module=account&action=txlist&address=${userAddress}&startblock=0&endblock=latest&sort=asc&apikey=${apiKey}`;

// Fetch transaction data from Polygonscan API
fetch(url)
  .then(response => response.json()) // Parse the JSON response
  .then(data => {
    if (data.status === "1") {
      // If the response is successful, log the transactions
      console.log("Transactions:", data.result);
      
      // Process and display the transactions
      data.result.forEach(tx => {
        console.log(`Transaction Hash: ${tx.hash}`);
        console.log(`From: ${tx.from}`);
        console.log(`To: ${tx.to}`);
        console.log(`Amount: ${tx.value} Wei`);
        console.log(`Timestamp: ${new Date(tx.timeStamp * 1000).toLocaleString()}`);
        console.log('---');
      });
    } else {
      // Handle errors (e.g., invalid address or API key)
      console.error("Error:", data.message);
    }
  })
  .catch(error => {
    // Handle any network or fetch errors
    console.error("Fetch Error:", error);
  });
