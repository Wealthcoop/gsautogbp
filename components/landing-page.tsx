
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Zap, 
  Image, 
  Shield, 
  Star, 
  CheckCircle, 
  ArrowRight,
  BarChart3,
  Clock,
  Users
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false)

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: 'AI-Powered Content',
      description: 'Generate engaging posts and images with advanced AI technology tailored for your business.'
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: 'Smart Scheduling',
      description: 'Schedule posts up to 1 year in advance with intelligent timing recommendations.'
    },
    {
      icon: <Image className="h-8 w-8 text-primary" />,
      title: 'Professional Images',
      description: 'Create stunning visuals with AI image generation or upload your own branded content.'
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: 'Analytics Dashboard',
      description: 'Track your posting performance with detailed analytics and insights.'
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: 'White-Label Ready',
      description: 'Perfect for agencies looking to offer GBP automation as a service to clients.'
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: 'Time-Saving Automation',
      description: 'Reduce manual posting time by 90% with our intelligent automation tools.'
    }
  ]

  const pricingTiers = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for small businesses getting started',
      features: [
        '5 posts per month',
        'Basic scheduling',
        'AI image generation',
        'Standard templates',
        'Email support'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      name: 'Unlimited',
      price: '$29',
      period: 'per month',
      description: 'For growing businesses and agencies',
      features: [
        'Unlimited posts',
        'Advanced scheduling',
        'AI image generation',
        'Custom templates',
        'Priority support',
        'Analytics dashboard',
        'White-label options'
      ],
      cta: 'Start Free Trial',
      popular: true
    }
  ]

  const stats = [
    { icon: <Users className="h-6 w-6 text-primary" />, value: '10,000+', label: 'Happy Businesses' },
    { icon: <Calendar className="h-6 w-6 text-primary" />, value: '1M+', label: 'Posts Scheduled' },
    { icon: <Clock className="h-6 w-6 text-primary" />, value: '90%', label: 'Time Saved' },
    { icon: <Star className="h-6 w-6 text-primary" />, value: '4.9/5', label: 'Customer Rating' }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
          <div className="flex items-center space-x-2">
            <Star className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold gold-text">Gold Standard</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
              Login
            </Link>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              The <span className="gold-text">Gold Standard</span> in<br />
              Google Business Profile Automation
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create, schedule, and manage your Google Business Profile posts with AI-powered tools. 
              Perfect for businesses and agencies looking to maximize their online presence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 gold-shadow"
                asChild
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Link href="/signup">
                  Get Started for Free
                  <ArrowRight className={`ml-2 h-5 w-5 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-2">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive suite of tools helps you create engaging content, 
              schedule posts strategically, and manage your online presence effortlessly.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow card-shadow">
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose the plan that works best for your business needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className={`h-full ${tier.popular ? 'border-primary gold-shadow' : ''} hover:shadow-lg transition-shadow`}>
                  <CardHeader>
                    {tier.popular && (
                      <div className="text-center mb-4">
                        <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <CardTitle className="text-2xl text-center">{tier.name}</CardTitle>
                    <div className="text-center">
                      <span className="text-4xl font-bold text-primary">{tier.price}</span>
                      <span className="text-muted-foreground">/{tier.period}</span>
                    </div>
                    <CardDescription className="text-center mt-2">
                      {tier.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${tier.popular ? 'gold-shadow' : ''}`}
                      variant={tier.popular ? 'default' : 'outline'}
                      asChild
                    >
                      <Link href="/signup">{tier.cta}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Business Presence?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of businesses already using Gold Standard to automate their Google Business Profile.
            </p>
            <Button size="lg" className="text-lg px-8 py-6 gold-shadow" asChild>
              <Link href="/signup">
                Start Your Free Trial Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Star className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold gold-text">Gold Standard</span>
            </div>
            <p className="text-muted-foreground mb-6">
              The gold standard in Google Business Profile automation.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-primary transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
