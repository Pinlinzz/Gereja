import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Settings as SettingsIcon, Church, Users, Mail, Shield, Database, Globe } from 'lucide-react';

export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Settings</h1>
        <p className="text-muted-foreground">
          Manage church information and system preferences
        </p>
      </div>

      {/* Church Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Church className="h-5 w-5" />
            Church Information
          </CardTitle>
          <CardDescription>
            Basic information about your church
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="church-name">Church Name</Label>
              <Input id="church-name" defaultValue="Gereja Damai Kristus" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pastor-name">Pastor Name</Label>
              <Input id="pastor-name" defaultValue="Rev. Michael Johnson" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" defaultValue="123 Main Street, Anytown, ST 12345" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue="(555) 123-4567" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="info@geredamaikristus.org" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input id="website" defaultValue="https://geredamaikristus.org" />
          </div>
          
          <Button>Save Church Information</Button>
        </CardContent>
      </Card>

      {/* User Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            User Management
          </CardTitle>
          <CardDescription>
            Manage system users and permissions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="admin-name">Admin Name</Label>
              <Input id="admin-name" defaultValue="John Administrator" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-email">Admin Email</Label>
              <Input id="admin-email" type="email" defaultValue="admin@geredamaikristus.org" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="user-role">Default User Role</Label>
            <Select defaultValue="member">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="staff">Staff Member</SelectItem>
                <SelectItem value="volunteer">Volunteer</SelectItem>
                <SelectItem value="member">Member</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button>Update User Settings</Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Notification Settings
          </CardTitle>
          <CardDescription>
            Configure email and notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive email notifications for system events
              </p>
            </div>
            <Switch id="email-notifications" defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="member-notifications">New Member Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when new members join
              </p>
            </div>
            <Switch id="member-notifications" defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="donation-notifications">Donation Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get notified about new donations
              </p>
            </div>
            <Switch id="donation-notifications" defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="event-notifications">Event Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get notified about upcoming events
              </p>
            </div>
            <Switch id="event-notifications" defaultChecked />
          </div>
          
          <Button>Save Notification Settings</Button>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            System Settings
          </CardTitle>
          <CardDescription>
            General system configuration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timezone">Time Zone</Label>
              <Select defaultValue="est">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="est">Eastern Standard Time</SelectItem>
                  <SelectItem value="cst">Central Standard Time</SelectItem>
                  <SelectItem value="mst">Mountain Standard Time</SelectItem>
                  <SelectItem value="pst">Pacific Standard Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-format">Date Format</Label>
              <Select defaultValue="mdy">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-backup">Automatic Backup</Label>
              <p className="text-sm text-muted-foreground">
                Automatically backup data daily
              </p>
            </div>
            <Switch id="auto-backup" defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="member-portal">Member Portal</Label>
              <p className="text-sm text-muted-foreground">
                Allow members to access their information online
              </p>
            </div>
            <Switch id="member-portal" defaultChecked />
          </div>
          
          <Button>Save System Settings</Button>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Management
          </CardTitle>
          <CardDescription>
            Backup and restore system data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Database Backup</h4>
              <p className="text-sm text-muted-foreground">
                Last backup: January 26, 2025 at 2:00 AM
              </p>
            </div>
            <Button variant="outline">Create Backup</Button>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Data Export</h4>
              <p className="text-sm text-muted-foreground">
                Export member and donation data
              </p>
            </div>
            <Button variant="outline">Export Data</Button>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">System Reset</h4>
              <p className="text-sm text-muted-foreground">
                Reset all system settings to default
              </p>
            </div>
            <Button variant="destructive">Reset System</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}