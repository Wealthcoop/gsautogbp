
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Eye, Lock, Database, User, Globe } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Gold Standard GBP',
  description: 'Our commitment to protecting your privacy and data.',
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Shield className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Google Account Information</h3>
                <p className="text-muted-foreground">
                  When you sign in with Google, we collect basic profile information including your name, email address, and profile picture. This information is used to create and manage your account.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Google Business Profile Data</h3>
                <p className="text-muted-foreground">
                  We access your Google Business Profile information to help you manage and publish posts. This includes business details, location information, and posting capabilities.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Usage Data</h3>
                <p className="text-muted-foreground">
                  We collect information about how you use our service, including post creation, scheduling activities, and feature usage to improve our service and provide analytics.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-muted-foreground">
                <li>• Provide and maintain our Google Business Profile management service</li>
                <li>• Create and manage posts on your Google Business Profile</li>
                <li>• Generate AI-powered content and images for your posts</li>
                <li>• Provide customer support and respond to your requests</li>
                <li>• Send important service updates and notifications</li>
                <li>• Analyze usage patterns to improve our service</li>
                <li>• Ensure security and prevent fraud</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Data Protection & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Security Measures</h3>
                <p className="text-muted-foreground">
                  We implement industry-standard security measures to protect your data, including encryption, secure authentication, and regular security audits.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Data Storage</h3>
                <p className="text-muted-foreground">
                  Your data is stored securely in encrypted databases. We use reputable cloud providers with strong security practices and compliance certifications.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Access Controls</h3>
                <p className="text-muted-foreground">
                  Access to your data is strictly limited to authorized personnel who need it to provide our service. All access is logged and monitored.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Data Sharing & Third Parties
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Google Services</h3>
                <p className="text-muted-foreground">
                  We share data with Google services as necessary to provide our functionality, including posting to your Google Business Profile and using Google authentication.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Service Providers</h3>
                <p className="text-muted-foreground">
                  We may share data with trusted service providers who help us operate our service, such as cloud hosting providers and analytics services. These providers are bound by strict confidentiality agreements.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Legal Requirements</h3>
                <p className="text-muted-foreground">
                  We may disclose your information if required by law or to protect our rights, your safety, or the safety of others.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Your Rights & Choices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Data Access & Portability</h3>
                <p className="text-muted-foreground">
                  You can request access to your personal data and receive a copy in a structured, machine-readable format.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Data Correction</h3>
                <p className="text-muted-foreground">
                  You can update your profile information directly through your account settings or by contacting us.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Data Deletion</h3>
                <p className="text-muted-foreground">
                  You can request deletion of your account and associated data. Note that some data may be retained for legal or security purposes.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Withdraw Consent</h3>
                <p className="text-muted-foreground">
                  You can withdraw your consent for data processing at any time by disconnecting your Google account or deleting your account.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <p>Email: privacy@goldstandardgbp.com</p>
                <p>Address: [Your Business Address]</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Updates to This Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of our service after any changes constitutes acceptance of the new policy.
              </p>
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
