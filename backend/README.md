# Verdant Microgreens & Sprouts Bowls (Hyderabad Backend)

Complete Node.js / Express / MongoDB backend built for the Hyderabad living microgreens and ready-to-eat sprout bowls service.

## Features
- **Product Catalog API**: Filter by `bowls` or `greens`.
- **Hyderabad Delivery Hub Checker**: Validates local pincodes (Gachibowli, Hitec City, Jubilee Hills, Banjara Hills, Madhapur, Kondapur, Kukatpally, Secunderabad).
- **Secure Order Management**: Server-side cart calculation, coupon processing (`HYD15`), and free delivery threshold (> ₹399).
- **Payment & UPI**: Razorpay order initialization and signature verification.
- **Database Seeder**: Pre-loaded with Hyderabad special crops (Gongura, Methi, Moong/Chana sprouts, Wheatgrass, and Bowls).

## Quick Start
1. Copy `.env.example` to `.env` and verify your MongoDB URI:
   ```bash
   cp .env.example .env
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Seed the Hyderabad catalog:
   ```bash
   npm run seed
   ```
4. Start development server:
   ```bash
   npm run dev
   ```
   API runs at `http://localhost:5000`.
