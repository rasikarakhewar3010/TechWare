# TechWare

TechWare is a comprehensive web-based project designed to provide detailed information about computer hardware. This project serves as an educational platform for users to explore various components of hardware, learn how to install and utilize them effectively, and engage in interactive exercises to reinforce their knowledge.

## Why This Project Was Built
TechWare was created to address the gap in accessible, interactive, and practical resources for learning about computer hardware. As technology evolves, understanding the components of hardware and their functionality becomes essential for tech enthusiasts, students, and professionals. This project aims to:

- Educate users about different hardware components.
- Provide hands-on exercises to deepen understanding.
- Simplify the process of learning hardware installation and troubleshooting.
- Offer an engaging and visually appealing platform to explore hardware knowledge.

## Features
- **Detailed Information:** Learn about various hardware components such as CPUs, monitors, mice, and printers.
- **Interactive Exercises:** Participate in engaging exercises to understand the practical aspects of hardware usage and installation.
- **Step-by-Step Installation Guides:** Get clear and concise instructions on how to install hardware components.
- **Gallery:** Explore visual content showcasing different hardware devices.
- **User-Friendly Interface:** Navigate through an intuitive and responsive design for an optimal learning experience.

## Tech Stack
TechWare is built using the following technologies:
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Templating Engine:** EJS
- **Database:** MySQL

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/techware.git
   cd techware
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the database:
   - Set up a MySQL database.
   - Import the provided SQL schema and data files (if any).
   - Update the database configuration in the `.env` file:
     ```env
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=yourpassword
     DB_NAME=techware
     ```
4. Start the server:
   ```bash
   node app.js
   ```
   The application will be accessible at `http://localhost:3000`.

## Usage
- Navigate through the website to explore detailed descriptions of hardware components.
- Participate in exercises to learn how to install and use various hardware devices.
- View the gallery for a visual representation of hardware products.

