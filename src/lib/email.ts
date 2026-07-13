import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

interface EmailParams {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: EmailParams) {
  try {
    await sgMail.send({
      to,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''),
    })
    return { success: true }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}

export function bookingConfirmationEmail(data: {
  name: string
  bookingReference: string
  packageName: string
  date: string
  time: string
  participants: number
  total: string
  deposit: string
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1A202C; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1A365D, #D69E2E); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .header h1 { color: white; margin: 0; font-size: 24px; }
        .content { background: #FFFFFF; padding: 30px; border: 1px solid #E2E8F0; }
        .booking-ref { background: #F7FAFC; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0; }
        .booking-ref strong { color: #1A365D; font-size: 18px; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #E2E8F0; }
        .cta-button { display: inline-block; background: linear-gradient(135deg, #1A365D, #D69E2E); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #718096; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🐺 The Husky Experience</h1>
        </div>
        <div class="content">
          <h2>Booking Confirmed!</h2>
          <p>Hi ${data.name},</p>
          <p>Your booking has been confirmed. We can't wait to meet you and capture some magical moments with our pack!</p>
          
          <div class="booking-ref">
            <p>Booking Reference</p>
            <strong>${data.bookingReference}</strong>
          </div>

          <div class="detail-row"><span>Package</span><strong>${data.packageName}</strong></div>
          <div class="detail-row"><span>Date</span><strong>${data.date}</strong></div>
          <div class="detail-row"><span>Time</span><strong>${data.time}</strong></div>
          <div class="detail-row"><span>Participants</span><strong>${data.participants}</strong></div>
          <div class="detail-row"><span>Total</span><strong>${data.total}</strong></div>
          <div class="detail-row"><span>Deposit Paid</span><strong>${data.deposit}</strong></div>

          <p style="margin-top: 20px;"><strong>What to bring:</strong></p>
          <ul>
            <li>Comfortable clothing (we're outdoors!)</li>
            <li>Weather-appropriate layers</li>
            <li>Any personal items you'd like in photos</li>
            <li>Your smile and love for dogs!</li>
          </ul>

          <div style="text-align: center;">
            <a href="${process.env.NEXTAUTH_URL}/booking/manage/${data.bookingReference}" class="cta-button">Manage Your Booking</a>
          </div>
        </div>
        <div class="footer">
          <p>The Husky Experience | Creating Lifelong Memories</p>
          <p>If you have questions, reply to this email or call us.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export function welcomeEmail(name: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1A202C; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1A365D, #D69E2E); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .header h1 { color: white; margin: 0; font-size: 24px; }
        .content { background: #FFFFFF; padding: 30px; border: 1px solid #E2E8F0; }
        .cta-button { display: inline-block; background: linear-gradient(135deg, #1A365D, #D69E2E); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #718096; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to The Pack! 🐺</h1>
        </div>
        <div class="content">
          <h2>Hello ${name}!</h2>
          <p>Welcome to The Husky Experience family! We're thrilled to have you join our pack of dog lovers.</p>
          <p>Get ready for unforgettable moments with our 14 beautiful Siberian Huskies. Whether you're here for professional photos or just to meet our furry friends, we promise an experience you'll never forget.</p>
          <div style="text-align: center;">
            <a href="${process.env.NEXTAUTH_URL}/services" class="cta-button">Explore Our Packages</a>
          </div>
          <p style="margin-top: 20px;">Stay tuned for:</p>
          <ul>
            <li> exclusive offers and discounts</li>
            <li>New photos and updates from the pack</li>
            <li>Tips for your upcoming sessions</li>
          </ul>
        </div>
        <div class="footer">
          <p>The Husky Experience | Creating Lifelong Memories</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export function newsletterEmail(name: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1A202C; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1A365D, #D69E2E); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .header h1 { color: white; margin: 0; font-size: 24px; }
        .content { background: #FFFFFF; padding: 30px; border: 1px solid #E2E8F0; }
        .footer { text-align: center; padding: 20px; color: #718096; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>The Husky Experience Newsletter</h1>
        </div>
        <div class="content">
          <h2>Welcome to our pack, ${name}!</h2>
          <p>You're now subscribed to receive the latest updates from The Husky Experience.</p>
          <p>Expect monthly updates with:</p>
          <ul>
            <li>New photos from our sessions</li>
            <li>Special offers and packages</li>
            <li>Behind-the-scenes content</li>
            <li>Husky care tips and fun facts</li>
          </ul>
          <p>Follow us on social media for daily updates!</p>
        </div>
        <div class="footer">
          <p>You received this email because you subscribed to our newsletter.</p>
          <p><a href="${process.env.NEXTAUTH_URL}/unsubscribe?email=${encodeURIComponent('')}">Unsubscribe</a></p>
        </div>
      </div>
    </body>
    </html>
  `
}
