const socketIo = require('socket.io'); 
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io; // Declare a variable to hold the Socket.IO instance

// Initialize the Socket.IO server
function initializeSocket(server) {
    // Create a new Socket.IO instance attached to the provided server
    io = socketIo(server, {
        cors: {
            origin: '*', // Allow requests from any origin
            methods: [ 'GET', 'POST' ] // Allow GET and POST HTTP methods
        }
    });

    // When a new client (socket) connects to the server
    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`); // Log the connection event

        // Handle the 'join' event to associate a user or captain with a socket
        socket.on('join', async (data) => {
            const { userId, userType } = data; // Extract userId and userType from the data

            // Update the user or captain model with the socket ID
            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });

        // Handle the 'update-location-captain' event to update the captain's location
        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data; // Extract userId and location from the data

            // Check if the location data is valid
            if (!location || !location.ltd || !location.lng) {
                // If location is invalid, send an error message to the socket
                return socket.emit('error', { message: 'Invalid location data' });
            }

            // Update the captain's location in the database
            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd, // Latitude
                    lng: location.lng  // Longitude
                }
            });
        });

        // Handle the 'disconnect' event when a client disconnects
        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`); // Log the disconnection event
        });
    });
}

// Function to send a message to a specific socket by its ID
const sendMessageToSocketId = (socketId, messageObject) => {
    console.log(messageObject); // Log the message object for debugging

    // If Socket.IO is initialized
    if (io) {
        // Emit the message event to the specified socket ID
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        // If Socket.IO is not initialized, log an error
        console.log('Socket.io not initialized.');
    }
}

// Export the functions for external usage
module.exports = { initializeSocket, sendMessageToSocketId };
