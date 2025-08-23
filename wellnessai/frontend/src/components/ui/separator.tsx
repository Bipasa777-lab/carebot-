import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import Separator  from "../../components/ui/separator";
import { Button } from "../../components/ui/button";
import { 
  User, 
  Settings, 
  Bell, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Star,
  Heart,
  Share2
} from "lucide-react";

export const SeparatorPage = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-800">Separator Components</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore different ways to use separators to organize and structure your content
          </p>
        </div>

        {/* Basic Separators */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Basic Separators
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-3">Horizontal Separator</h3>
              <div className="space-y-4">
                <p className="text-slate-600">Content above the separator</p>
                <Separator />
                <p className="text-slate-600">Content below the separator</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-3">Vertical Separator</h3>
              <div className="flex items-center gap-4 h-12">
                <span className="text-slate-600">Left content</span>
                <Separator orientation="vertical" />
                <span className="text-slate-600">Right content</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Menu */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Navigation Menu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <nav className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Profile
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notifications
              </Button>
            </nav>
          </CardContent>
        </Card>

        {/* Contact Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-slate-500" />
              <span className="text-slate-700">john.doe@example.com</span>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-slate-500" />
              <span className="text-slate-700">+1 (555) 123-4567</span>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-slate-500" />
              <span className="text-slate-700">123 Main St, City, State 12345</span>
            </div>
          </CardContent>
        </Card>

        {/* Article Layout */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              Article Layout
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <article className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">
                The Future of Web Development
              </h2>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span>By Jane Smith</span>
                <Separator orientation="vertical" className="h-4" />
                <span>March 15, 2024</span>
                <Separator orientation="vertical" className="h-4" />
                <span>5 min read</span>
              </div>
              <Separator />
              <p className="text-slate-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                quis nostrud exercitation ullamco laboris.
              </p>
              <Separator className="my-6" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Like
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </article>
          </CardContent>
        </Card>

        {/* Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Main Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  This is the main content area. Separators help create clear visual 
                  boundaries between different sections and improve readability.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Button>
                <Separator />
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Separator />
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Preferences
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Custom Styled Separators */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              Custom Styled Separators
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-3">Thick Separator</h3>
              <Separator className="h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-3">Dashed Separator</h3>
              <Separator className="border-dashed border-t-2 border-slate-300 bg-transparent h-0" />
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-3">Dotted Separator</h3>
              <Separator className="border-dotted border-t-2 border-slate-400 bg-transparent h-0" />
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-3">Gradient Separator</h3>
              <div className="relative">
                <Separator className="bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8">
          <Separator className="mb-6" />
          <p className="text-slate-500">
            Separators help create visual hierarchy and improve content organization
          </p>
        </div>
      </div>
    </div>
  );
};