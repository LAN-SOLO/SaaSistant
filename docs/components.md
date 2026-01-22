# Components

Reference for all React components in SaaSistent.

## UI Components (shadcn/ui)

Located in `components/ui/`. These are base components from shadcn/ui.

### Button

```tsx
import { Button } from "@/components/ui/button"

// Variants
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>

// As child (for links)
<Button asChild>
  <Link href="/path">Link Button</Link>
</Button>

// Loading state
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Loading
</Button>
```

### Card

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Input & Label

```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    placeholder="you@example.com"
    value={value}
    onChange={(e) => setValue(e.target.value)}
  />
</div>
```

### Textarea

```tsx
import { Textarea } from "@/components/ui/textarea"

<Textarea
  placeholder="Enter description..."
  rows={4}
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

### Select

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

### Checkbox

```tsx
import { Checkbox } from "@/components/ui/checkbox"

<div className="flex items-center space-x-2">
  <Checkbox
    id="terms"
    checked={checked}
    onCheckedChange={setChecked}
  />
  <label htmlFor="terms">Accept terms</label>
</div>
```

### Dialog

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description</DialogDescription>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

### Sheet (Side Panel)

```tsx
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon">
      <Menu className="h-5 w-5" />
    </Button>
  </SheetTrigger>
  <SheetContent side="left">
    {/* Sidebar content */}
  </SheetContent>
</Sheet>
```

### Tabs

```tsx
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

### Badge

```tsx
import { Badge } from "@/components/ui/badge"

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Outline</Badge>
```

### Progress

```tsx
import { Progress } from "@/components/ui/progress"

<Progress value={66} className="h-2" />
```

### Avatar

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

<Avatar>
  <AvatarImage src="/avatar.png" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

### DropdownMenu

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost">Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive">
      Logout
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

## Landing Components

Located in `components/landing/`.

### Header

Navigation header with responsive mobile menu.

```tsx
import { Header } from "@/components/landing/header"

<Header />
```

**Features:**
- Logo with link to home
- Desktop navigation links
- Auth buttons (Login, Get Started)
- Mobile hamburger menu with Sheet

### Hero

Hero section with headline, CTA, and preview.

```tsx
import { Hero } from "@/components/landing/hero"

<Hero />
```

**Features:**
- Badge with "Powered by Claude AI"
- Gradient headline
- Subheadline
- CTA buttons
- Terminal-style preview

### Features

Feature grid with icons and descriptions.

```tsx
import { Features } from "@/components/landing/features"

<Features />
```

**Features:**
- 6 feature cards in responsive grid
- Icons from lucide-react
- Background styling

### Pricing

Pricing tiers with feature comparison.

```tsx
import { Pricing } from "@/components/landing/pricing"

<Pricing />
```

**Features:**
- 3 pricing tiers (Free, Pro, Enterprise)
- Highlighted "Most Popular" tier
- Feature lists with checkmarks
- CTA buttons

### Footer

Site footer with links and social icons.

```tsx
import { Footer } from "@/components/landing/footer"

<Footer />
```

**Features:**
- Brand column with logo and description
- Link columns (Product, Company, Legal)
- Social icons
- Copyright

---

## Auth Components

Located in `components/auth/`.

### LoginForm

```tsx
import { LoginForm } from "@/components/auth/login-form"

<LoginForm />
```

**Features:**
- Email/password inputs
- Error display
- Loading state
- Links to signup and password reset
- Redirect handling

### SignupForm

```tsx
import { SignupForm } from "@/components/auth/signup-form"

<SignupForm />
```

**Features:**
- Email/password inputs with confirmation
- Password validation
- Success state with email confirmation message
- Link to login

### ResetPasswordForm

```tsx
import { ResetPasswordForm } from "@/components/auth/reset-password-form"

<ResetPasswordForm />
```

**Features:**
- Email input
- Success state
- Back to login link

### UpdatePasswordForm

```tsx
import { UpdatePasswordForm } from "@/components/auth/update-password-form"

<UpdatePasswordForm />
```

**Features:**
- New password with confirmation
- Password validation
- Redirect to dashboard on success

---

## Dashboard Components

Located in `components/dashboard/`.

### Sidebar

```tsx
import { Sidebar } from "@/components/dashboard/sidebar"

<Sidebar />
```

**Features:**
- Logo
- Navigation links with icons
- Active state highlighting
- Version footer

### DashboardHeader

```tsx
import { DashboardHeader } from "@/components/dashboard/header"

<DashboardHeader user={{ email, name, avatar_url }} />
```

**Features:**
- Mobile menu trigger
- Mobile logo
- User menu

### UserMenu

```tsx
import { UserMenu } from "@/components/dashboard/user-menu"

<UserMenu user={{ email, name, avatar_url }} />
```

**Features:**
- Avatar with dropdown
- User info display
- Settings link
- Sign out action

### ProjectCard

```tsx
import { ProjectCard } from "@/components/dashboard/project-card"

<ProjectCard project={{
  id: "uuid",
  name: "Project Name",
  description: "Description",
  status: "draft",
  framework: "nextjs",
  created_at: "2024-01-01",
  updated_at: "2024-01-02",
}} />
```

**Features:**
- Project info display
- Status badge
- Framework badge
- Relative time
- Dropdown menu (Open, Edit, Delete)

---

## Wizard Components

Located in `components/project-wizard/`.

### WizardContainer

Main wizard orchestrator.

```tsx
import { WizardContainer } from "@/components/project-wizard/wizard-container"

<WizardContainer />
```

**Features:**
- State management for all steps
- Progress bar
- Step indicators
- Navigation buttons
- Step rendering

### Step Components

All steps follow the same interface:

```tsx
interface StepProps {
  config: ProjectConfig
  updateConfig: (updates: Partial<ProjectConfig>) => void
}
```

| Component | Purpose |
|-----------|---------|
| `StepIdea` | Project name, description, AI expansion |
| `StepUx` | Component library selection |
| `StepPatterns` | Application type selection |
| `StepDesign` | Visual style selection |
| `StepFramework` | Frontend framework selection |
| `StepBackend` | Database, auth, storage selection |
| `StepAi` | AI provider and features |
| `StepReview` | Summary and output generation |

---

## Utilities

### cn() - Class Name Merger

```tsx
import { cn } from "@/lib/utils"

<div className={cn(
  "base-class",
  isActive && "active-class",
  isDisabled && "disabled-class",
  className
)} />
```

Combines `clsx` for conditional logic and `tailwind-merge` for deduplication.
