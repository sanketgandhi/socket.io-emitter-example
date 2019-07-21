# Socet.io-Emitter Example
This is simple application which demonstrate how two separate socket application can talk to each other.

# Installation
1. Go to front-end folder and run `npm install`
2. Go to back-end folder and run `npm install`
3. Run npm run dev in both the folders
4. Go to `http://localhost:6001`

# Working
There are two folder in this project i.e front-end and back-end.

### Front-end
- Front-end folder contain one application code i.e. server is configured with socket and redis
- It also serve html file to display the output of other application

### Back-end
- Back-end folder serve other application.
- It emits current time every second

![Diagram](Socket.io-emitter-working.svg)