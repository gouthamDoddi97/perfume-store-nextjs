# Moonlight Attar & Perfumes - Luxury E-commerce Website

A premium e-commerce website for luxury perfumes, attars, and oud fragrances built with Next.js 14, Tailwind CSS, and Framer Motion.

## 🌟 Features

### 🎨 Design & Themes
- **Dual Theme Support**: Dark (black + gold) and Light (cream + rose gold) themes
- **Luxury Design**: Premium, elegant styling with smooth animations
- **Responsive**: Optimized for mobile, tablet, and desktop

### 🛍️ E-commerce Features
- **Product Catalog**: Perfumes, Attars, Oud, and Gift Sets
- **Shopping Cart**: Add/remove items, quantity management
- **Product Filters**: Filter by type, size, price range, fragrance notes
- **Best Sellers**: Featured products with ratings and reviews
- **Special Offers**: Festive discounts and promotional banners

### 🧠 Smart Features
- **Fragrance Quiz**: Personalized recommendations based on personality and mood
- **Search & Filters**: Advanced filtering system
- **Customer Reviews**: Product ratings and feedback
- **Order Tracking**: Track your orders (coming soon)

### 💳 Payment Integration (Ready for Implementation)
- **Razorpay**: For Indian payments
- **Stripe/PayPal**: For international payments

## 🚀 Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom luxury theme
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: Next-themes for dark/light mode
- **TypeScript**: Full type safety

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd moonlight
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Project Structure

```
moonlight/
├── app/                    # Next.js 14 App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Homepage
│   ├── products/         # Products page
│   └── cart/             # Shopping cart page
├── components/            # React components
│   ├── HeroSection.tsx   # Homepage hero
│   ├── Navbar.tsx        # Navigation
│   ├── Footer.tsx        # Footer
│   ├── BestSellers.tsx   # Best sellers grid
│   ├── ProductGrid.tsx   # Product listing
│   └── ShoppingCart.tsx  # Cart functionality
├── lib/                  # Utility functions
├── public/               # Static assets
└── tailwind.config.js    # Tailwind configuration
```

## 🎨 Theme Configuration

The website supports two luxury themes:

### Light Theme (Default)
- **Primary**: Cream (#F5F5DC)
- **Accent**: Rose Gold (#E8B4B8)
- **Background**: Luxury cream tones

### Dark Theme
- **Primary**: Black (#000000)
- **Accent**: Gold (#FFD700)
- **Background**: Dark luxury tones

## 🛠️ Customization

### Adding New Products
Edit the product arrays in:
- `components/BestSellers.tsx`
- `components/ProductGrid.tsx`

### Modifying Colors
Update the color scheme in `tailwind.config.js`:
```javascript
colors: {
  luxury: {
    cream: '#F5F5DC',
    rosegold: '#E8B4B8',
    gold: '#FFD700',
    black: '#000000',
    darkgray: '#1a1a1a',
  }
}
```

### Adding New Pages
Create new pages in the `app/` directory following Next.js 14 App Router conventions.

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Development Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
- **Netlify**: For static deployment
- **Railway**: For full-stack deployment
- **Heroku**: For backend integration

## 🔮 Future Enhancements

### Backend Integration
- **Database**: MongoDB for products, users, orders
- **Authentication**: JWT-based login with Google sign-in
- **Payment Processing**: Razorpay and Stripe integration
- **Admin Dashboard**: Product and order management

### Additional Features
- **User Accounts**: Registration, login, profile management
- **Wishlist**: Save favorite products
- **Order History**: Track past purchases
- **Reviews System**: Customer feedback and ratings
- **SEO Optimization**: Meta tags and schema markup

## 📞 Business Information

- **Business Name**: Moonlight Attar & Perfumes
- **Instagram**: [@moonlight_attar_perfumes](https://instagram.com/moonlight_attar_perfumes)
- **Tagline**: "Discover your Signature Scent"

## 📄 License

This project is created for Moonlight Attar & Perfumes. All rights reserved.

## 🤝 Contributing

This is a custom project for a specific business. For modifications or enhancements, please contact the development team.

---

**Built with ❤️ for luxury fragrance enthusiasts**