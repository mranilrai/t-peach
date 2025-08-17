# EmailJS Setup Guide

Follow these steps to enable email sending from your contact form:

## 1. Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Add Email Service

1. Go to **Email Services** in your EmailJS dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Note down your **Service ID**

## 3. Create Email Template

1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template content:

```
Subject: New Contact Form Submission - {{service}}

Hello,

You have received a new contact form submission from your beauty parlour website:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Service Interested: {{service}}

Message:
{{message}}

Please respond to this inquiry as soon as possible.

Best regards,
Website Contact Form
```

4. Save the template and note down your **Template ID**

## 4. Get Public Key

1. Go to **Account** → **General**
2. Find your **Public Key**
3. Copy it

## 5. Update Your Website

Open `main.js` and replace these values:

```javascript
const EMAILJS_SERVICE_ID = 'your_service_id_here';
const EMAILJS_TEMPLATE_ID = 'your_template_id_here';
const EMAILJS_PUBLIC_KEY = 'your_public_key_here';
```

## 6. Test Your Form

1. Run your website: `npm run dev`
2. Fill out the contact form
3. Check your email for the submission

## Alternative Email Template Variables

You can customize the template with these variables:
- `{{from_name}}` - Customer's name
- `{{from_email}}` - Customer's email
- `{{phone}}` - Customer's phone
- `{{service}}` - Selected service
- `{{message}}` - Customer's message
- `{{to_email}}` - Your business email (set in the code)

## Free Plan Limits

EmailJS free plan includes:
- 200 emails per month
- 2 email services
- 1 email template
- Basic support

For higher volume, consider upgrading to a paid plan.

## Troubleshooting

**Form not sending emails?**
1. Check browser console for errors
2. Verify all IDs are correct
3. Make sure email service is properly configured
4. Check EmailJS dashboard for failed sends

**Emails going to spam?**
1. Add your domain to EmailJS whitelist
2. Use a professional email address
3. Configure SPF/DKIM records (advanced)

## Security Note

The public key is safe to expose in frontend code - it's designed for client-side use. However, consider implementing rate limiting on EmailJS dashboard to prevent abuse.