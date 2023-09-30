# Ikou Frontend 🗺️

Ikou is a community-driven travel app, designed to make trip organizing with friends and peers a breeze, providing recommendations and allowing users to explore and refer back to places, activities, and trips created by others in the community.

> 🚨 This is an ongoing project and subject to significant changes. Detailed documentation will be provided as the project matures.

## Table of Contents
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Features](#features)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contribution](#contribution)
- [Contact](#contact)

## Technology Stack 🛠️
- React (TypeScript)
- [TailwindCSS](https://tailwindcss.com/)
- Axios

## Getting Started 🚀
1. Clone the repository.
   ```sh
   git clone https://github.com/ngfenglong/ikou-website.git
2. Install the dependencies
   ```sh
   npm install
4. Create a .env.local in the root of your project and add the API base URL:
   ```sh
   REACT_APP_IKOU_API_BASEURL=<Your API Base URL>
5. Run the project
   ```sh
   npm start
   

## Features 🌟
- **CRUD Functions:** Manage Trips, Activities, and Places.
- **User Authentication:** Browse without an account or register to contribute.
- **Community Contributions:** Recommend new places and give reviews and ratings.
- **Advanced Trip Planning:** Collaborate and plan trips with peers through trip chat functions. _(Coming Soon)_

## Usage 🛠️
This application is created to offer users an easier experience in organizing outings or trips, allowing users to:
- Discover and get recommendations for places and activities
- Like and refer back to their favorite places, activities, and trips _(Coming Soon)_
- Contribute to the community by recommending new places and activities

_For more interaction details, refer to [Ikou Backend Repository](https://github.com/ngfenglong/ikou-backend).

## Project Structure 🌳
```plaintext
├── public # Static files
├── src # Source files
│ ├── components # Reusable components
│ ├── constants # Constants across the app
│ ├── context # Context API files
│ ├── dto # DTOs (Data Transfer Objects)
│ ├── hooks # Custom hooks
│ ├── icons # Icon components
│ ├── model # Models or entities
│ ├── model-mapper # Model mapper for transforming entities
│ ├── pages # Page components
│ ├── services # Services for external API calls
│ ├── styles # Stylesheets or Style components
│ ├── utils # Utility functions
│ └── App.tsx # Main component
├── package.json # List of dependencies and scripts
├── postcss.config.js # PostCSS configuration file
└── tailwind.config.js # Tailwind CSS configuration file
```

## Contribution 🤝
This project is currently in its infancy. Contributions, ideas, and bug reports are very welcome!

## Contact 📬
For any inquiries or clarifications related to this project, please contact [zell_dev@hotmail.com](mailto:zell_dev@hotmail.com).
