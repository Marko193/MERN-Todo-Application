# React-TypeScript-Web3-Pet-App

This project is a **React application** built with **Vite**, **TypeScript**, **styled-components** and **Web3**. 
It also uses **ESLint** and **Prettier** configurations defined at the project root for consistent code quality and formatting.

---

### 🪄 Requirements

- **Node.js v18+**

- In your browser is needed to be installed and connected any **Ethereum wallet, like Metamask** or others.

URL for installation Metamask plugin in Google Chrome: https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn

- For testing application functionality, it is needed to choose any testnet in your Ethereum wallet, like **Sepolia Testnet**. 

You can check how to select test networks in **Metamask** here: https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/

- Also, it is needed to have some **free Sepolia ETH** on your account to make application work. You can get it from here: https://cloud.google.com/application/web3/faucet/ethereum/sepolia

- Recommended editor: **VSCode / WebStorm** with **ESLint** and **Prettier** extensions

## 🧰 Technologies Used

- React v19.1
- Vite v7.1
- TypeScript v5.9
- Styled-components v6.1
- Ethers.js v6.15
- Axios v1.11
- ESLint v9.33
- Prettier v3.6

## ⚙️ Installation

Clone the repository:

```bash
   git clone git@github.com:Marko193/React-TypeScript-Web3-Pet-App.git
```
   
In the project directory, you should run:

```bash
   npm install
```
   This will install Eslint and Prettier packages for project stylizing

For installing client dependencies:

```bash
  cd client
  npm install
```

## 🚀 Running the Client App

To start the React app in development mode:

```bash
  cd client
  npm run dev
```

This will start a **Vite development server**, typically available at:

http://localhost:5173

## 🧱 Build Commands

To build the production version of the client:

```bash
  cd client
  npm run build
```

To preview the production build locally:

```bash
  cd client
  npm run preview
```

This will start the **production build**, typically available at:

http://localhost:4173

## 🧹 Linting and Formatting

**Root-level commands (for the entire project)**

Run ESLint across both client and server directories:

```bash
  npm run lint
```

Automatically fix lint errors:

```bash
  npm run lint:fix
```

Format all files using Prettier:

```bash
  npm run format
```

Check formatting without writing changes:

```bash
  npm run format:check
```

**Client-level commands (inside /client)**
Lint only the client code:

```bash
  cd client
  npm run lint
```

## 🧑‍💻 Development Workflow

```bash
   # 1. Install dependencies
   npm install && cd client && npm install
   
   # 2. Start development server
   npm run dev
   
   # 3. Lint and format before committing
   cd ..
   npm run lint
   npm run format
```

© 2025 React-TypeScript-Web3-Pet-App. All rights reserved.