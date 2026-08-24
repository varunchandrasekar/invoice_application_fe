# Krish Ratna & Co Legal Billing Application - Frontend

This is the frontend user interface for the Krish Ratna & Co Legal Billing Application. It provides a modern, responsive, and intuitive web application for solicitors to input client billing information, manage time costs, and seamlessly generate Excel invoices.

## Tech Stack

*   **React 18**
*   **TypeScript**
*   **Vite** (Build Tool)
*   **Lucide React** (Iconography)
*   **Axios** (API Requests)

## Key Features

*   **Dynamic Data Entry:** Interactive forms to add and manage:
    *   Invoice Details (Rates, VAT number, Invoice Date)
    *   Client Details
    *   Time Costs (with automatic hours/minutes calculation)
    *   Disbursements
    *   Money on Account & Outstanding Invoices
    *   Schedule of Work
*   **Live Summary Preview:** A real-time calculated summary panel tracking Subtotals, VAT, and the Final Balance Due as the user inputs data.
*   **One-Click Excel Generation:** A fixed bottom action bar allows users to instantly send the form data to the Spring Boot backend and download the generated `.xlsx` invoice.
*   **Responsive Layout:** A clean UI featuring a glass-morphism aesthetic, custom utility classes, and optimized grid layouts.

## Prerequisites

*   **Node.js** (v18 or higher recommended)
*   **npm** (Node Package Manager)

## Running the Application

1. Open a terminal and navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The Vite development server will typically start on `http://localhost:5173`.

## Folder Structure

*   `/src/components`: React components separated by logical forms (e.g., `TimeCostsSection`, `ClientDetailsForm`).
*   `/src/hooks`: Custom React hooks, including `useBillCalculator` for real-time frontend arithmetic.
*   `/src/services`: API service layers (e.g., `billApiService.ts`) bridging the frontend to the Java backend.
*   `/src/types`: TypeScript interfaces defining the Bill structure and DTOs.
*   `/src/index.css`: Core application styling and custom utility classes.

## Development Notes
*   **Backend Connection:** Ensure the Spring Boot backend is running on `http://localhost:8080` before clicking "Generate Excel Bill", as the frontend relies on the backend to create the downloadable file.
