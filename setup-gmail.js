// Gmail Setup Helper for T'peach Artistry
// Run this after completing EmailJS setup

function updateEmailJSConfig() {
    console.log('🚀 T\'peach Artistry Gmail Setup Helper');
    console.log('=====================================');
    console.log('');
    console.log('Follow these steps to connect your Gmail:');
    console.log('');
    console.log('1. Go to https://emailjs.com and create account');
    console.log('2. Add Gmail service and get Service ID');
    console.log('3. Create email template and get Template ID');
    console.log('4. Get your Public Key from Account settings');
    console.log('5. Update main.js with your credentials');
    console.log('');
    console.log('📧 Email Template for Gmail:');
    console.log('Subject: New T\'peach Artistry Contact - {{service}}');
    console.log('');
    console.log('Body:');
    console.log('Hello,');
    console.log('');
    console.log('New contact form submission from T\'peach Artistry website:');
    console.log('');
    console.log('👤 Customer: {{from_name}}');
    console.log('📧 Email: {{from_email}}');
    console.log('📱 Phone: {{phone}}');
    console.log('💄 Service: {{service}}');
    console.log('');
    console.log('💬 Message:');
    console.log('{{message}}');
    console.log('');
    console.log('Reply directly to: {{from_email}}');
    console.log('');
    console.log('Best regards,');
    console.log('T\'peach Artistry Website');
}

// Test EmailJS connection
function testEmailJS() {
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS not loaded. Check internet connection.');
        return false;
    }
    
    console.log('✅ EmailJS loaded successfully');
    return true;
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { updateEmailJSConfig, testEmailJS };
} else {
    window.setupGmail = { updateEmailJSConfig, testEmailJS };
}

// Auto-run setup helper
updateEmailJSConfig();