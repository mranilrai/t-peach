# T'peach Artistry Website

A modern, responsive static website for T'peach Artistry beauty parlour built with Vite, HTML, CSS, and JavaScript.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, elegant design with smooth animations
- **Interactive Elements**: 
  - Mobile-friendly navigation menu
  - Smooth scrolling between sections
  - Image gallery with lightbox effect
  - Contact form with validation
  - Scroll animations
- **Sections**:
  - Hero section with call-to-action
  - Services showcase with pricing
  - Image gallery of work
  - About section with statistics
  - Contact form and information
  - Footer with social links

## Technologies Used

- **Vite**: Fast build tool and development server
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome**: Icons
- **Google Fonts**: Typography (Playfair Display & Open Sans)
- **Unsplash**: High-quality placeholder images

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and visit `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Email Setup

The contact form is configured to work with **EmailJS** for sending emails directly from the frontend. To enable email functionality:

1. **Follow the setup guide** in `emailjs-setup.md`
2. **Create a free EmailJS account** at [emailjs.com](https://www.emailjs.com/)
3. **Configure your email service** (Gmail, Outlook, etc.)
4. **Update the credentials** in `main.js`:
   ```javascript
   const EMAILJS_SERVICE_ID = 'your_service_id';
   const EMAILJS_TEMPLATE_ID = 'your_template_id';
   const EMAILJS_PUBLIC_KEY = 'your_public_key';
   ```

### Alternative Email Solutions

- **Netlify Forms**: Use `netlify-forms-example.html` if hosting on Netlify
- **Formspree**: Use `formspree-example.html` for a simple form backend
- **Custom Backend**: Build your own API endpoint for email handling

## Customization

### Images
- Replace the Unsplash placeholder images with your own beauty parlour photos
- Update the `src` attributes in `index.html`
- Recommended image sizes:
  - Hero image: 600x400px
  - Gallery images: 300x300px
  - About image: 500x600px

### Content
- Update business information in `index.html`:
  - Business name and logo
  - Services and pricing
  - Contact information
  - About section content
  - Social media links

### Styling
- Modify colors in `style.css`:
  - Primary color: `#e67e5b` (peach/coral)
  - Background colors and gradients
  - Font families and sizes

### Functionality
- Customize form handling in `main.js`
- Add more interactive features
- Integrate with booking systems or contact APIs

## File Structure

```
├── index.html          # Main HTML file
├── style.css           # CSS styles
├── main.js            # JavaScript functionality
├── package.json       # Dependencies and scripts
├── vite.config.js     # Vite configuration
├── public/            # Static assets
│   └── favicon.ico    # Website icon
└── README.md          # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support or questions, please contact [your-email@example.com]

---

Built with ❤️ for beauty professionals