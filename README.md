<div align="center">
  <img src="https://raw.githubusercontent.com/yourusername/ExchangeRate-App/main/assets/showcase.png" alt="NOMISMA - The Calmer State of Money" width="100%">
  
  # 💱 NOMISMA
  ### The Calmer State of Money
  
  <p align="center">
    <strong>Modern, elegant, and lightning-fast currency exchange app</strong>
    <br />
    Built with React Native & Expo for iOS and Android
  </p>
  
  <p align="center">
    <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
    <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </p>
</div>

---

## ✨ Features

### 💎 **Elegant Design**
- **Modern Blue Gradient Theme** - Eye-catching gradient design with smooth transitions
- **Intuitive UI/UX** - Clean, minimal interface that puts data first
- **Smooth Animations** - Fluid transitions and interactive elements
- **Dark Mode Ready** - Comfortable viewing in any lighting condition

### 📊 **Real-Time Exchange Rates**
- **Live Data** - Powered by Frankfurter API for accurate, up-to-date rates
- **30+ Currencies** - Support for major world currencies
- **TRY Focus** - Specialized Turkish Lira tracking and calculations
- **Rate History** - Historical charts with multiple time periods

### 🔄 **Advanced Converter**
- **Dual Input System** - Convert between any two currencies instantly
- **Smart Calculations** - Real-time conversion as you type
- **Currency Picker** - Beautiful modal selector with flags and names
- **Swap Function** - Quick currency swap with one tap

### 📈 **Market Insights**
- **Top Rates Slider** - Quick view of major currencies
- **Interactive Charts** - Visualize rate trends over time
- **Period Selector** - Day, Week, Month, 6M, Year, 5Y, Max views
- **Rate Statistics** - Week high/low, open rate, previous close

### 🎯 **User Experience**
- **Hamburger Menu** - Smooth animated drawer navigation
- **Bottom Navigation** - Easy access to all features
- **Search & Filter** - Find currencies quickly
- **Responsive Design** - Optimized for all screen sizes

---

## 🚀 Quick Start

### Prerequisites
```bash
node >= 18.0.0
npm >= 9.0.0
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ExchangeRate-App.git
   cd ExchangeRate-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on your device**
   - 📱 **iOS**: Scan QR code with Camera app
   - 🤖 **Android**: Scan QR code with Expo Go app
   - 💻 **Emulator**: Press `a` for Android or `i` for iOS

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React Native** | Cross-platform mobile framework |
| **Expo v52** | Development platform and tools |
| **TypeScript** | Type-safe code development |
| **Expo Router** | File-based navigation system |
| **Axios** | HTTP client for API requests |
| **React Native Chart Kit** | Beautiful data visualization |
| **Expo Linear Gradient** | Gradient backgrounds |
| **Frankfurter API** | Real-time exchange rate data |

---

## 📁 Project Structure

```
ExchangeRate-App/
├── 📱 app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Main rates screen
│   │   ├── cevirici.tsx       # Currency converter
│   │   └── _layout.tsx        # Tab layout
│   ├── currency-detail.tsx    # Detailed currency view
│   ├── modal.tsx              # Modal screens
│   └── _layout.tsx            # Root layout
├── 🎨 assets/
│   └── images/                # App images & icons
├── 🧩 components/
│   ├── BottomNavigation.tsx   # Navigation component
│   └── ui/                    # Reusable UI components
├── 🎭 constants/
│   └── theme.ts               # Color palette & design tokens
├── 🔌 services/
│   └── api.ts                 # API integration
├── 📐 types/
│   └── currency.ts            # TypeScript type definitions
└── ⚙️ Configuration files
```

---

## 🎨 Design Philosophy

**NOMISMA** embraces a "calmer state of money" philosophy. The design focuses on:

- 🎯 **Clarity**: Clear data presentation without clutter
- 💙 **Trust**: Professional blue gradient instills confidence
- ⚡ **Speed**: Instant conversions and smooth interactions
- 🧘 **Calm**: Reduce financial stress with elegant simplicity

---

## 🌐 API Integration

### Frankfurter API
```typescript
Base URL: https://api.frankfurter.app
Endpoint: /latest?from=CHF
```

**Features:**
- ✅ Real-time exchange rates
- ✅ Historical data support
- ✅ 30+ currency pairs
- ✅ Free & reliable
- ✅ No API key required

---

## 📱 Screenshots

<div align="center">
  <table>
    <tr>
      <td><img src="screenshots/home.png" width="250" alt="Home Screen"/></td>
      <td><img src="screenshots/converter.png" width="250" alt="Converter"/></td>
      <td><img src="screenshots/detail.png" width="250" alt="Currency Detail"/></td>
    </tr>
    <tr>
      <td align="center"><strong>Home Screen</strong></td>
      <td align="center"><strong>Converter</strong></td>
      <td align="center"><strong>Currency Detail</strong></td>
    </tr>
  </table>
</div>

---

## 🎯 Key Features Breakdown

### Main Screen (index.tsx)
- Top rates carousel with live data
- Searchable currency list
- Filter tabs (Tümü, Popüler, Forex)
- Animated drawer menu
- TRY-focused rate calculations

### Converter Screen (cevirici.tsx)
- Dual currency input system
- Real-time conversion engine
- Modal currency picker with search
- Keyboard-aware scrolling
- Swap currencies functionality

### Detail Screen (currency-detail.tsx)
- Interactive line charts
- Multiple time period views
- Rate statistics cards
- Historical data visualization
- Back navigation with smooth transitions

---

## 🚀 Performance

- ⚡ **Fast Load**: Optimized bundle size
- 🔄 **Smooth Animations**: 60fps transitions
- 💾 **Efficient Caching**: Reduced API calls
- 📱 **Responsive**: Adapts to all screen sizes

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. 🍴 Fork the repository
2. 🌿 Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🎉 Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developer

<div align="center">
  <p><strong>Made with ❤️ by Ege Aydın</strong></p>
  <p>
    <a href="https://github.com/yourusername">GitHub</a> •
    <a href="https://linkedin.com/in/yourprofile">LinkedIn</a> •
    <a href="https://twitter.com/yourhandle">Twitter</a>
  </p>
</div>

---

## 🙏 Acknowledgments

- [Frankfurter API](https://www.frankfurter.app/) for reliable exchange rate data
- [Expo Team](https://expo.dev) for the amazing development platform
- [React Native Community](https://reactnative.dev) for continuous support
- All open-source contributors

---

<div align="center">
  <p><strong>⭐ Star this repo if you find it useful!</strong></p>
  <p><em>Built with React Native • Powered by Expo • Designed with Figma</em></p>
</div>
