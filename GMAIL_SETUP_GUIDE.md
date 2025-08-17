# Gmail Setup Guide for T'peach Artistry Contact Form

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Gmail Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Select **Gmail**
4. Click **Connect Account**
5. Sign in with your Gmail account
6. Allow EmailJS permissions
7. Your **Service ID** will be generated (save this!)

## Step 3: Create Email Template

1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template:

**Subject:** New Contact - {{service}} Inquiry from {{from_name}}

**Content:**
```
Hello T'peach Artistry,

You have a new contact form submission:

Customer Details:
- Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{phone}}
- Service: {{service}}

Message:
{{message}}

Reply to: {{from_email}}
```

4. Save and note your **Template ID**

## Step 4: Get Public Key

1. Go to **Account** → **General**
2. Copy your **Public Key**

## Step 5: Update Your Website

Replace these values in `main.js`:
- EMAILJS_SERVICE_ID = 'your_gmail_service_id'
- EMAILJS_TEMPLATE_ID = 'your_template_id'  
- EMAILJS_PUBLIC_KEY = 'your_public_key'