# NSBM Super App

This README provides instructions on how to set up and run the NSBM Super App mobile application, a comprehensive app designed for NSBM students.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Running the Application](#running-the-application)
6. [Features](#features)
7. [Project Structure](#project-structure)
8. [Troubleshooting](#troubleshooting)

## Overview

The NSBM Super App is a mobile application that provides various services to NSBM students, including:
- Event management and registration
- Lecture scheduling
- Campus map navigation
- Seat availability information
- Food service access
- User profile management

## Prerequisites

Before getting started, ensure you have the following installed:

- Node.js (version 14.x or higher)
- npm (version 7.x or higher)
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (for Android emulation) or Xcode (for iOS simulation)
- Git

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/NSBM-Y2S2-CGP-81/nsbm_sa_client
   cd nsbm_sa_client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Create a config file at `config.js` in the root of the project if it doesn't exist:

   ```javascript
   // config.js
   const SERVER_ADDRESS = "http://47.128.245.74:5000";
   export default SERVER_ADDRESS;
   ```

   Replace the URL with your actual backend server address.

2. Make sure you have properly set up any necessary environment variables.

## Running the Application

1. Start the development server:
   ```bash
   npx expo start
   ```

2. Use the Expo Go app on your physical device or run on an emulator:
   - Press `a` to open on Android emulator
   - Press `i` to open on iOS simulator
   - Scan the QR code with Expo Go app on your physical device

## Features

### Authentication
- Sign in with NSBM student email
- Sign up with student details
- Secure authentication token management

### Event Management
- View upcoming events and stalls
- Register for events
- Create event requests
- View event details and status

### Campus Navigation
- Interactive university map
- Location finder for key campus locations
- Road map with GPS integration

### Seat Availability
- Real-time seat availability in faculties
- Library seat status
- Faculty-specific seat information

### Food Services
- Access to campus food services
- Food ordering capabilities

### User Profile
- View and manage student information
- Update profile details
- Secure logout functionality

## Project Structure

The application follows Expo's file-based routing structure:

- `app/` - Main application code
  - `(auth)/` - Authentication screens
  - `(main_screen)/` - Main application screens
  - `services/` - API and utility services
- `components/` - Reusable UI components
- `assets/` - Images, fonts, and other static assets
- `config.js` - Configuration file

## Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Verify your backend server is running
   - Check the SERVER_ADDRESS in config.js
   - Ensure your device/emulator can access the network

2. **Authentication Issues**
   - Clear AsyncStorage and try logging in again
   - Verify credentials format (email must end with @students.nsbm.ac.lk)

3. **UI Display Issues**
   - Reload the app with `r` in the Expo CLI
   - Clear cache with `expo start -c`

4. **Permission Issues**
   - Ensure necessary permissions are granted for features like maps or document picking

### Support

For additional help, contact the development team or submit an issue in the project repository.
