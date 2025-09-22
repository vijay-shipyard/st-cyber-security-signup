"use client"

import { motion } from "framer-motion"
import { CreditCard, Github, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  const footerSections = [
    {
      title: "Products",
      links: ["Payments", "Billing", "Connect", "Cyber Protection", "Terminal", "Radar"],
    },
    {
      title: "Developers",
      links: ["Documentation", "API Reference", "Guides", "Support", "Status", "GitHub"],
    },
    {
      title: "Company",
      links: ["About", "Customers", "Partners", "Jobs", "Newsroom", "Privacy"],
    },
    {
      title: "Resources",
      links: ["Support Center", "Blog", "Newsletter", "Events", "Contact", "Sitemap"],
    },
  ]

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">SecurePay</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-md">
              Financial infrastructure for the internet. Millions of companies use SecurePay to accept payments, grow
              their revenue, and accelerate new business opportunities.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-slate-400 text-sm">© 2024 SecurePay, Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
              Cookies
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
