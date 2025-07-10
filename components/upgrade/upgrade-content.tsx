
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Star, 
  CheckCircle, 
  Zap, 
  Calendar, 
  BarChart3, 
  Shield,
  CreditCard,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function UpgradeContent() {
  const [isHovered, setIsHovered] = useState(false)

  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: 'Unlimited Posts',
      description: 'Create and schedule as many posts as you need without any monthly limits.'
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      title: 'Advanced Scheduling',
      description: 'Schedule posts up to 1 year in advance with intelligent timing recommendations.'
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: 'Analytics Dashboard',
      description: 'Access detailed analytics and insights about your posting performance.'
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: 'Priority Support',
      description: 'Get priority customer support and faster response times.'
    },
    {
      icon: <Star className="h-5 w-5" />,
      title: 'White-Label Options',
      description: 'Perfect for agencies - customize the interface with your own branding.'
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      title: 'Custom Templates',
      description: 'Access to premium post templates and design options.'
    }
  ]

  const pricingComparison = [
    {
      feature: 'Monthly Posts',
      free: '5 posts',
      unlimited: 'Unlimited'
    },
    {
      feature: 'AI Image Generation',
      free: '✓',
      unlimited: '✓'
    },
    {
      feature: 'Basic Scheduling',
      free: '✓',
      unlimited: '✓'
    },
    {
      feature: 'Advanced Scheduling',
      free: '✗',
      unlimited: '✓'
    },
    {
      feature: 'Analytics Dashboard',
      free: '✗',
      unlimited: '✓'
    },
    {
      feature: 'Priority Support',
      free: '✗',
      unlimited: '✓'
    },
    {
      feature: 'White-Label Options',
      free: '✗',
      unlimited: '✓'
    },
    {
      feature: 'Custom Templates',
      free: '✗',
      unlimited: '✓'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Upgrade to <span className="gold-text">Unlimited</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock the full potential of your Google Business Profile automation with our unlimited plan.
          </p>
        </div>
      </motion.div>

      {/* Pricing Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">Free Plan</CardTitle>
              <div className="text-center">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <CardDescription>Perfect for getting started</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-sm">5 posts per month</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-sm">Basic scheduling</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-sm">AI image generation</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-sm">Email support</span>
                </li>
              </ul>
              <Badge variant="outline" className="w-full text-center">
                Current Plan
              </Badge>
            </CardContent>
          </Card>

          {/* Unlimited Plan */}
          <Card className="card-shadow border-primary/50 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <div className="text-center mb-4">
                <Badge className="bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              </div>
              <CardTitle className="text-2xl">Unlimited Plan</CardTitle>
              <div className="text-center">
                <span className="text-4xl font-bold text-primary">$29</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <CardDescription>For growing businesses and agencies</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  <span className="text-sm">Unlimited posts</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  <span className="text-sm">Advanced scheduling</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  <span className="text-sm">Analytics dashboard</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  <span className="text-sm">Priority support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  <span className="text-sm">White-label options</span>
                </li>
              </ul>
              <Button 
                className="w-full gold-shadow text-lg py-6"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Upgrade Now
                <ArrowRight className={`ml-2 h-5 w-5 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Everything You Get with Unlimited
            </CardTitle>
            <CardDescription className="text-center">
              Unlock all premium features and take your business to the next level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Plan Comparison
            </CardTitle>
            <CardDescription className="text-center">
              See what's included in each plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4">Feature</th>
                    <th className="text-center py-4 px-4">Free</th>
                    <th className="text-center py-4 px-4">Unlimited</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingComparison.map((row, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-4 px-4 font-medium">{row.feature}</td>
                      <td className="py-4 px-4 text-center">{row.free}</td>
                      <td className="py-4 px-4 text-center text-primary font-semibold">
                        {row.unlimited}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="card-shadow bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="py-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Go Unlimited?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of businesses that have upgraded to unlimited and transformed their online presence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-6 gold-shadow">
                  Upgrade to Unlimited
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                  <Link href="/dashboard">Back to Dashboard</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
