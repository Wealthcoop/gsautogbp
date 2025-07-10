
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Users, Shield, AlertTriangle, CreditCard, Scale } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | Gold Standard GBP',
  description: 'Terms and conditions for using Gold Standard GBP service.',
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FileText className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-muted-foreground">
            Please read these terms carefully before using our service.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Agreement to Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                By accessing and using Gold Standard GBP ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not use our service.
              </p>
              
              <div>
                <h3 className="font-semibold mb-2">Eligibility</h3>
                <p className="text-muted-foreground">
                  You must be at least 18 years old and have the legal capacity to enter into these Terms. You must also own or have authorized access to the Google Business Profile you intend to manage.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Service Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">What We Provide</h3>
                <p className="text-muted-foreground">
                  Gold Standard GBP is a service that helps you manage your Google Business Profile by creating, scheduling, and publishing posts. Our service includes:
                </p>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>• Google Business Profile post creation and management</li>
                  <li>• AI-powered content generation and image creation</li>
                  <li>• Post scheduling and automation</li>
                  <li>• Analytics and performance tracking</li>
                  <li>• Customer support</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Service Limitations</h3>
                <p className="text-muted-foreground">
                  Our service is subject to Google's APIs and policies. We cannot guarantee 100% uptime or that all features will work perfectly at all times. We are not responsible for changes to Google's policies or services that may affect functionality.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Account Security</h3>
                <p className="text-muted-foreground">
                  You are responsible for maintaining the security of your Google account and for all activities that occur under your account. You must immediately notify us of any unauthorized use.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Content Responsibility</h3>
                <p className="text-muted-foreground">
                  You are solely responsible for the content you create and publish through our service. You must ensure that your content:
                </p>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>• Complies with all applicable laws and regulations</li>
                  <li>• Adheres to Google's content policies</li>
                  <li>• Does not infringe on third-party rights</li>
                  <li>• Is accurate and not misleading</li>
                  <li>• Does not contain harmful, offensive, or inappropriate material</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Prohibited Uses</h3>
                <p className="text-muted-foreground">
                  You may not use our service to:
                </p>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>• Publish false, misleading, or fraudulent content</li>
                  <li>• Spam or send unsolicited messages</li>
                  <li>• Violate any laws or regulations</li>
                  <li>• Infringe on intellectual property rights</li>
                  <li>• Engage in any malicious or harmful activities</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment & Subscription
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Free Plan</h3>
                <p className="text-muted-foreground">
                  Our free plan provides limited functionality with usage restrictions. Free plan users can create a limited number of posts per month.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Paid Plans</h3>
                <p className="text-muted-foreground">
                  Paid plans provide unlimited access to all features. Subscription fees are charged monthly or annually as selected. All payments are processed securely through our payment providers.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Refunds</h3>
                <p className="text-muted-foreground">
                  Refunds are available within 30 days of purchase for annual subscriptions. Monthly subscriptions are non-refundable. Refunds will be processed to the original payment method.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Disclaimers & Limitations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Service Availability</h3>
                <p className="text-muted-foreground">
                  We strive to provide reliable service but cannot guarantee 100% uptime. We may temporarily suspend service for maintenance, updates, or due to circumstances beyond our control.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Third-Party Dependencies</h3>
                <p className="text-muted-foreground">
                  Our service depends on Google's APIs and services. We are not responsible for changes, outages, or issues with third-party services that may affect our functionality.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Limitation of Liability</h3>
                <p className="text-muted-foreground">
                  To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Termination
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Termination by You</h3>
                <p className="text-muted-foreground">
                  You may terminate your account at any time by contacting us or using the account deletion feature. Upon termination, your access to the service will be immediately revoked.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Termination by Us</h3>
                <p className="text-muted-foreground">
                  We may terminate or suspend your account immediately, without prior notice, if you breach these Terms or for any other reason at our sole discretion.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Effect of Termination</h3>
                <p className="text-muted-foreground">
                  Upon termination, your data will be deleted within 30 days unless legally required to retain it. You will lose access to all features and any scheduled posts will be cancelled.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the updated Terms on our website and updating the "Last updated" date. Your continued use of the service after any changes constitutes acceptance of the new Terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <p>Email: legal@goldstandardgbp.com</p>
                <p>Address: [Your Business Address]</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
