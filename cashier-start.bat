@ECHO OFF
CD C:\cashier-app
CALL npm run build
TIMEOUT 1
CALL npm run start
TIMEOUT 1

PAUSE