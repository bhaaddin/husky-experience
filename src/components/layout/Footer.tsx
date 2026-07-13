import Link from 'next/link'
import { Mail, Phone, MapPin, Globe, MessageCircle, Share2, Play } from 'lucide-react'

const footerLinks = {
  experience: [
    { name: 'Meet the Pack', href: '/about' },
    { name: 'Services & Pricing', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Book Now', href: '/booking' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' },
  ],
  support: [
    { name: 'FAQ', href: '/faq' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cancellation Policy', href: '/cancellation' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#1A365D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-[#D69E2E]/30 flex items-center justify-center">
                <span className="text-xl">🐺</span>
              </div>
              <span className="text-xl font-bold font-['Playfair_Display']">
                The Husky Experience
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Create lifelong memories with our pack of 14 beautiful Siberian Huskies. 
              Professional photography sessions for the ultimate dog lover.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D69E2E] transition-colors">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D69E2E] transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D69E2E] transition-colors">
                <Share2 className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D69E2E] transition-colors">
                <Play className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Experience</h3>
            <ul className="space-y-3">
              {footerLinks.experience.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-[#D69E2E] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-[#D69E2E] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-[#D69E2E] mt-0.5" />
                <div>
                  <p className="text-sm">(555) 123-4567</p>
                  <p className="text-xs text-gray-400">Mon-Sun 9am-6pm</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-[#D69E2E] mt-0.5" />
                <p className="text-sm">hello@thehuskyexperience.com</p>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#D69E2E] mt-0.5" />
                <p className="text-sm">123 Husky Lane<br />Arctic Valley, AK 99701</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} The Husky Experience. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerLinks.support.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
