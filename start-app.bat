@echo off
echo Starting Online Bookstore Application...

REM Create .env if not exists or copy from root
if not exist backend\.env (
    echo Creating .env file for backend...
    copy .env backend\.env
)

REM Start the backend server first
cd backend
start cmd /k "echo Starting backend server on port 5000... && npm run dev"
cd ..

REM Wait a moment for backend to initialize
timeout /t 3 /nobreak > nul

REM Run the test connection script
node test-connection.js

REM Start the frontend
echo Starting frontend on http://localhost:3000...
npm run dev
