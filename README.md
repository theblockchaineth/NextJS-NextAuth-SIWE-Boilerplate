# NextJS 14 (Typescript) w/ SIWE enabled NextAuth authentication and sessions

## wagmi and web 3 modal underneath

## tailwindcss and daisyui for ui/ux

## protected routes via middleware.ts

## also protected using the server-side props patterns (see app/protected/page.tsx)

Environment Variables

1. rename the .env.example file to .env
2. add your walletconnect project id to NEXT_PUBLIC_WCID
3. If you're using mainnet, add 1 to NEXT_PUBLIC_NETWORK_ID
4. regenerate a strong Next Auth key (i.e. openssl rand -base64 32) for NEXTAUTH_SECRET

## Getting Started

```
Complete the .env steps above...

>> npm install
>> npm run dev

```
