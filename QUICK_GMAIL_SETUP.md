# 📧 Quick Gmail Setup for T'peach Artistry

## 🚀 5-Minute Setup

### Step 1: EmailJS Account
- Go to [emailjs.com](https://emailjs.com)
- Sign up with your Gmail account
- Verify email

### Step 2: Connect Gmail
- Dashboard → **Email Services** → **Add New Service**
- Select **Gmail** → **Connect Account**
- Sign in and allow permissions
- **Copy your Service ID** (looks like: `service_abc123`)

### Step 3: Create Template
- Dashboard → **Email Templates** → **Create New Template**
- **Template Name**: T'peach Contact Form
- **Subject**: `New T'peach Artistry Contact - {{service}}`
- **Content**:
```
Hello,

New inquiry from T'peach Artistry website:

Customer: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Service: {{service}}

Message:
{{message}}

Reply to: {{from_email}}
```
- **Copy your Template ID** (looks like: `template_xyz789`)

### Step 4: Get Public Key
- Dashboard → **Account** → **General**
- **Copy your Public Key** (looks like: `abcdefghijklmnop`)

### Step 5: Update Your Website
Open `main.js` and replace:
```javascript
const EMAILJS_SERVICE_ID = 'service_abc123';     // Your Service ID
const EMAILJS_TEMPLATE_ID = 'template_xyz789';   // Your Template ID  
const EMAILJS_PUBLIC_KEY = 'abcdefghijklmnop';   // Your Public Key
const BUSINESS_EMAIL = 'your-email@gmail.com';   // Your Gmail
```

### Step 6: Test
1. Run: `npm run dev`
2. Fill out contact form
3. Check your Gmail inbox!

## ✅ What You'll Receive
Every form submission sends an email to your Gmail with:
- Customer's name and contact info
- Service they're interested in
- Their message
- Easy reply-to functionality

## 🔧 Troubleshooting
- **No emails?** Check spam folder
- **Errors?** Check browser console (F12)
- **Need help?** Check EmailJS dashboard logs

**Free Plan**: 200 emails/month (perfect for most beauty parlours!)