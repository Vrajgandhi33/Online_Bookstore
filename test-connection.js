const http = require("http");

console.log("Testing Online Bookstore API Connection...");

// Test if backend is running
function checkServerConnection() {
  return new Promise((resolve) => {
    const req = http.get("http://127.0.0.1:5000/api/health", (res) => {
      console.log(`Backend server status: ${res.statusCode}`);
      resolve(res.statusCode === 200);
    });

    req.on("error", (error) => {
      console.log(`Backend connection error: ${error.message}`);
      console.log("The backend server does not appear to be running.");
      console.log("This is OK - the app will run in mock data mode.");
      resolve(false);
    });

    req.end();
  });
}

// Main function
async function runTests() {
  console.log("Checking backend server availability...");
  const isBackendRunning = await checkServerConnection();

  if (isBackendRunning) {
    console.log("✅ Backend server is running!");
  } else {
    console.log("⚠️ Backend server is NOT running!");
    console.log("The application will work in mock data mode.");
  }

  console.log("\nTo start the application:");
  console.log("1. Run the start-app.bat script, or");
  console.log('2. Run "npm run dev" to start the frontend');

  if (!isBackendRunning) {
    console.log("\nTo start the backend separately (optional):");
    console.log("1. Open a new terminal");
    console.log("2. Navigate to the backend folder");
    console.log('3. Run "npm run dev"');
  }
}

runTests();
