# RagSites Client Portal

Comprehensive client dashboard for monitoring and managing AI services with real-time analytics.

## Features

- **Production-Grade Authentication**: JWT-based authentication with PostgreSQL
- **Secure Password Hashing**: BCrypt with configurable salt rounds
- **Session Management**: Token storage and validation with expiration
- **Responsive Navbar**: Dropdown menus with Dashboard and Settings options
- **Analytics Dashboard**: Real-time metrics, charts, and activity tracking
- **Settings Page**: Profile, notifications, security, and billing management
- **Modular Design**: Easy to add new features and metrics
- **Modern UI**: Animated components with gradient effects

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL 12+ installed and running
- Basic knowledge of Next.js and React

## Getting Started

### 1. Database Setup

**Option A: Local PostgreSQL**

```bash
# Install PostgreSQL (macOS)
brew install postgresql@16
brew services start postgresql@16

# Create database
createdb ragsites_client

# Create database user (optional)
createuser -P ragsites_user
```

**Option B: Using Docker**

```bash
docker run --name ragsites-postgres \
  -e POSTGRES_DB=ragsites_client \
  -e POSTGRES_USER=ragsites_user \
  -e POSTGRES_PASSWORD=your_password \
  -p 5432:5432 \
  -d postgres:16
```

**Option C: Cloud Database**

You can use managed PostgreSQL services like:
- [Neon](https://neon.tech) (Free tier available)
- [Supabase](https://supabase.com) (Free tier available)
- [Railway](https://railway.app)
- AWS RDS, Google Cloud SQL, or Azure Database

### 2. Project Setup

Navigate to the project directory:
```bash
cd ragsites-client
```

Install dependencies:
```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your database credentials:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/ragsites_client

# JWT Configuration (IMPORTANT: Change in production!)
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
JWT_EXPIRES_IN=7d

# Application Configuration
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Security Notes:**
- Generate a strong JWT secret: `openssl rand -base64 32`
- Never commit `.env.local` to version control
- Use different secrets for development and production
- Keep `DATABASE_URL` secure

### 4. Initialize Database

Run the initialization script to create all necessary tables:

```bash
npm run db:init
```

This creates:
- `users` table (user accounts)
- `sessions` table (JWT session tracking)
- `user_preferences` table (user settings)
- `services` table (AI services)
- `metrics` table (analytics data)
- `activity_logs` table (user activity)

### 5. Seed Database (Optional)

Create a demo user for testing:

```bash
npm run db:seed
```

Demo credentials:
- **Email**: `demo@ragsites.com`
- **Password**: `Demo@123456`

### 6. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Authentication

The application now uses production-grade JWT authentication with PostgreSQL.

**Password Requirements:**
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

**Registration:**
1. Navigate to `/auth/register`
2. Fill in name, email, and password
3. System creates account and issues JWT token
4. Automatically logged in and redirected to dashboard

**Login:**
1. Navigate to `/auth/signin`
2. Enter email and password
3. System verifies credentials
4. JWT token issued and stored securely
5. Redirected to dashboard

**Session Management:**
- Tokens expire after 7 days (configurable)
- Automatic token verification on page load
- Secure logout invalidates server-side session

### Navigation
- **Landing Page** (`/`): Public homepage
- **Sign In** (`/auth/signin`): Login page
- **Register** (`/auth/register`): Registration page
- **Dashboard** (`/dashboard`): Analytics dashboard (requires login)
- **Settings** (`/settings`): Account settings (requires login)

## Project Structure

```
ragsites-client/
├── app/
│   ├── api/                  # API routes
│   │   ├── auth/             # Authentication endpoints
│   │   │   ├── register/route.ts
│   │   │   ├── login/route.ts
│   │   │   ├── logout/route.ts
│   │   │   └── verify/route.ts
│   │   └── user/             # User management endpoints
│   │       ├── profile/route.ts
│   │       └── preferences/route.ts
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout with AuthProvider
│   ├── dashboard/
│   │   └── page.tsx          # Dashboard page
│   ├── settings/
│   │   └── page.tsx          # Settings page
│   └── auth/
│       ├── signin/
│       │   └── page.tsx      # Sign in page
│       └── register/
│           └── page.tsx      # Register page
├── components/
│   ├── Navbar.tsx            # Navigation component
│   ├── LayoutWrapper.tsx     # Conditional navbar wrapper
│   ├── MetricCard.tsx        # Reusable metric card
│   └── ChartCard.tsx         # Reusable chart wrapper
├── contexts/
│   └── AuthContext.tsx       # Authentication context (JWT-based)
├── lib/
│   ├── auth/                 # Authentication utilities
│   │   ├── jwt.ts            # JWT token generation/verification
│   │   ├── password.ts       # Password hashing/validation
│   │   └── middleware.ts     # Auth middleware for routes
│   └── db/                   # Database layer
│       ├── connection.ts     # PostgreSQL connection pool
│       ├── schema.sql        # Database schema
│       └── users.ts          # User database operations
├── scripts/
│   ├── init-db.ts            # Database initialization
│   ├── seed-db.ts            # Seed demo data
│   └── cleanup-sessions.ts  # Clean expired sessions
├── .env.example              # Environment variables template
└── package.json
```

## Database Schema

### Tables

**users**
- Stores user account information
- BCrypt hashed passwords
- Profile data (company, bio, avatar)

**sessions**
- JWT token tracking
- Session expiration management
- Token invalidation support

**user_preferences**
- Notification settings
- Email preferences
- User-specific configurations

**services**
- AI services per user
- Service configuration (JSONB)
- Status tracking

**metrics**
- Analytics data storage
- Service-specific metrics
- Time-series data

**activity_logs**
- User action tracking
- Audit trail
- Service interaction history

### Maintenance

**Clean up expired sessions:**
```bash
npm run db:cleanup
```

Recommended to run this as a cron job:
```bash
# Run daily at 2 AM
0 2 * * * cd /path/to/ragsites-client && npm run db:cleanup
```

## API Endpoints

### Authentication

```
POST   /api/auth/register     - Create new user account
POST   /api/auth/login        - Authenticate user
POST   /api/auth/logout       - Invalidate session
GET    /api/auth/verify       - Verify JWT token
```

### User Management

```
GET    /api/user/profile      - Get user profile
PUT    /api/user/profile      - Update user profile
GET    /api/user/preferences  - Get user preferences
PUT    /api/user/preferences  - Update preferences
```

All authenticated endpoints require `Authorization: Bearer <token>` header.

## Customization

### Adding New Metrics
1. Open `app/dashboard/page.tsx`
2. Add new metric to the metrics grid using the `MetricCard` component:
```tsx
<MetricCard
  title="Your Metric"
  value="123"
  change={5.5}
  changeLabel="vs last week"
  gradient="from-purple-500 to-blue-500"
  icon={/* your icon */}
/>
```

### Adding New Dashboard Sections
1. Import `ChartCard` component
2. Add new section in the dashboard page:
```tsx
<ChartCard title="New Section" description="Description">
  {/* Your content */}
</ChartCard>
```

### Adding New Menu Items
1. Open `components/Navbar.tsx`
2. Add new route in the dropdown menu navigation

### Adding New Pages
1. Create a new folder in `app/`
2. Add `page.tsx` file
3. Optionally add route to navbar dropdown

### Extending the Authentication System

The authentication system is already production-ready, but you can extend it:

**Add OAuth providers (Google, GitHub, etc.):**
```bash
npm install next-auth
```

**Add two-factor authentication:**
```bash
npm install speakeasy qrcode
```

**Add password reset functionality:**
- Create `/api/auth/forgot-password` endpoint
- Implement email sending with token
- Create password reset page

---

## Adding New Integrations & Services

This section provides detailed guides for extending the platform with new integrations and services.

### 1. Adding a New AI Service Page

Let's create a dedicated page for a specific AI service (e.g., "Chatbot AI").

**Step 1**: Create the service page structure
```bash
mkdir -p app/services/chatbot
touch app/services/chatbot/page.tsx
```

**Step 2**: Create the service page component
```tsx
// app/services/chatbot/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import MetricCard from '@/components/MetricCard';
import ChartCard from '@/components/ChartCard';

export default function ChatbotService() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push('/auth/signin');
  }, [isAuthenticated, router]);

  // Service-specific metrics
  const metrics = {
    totalConversations: 1234,
    avgResponseTime: 1.2,
    satisfactionRate: 96.5,
    activeUsers: 342
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Chatbot AI Service</h1>

        {/* Service Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Conversations"
            value={metrics.totalConversations}
            change={15.3}
            changeLabel="vs last month"
          />
          {/* Add more metrics */}
        </div>

        {/* Service-specific charts and data */}
      </div>
    </div>
  );
}
```

**Step 3**: Add service to navbar dropdown
```tsx
// components/Navbar.tsx
// Add inside the dropdown menu:
<Link
  href="/services/chatbot"
  onClick={() => setIsDropdownOpen(false)}
  className="block px-4 py-3 text-gray-300 hover:bg-purple-600/20 hover:text-white transition-colors duration-200"
>
  <div className="flex items-center space-x-2">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
    <span>Chatbot AI</span>
  </div>
</Link>
```

### 2. Creating a Data Integration Layer

For organized API management, create a services layer:

**Step 1**: Create API service structure
```bash
mkdir -p lib/api
touch lib/api/client.ts
touch lib/api/services.ts
touch lib/api/analytics.ts
```

**Step 2**: Set up API client
```tsx
// lib/api/client.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface RequestOptions extends RequestInit {
  token?: string;
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { token, ...fetchOptions } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

export const apiClient = {
  get: <T>(endpoint: string, token?: string) =>
    apiRequest<T>(endpoint, { method: 'GET', token }),

  post: <T>(endpoint: string, data: unknown, token?: string) =>
    apiRequest<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      token,
    }),

  put: <T>(endpoint: string, data: unknown, token?: string) =>
    apiRequest<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      token,
    }),

  delete: <T>(endpoint: string, token?: string) =>
    apiRequest<T>(endpoint, { method: 'DELETE', token }),
};
```

**Step 3**: Create service-specific API functions
```tsx
// lib/api/analytics.ts
import { apiClient } from './client';

export interface AnalyticsData {
  totalRequests: number;
  activeServices: number;
  avgResponseTime: number;
  successRate: number;
}

export interface ActivityData {
  day: string;
  requests: number;
}

export const analyticsAPI = {
  getMetrics: (token: string) =>
    apiClient.get<AnalyticsData>('/api/analytics/metrics', token),

  getActivity: (token: string, days: number = 7) =>
    apiClient.get<ActivityData[]>(`/api/analytics/activity?days=${days}`, token),

  getServiceUsage: (token: string) =>
    apiClient.get('/api/analytics/service-usage', token),
};
```

**Step 4**: Use API in dashboard
```tsx
// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { analyticsAPI } from '@/lib/api/analytics';

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        const data = await analyticsAPI.getMetrics(token);
        setMetrics(data);
      } catch (error) {
        console.error('Failed to fetch metrics:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Render dashboard...
}
```

### 3. Integrating React Query for Data Management

React Query provides powerful data fetching and caching.

**Step 1**: Install React Query
```bash
npm install @tanstack/react-query
```

**Step 2**: Set up Query Provider
```tsx
// app/layout.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
```

**Step 3**: Create custom hooks
```tsx
// lib/hooks/useAnalytics.ts
import { useQuery } from '@tanstack/react-query';
import { analyticsAPI } from '@/lib/api/analytics';

export function useMetrics(token: string | null) {
  return useQuery({
    queryKey: ['metrics'],
    queryFn: () => analyticsAPI.getMetrics(token!),
    enabled: !!token,
  });
}

export function useActivity(token: string | null, days: number = 7) {
  return useQuery({
    queryKey: ['activity', days],
    queryFn: () => analyticsAPI.getActivity(token!, days),
    enabled: !!token,
    refetchInterval: 60000, // Refetch every minute
  });
}
```

**Step 4**: Use in components
```tsx
// app/dashboard/page.tsx
import { useMetrics, useActivity } from '@/lib/hooks/useAnalytics';

export default function Dashboard() {
  const token = localStorage.getItem('authToken');
  const { data: metrics, isLoading } = useMetrics(token);
  const { data: activity } = useActivity(token);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <MetricCard
        title="Total Requests"
        value={metrics?.totalRequests}
        // ...
      />
    </div>
  );
}
```

### 4. Adding Third-Party Service Integrations

Example: Integrating Stripe for billing

**Step 1**: Install Stripe SDK
```bash
npm install @stripe/stripe-js
```

**Step 2**: Create Stripe context
```tsx
// contexts/StripeContext.tsx
'use client';

import { createContext, useContext } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

interface StripeContextType {
  stripe: Promise<Stripe | null>;
}

const StripeContext = createContext<StripeContextType>({ stripe: stripePromise });

export function StripeProvider({ children }: { children: React.ReactNode }) {
  return (
    <StripeContext.Provider value={{ stripe: stripePromise }}>
      {children}
    </StripeContext.Provider>
  );
}

export const useStripe = () => useContext(StripeContext);
```

**Step 3**: Use in billing page
```tsx
// app/settings/page.tsx (billing section)
import { useStripe } from '@/contexts/StripeContext';

function BillingSection() {
  const { stripe } = useStripe();

  const handleUpgrade = async () => {
    const stripeInstance = await stripe;
    if (!stripeInstance) return;

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
    });
    const { sessionId } = await response.json();

    const { error } = await stripeInstance.redirectToCheckout({ sessionId });
    if (error) console.error(error);
  };

  return (
    <button onClick={handleUpgrade}>Upgrade Plan</button>
  );
}
```

### 5. Creating a Custom Analytics Widget System

For maximum flexibility, create a widget system:

**Step 1**: Define widget interface
```tsx
// lib/types/widgets.ts
export interface WidgetConfig {
  id: string;
  type: 'metric' | 'chart' | 'table' | 'custom';
  title: string;
  dataSource: string;
  refreshInterval?: number;
  gridPosition?: { x: number; y: number; w: number; h: number };
}

export interface Widget {
  config: WidgetConfig;
  component: React.ComponentType<any>;
}
```

**Step 2**: Create widget registry
```tsx
// lib/widgets/registry.ts
import { Widget } from '@/lib/types/widgets';
import MetricWidget from '@/components/widgets/MetricWidget';
import ChartWidget from '@/components/widgets/ChartWidget';

export const widgetRegistry: Record<string, Widget> = {
  metric: {
    config: { id: 'metric', type: 'metric', title: 'Metric', dataSource: '' },
    component: MetricWidget,
  },
  chart: {
    config: { id: 'chart', type: 'chart', title: 'Chart', dataSource: '' },
    component: ChartWidget,
  },
};

export function getWidget(type: string): Widget | undefined {
  return widgetRegistry[type];
}
```

**Step 3**: Create widget renderer
```tsx
// components/WidgetRenderer.tsx
import { WidgetConfig } from '@/lib/types/widgets';
import { getWidget } from '@/lib/widgets/registry';

interface WidgetRendererProps {
  config: WidgetConfig;
  data: any;
}

export default function WidgetRenderer({ config, data }: WidgetRendererProps) {
  const widget = getWidget(config.type);
  if (!widget) return <div>Unknown widget type</div>;

  const Component = widget.component;
  return <Component config={config} data={data} />;
}
```

### 6. Adding Real-time Data with WebSockets

For live updates:

**Step 1**: Create WebSocket hook
```tsx
// lib/hooks/useWebSocket.ts
import { useEffect, useState } from 'react';

export function useWebSocket<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => setConnected(true);
    ws.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      setData(parsed);
    };
    ws.onclose = () => setConnected(false);

    return () => ws.close();
  }, [url]);

  return { data, connected };
}
```

**Step 2**: Use in dashboard
```tsx
// app/dashboard/page.tsx
import { useWebSocket } from '@/lib/hooks/useWebSocket';

export default function Dashboard() {
  const { data: liveMetrics } = useWebSocket<MetricsData>(
    'wss://api.ragsites.com/ws/metrics'
  );

  return (
    <MetricCard
      title="Live Requests"
      value={liveMetrics?.currentRequests || 0}
    />
  );
}
```

### 7. Environment Configuration

Create comprehensive environment setup:

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.ragsites.com
NEXT_PUBLIC_WS_URL=wss://api.ragsites.com
NEXT_PUBLIC_STRIPE_KEY=pk_test_...

# Private keys (never expose to client)
STRIPE_SECRET_KEY=sk_test_...
DATABASE_URL=postgresql://...
API_SECRET_KEY=...
```

```tsx
// lib/config.ts
export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  wsUrl: process.env.NEXT_PUBLIC_WS_URL,
  stripeKey: process.env.NEXT_PUBLIC_STRIPE_KEY,
};
```

### 8. Adding Export Functionality

Allow users to export their analytics:

```tsx
// lib/utils/export.ts
export function exportToCSV(data: any[], filename: string) {
  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(','),
    ...data.map(row => headers.map(h => row[h]).join(','))
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
}

export function exportToPDF(elementId: string, filename: string) {
  // Use html2pdf or similar library
}
```

```tsx
// In dashboard
import { exportToCSV } from '@/lib/utils/export';

<button onClick={() => exportToCSV(activityData, 'analytics-report')}>
  Export to CSV
</button>
```

## Integration with Backend

To connect to a real backend:

1. **API Integration**: Replace mock data in dashboard with actual API calls
2. **Authentication**: Update `AuthContext.tsx` with real auth endpoints
3. **Data Fetching**: Use React Query or SWR for data management
4. **Environment Variables**: Create `.env.local` for API URLs

Example:
```typescript
// .env.local
NEXT_PUBLIC_API_URL=https://api.ragsites.com
```

## Deployment

### Environment Variables for Production

Set these environment variables in your deployment platform:

```env
DATABASE_URL=postgresql://user:pass@host:5432/database
JWT_SECRET=generated-secret-min-32-chars
JWT_EXPIRES_IN=7d
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-domain.com
```

### Deploy to Vercel

**1. Set up PostgreSQL:**
- Use Vercel Postgres, Neon, or Supabase
- Copy the connection string

**2. Configure environment variables:**
```bash
# In Vercel dashboard or CLI
vercel env add DATABASE_URL
vercel env add JWT_SECRET
vercel env add JWT_EXPIRES_IN
```

**3. Deploy:**
```bash
npm run build
vercel --prod
```

**4. Initialize database:**
After deployment, run migrations using Vercel's serverless function or:
```bash
# SSH into a temporary container
DATABASE_URL="your-prod-db-url" npm run db:init
```

### Deploy to Railway

**1. Create new project:**
```bash
railway init
```

**2. Add PostgreSQL:**
```bash
railway add postgresql
```

**3. Set environment variables in Railway dashboard**

**4. Deploy:**
```bash
railway up
```

### Deploy to Other Platforms

**Docker Deployment:**

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t ragsites-client .
docker run -p 3000:3000 --env-file .env ragsites-client
```

### Production Checklist

- [ ] Generate strong JWT_SECRET (`openssl rand -base64 32`)
- [ ] Set up production database with backups
- [ ] Configure HTTPS/SSL
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Configure rate limiting
- [ ] Set up database connection pooling
- [ ] Enable CORS for your domain only
- [ ] Set up automated database backups
- [ ] Configure session cleanup cron job
- [ ] Test all authentication flows
- [ ] Set up error tracking
- [ ] Configure logging

## Future Enhancements

The application is designed to easily support:
- Individual service pages
- Advanced filtering and date ranges
- Export functionality for reports
- Team management features
- Real-time notifications
- Multiple data sources integration
- Custom widget builder

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL 12+
- **Authentication**: JWT with BCrypt password hashing
- **Session Management**: Database-backed with token tracking
- **State Management**: React Context API
- **API**: Next.js API Routes
- **ORM**: Native PostgreSQL client (pg)

---

## Common Integration Patterns

### Pattern 1: Service-Specific Dashboard Layout

Create a consistent layout for all service pages:

```tsx
// components/layouts/ServiceLayout.tsx
import { ReactNode } from 'react';

interface ServiceLayoutProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export default function ServiceLayout({
  title,
  description,
  actions,
  children
}: ServiceLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
            {description && <p className="text-gray-300">{description}</p>}
          </div>
          {actions && <div>{actions}</div>}
        </div>
        {children}
      </div>
    </div>
  );
}
```

Usage:
```tsx
// app/services/chatbot/page.tsx
<ServiceLayout
  title="Chatbot AI"
  description="Monitor your chatbot performance"
  actions={<button>Configure</button>}
>
  <MetricCard ... />
</ServiceLayout>
```

### Pattern 2: Custom Hook for Data Fetching

Create reusable hooks for each data type:

```tsx
// lib/hooks/useServiceMetrics.ts
import { useQuery } from '@tanstack/react-query';

export function useServiceMetrics(serviceId: string) {
  return useQuery({
    queryKey: ['service-metrics', serviceId],
    queryFn: async () => {
      const token = localStorage.getItem('authToken');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/services/${serviceId}/metrics`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.json();
    },
    refetchInterval: 30000, // Auto-refresh every 30 seconds
  });
}
```

### Pattern 3: Error Boundary for Robust UX

```tsx
// components/ErrorBoundary.tsx
'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="text-white p-8">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="bg-purple-600 px-4 py-2 rounded"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Pattern 4: Loading States Component

```tsx
// components/LoadingState.tsx
export function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-gray-300">Loading...</p>
      </div>
    </div>
  );
}

export function EmptyState({ message = "No data available" }: { message?: string }) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center text-gray-400">
        <p>{message}</p>
      </div>
    </div>
  );
}
```

### Pattern 5: Multi-Source Data Aggregation

When combining data from multiple services:

```tsx
// lib/hooks/useAggregatedMetrics.ts
import { useQueries } from '@tanstack/react-query';

export function useAggregatedMetrics(serviceIds: string[]) {
  const queries = useQueries({
    queries: serviceIds.map(id => ({
      queryKey: ['service', id],
      queryFn: () => fetchServiceData(id),
    })),
  });

  const isLoading = queries.some(q => q.isLoading);
  const data = queries.map(q => q.data).filter(Boolean);

  // Aggregate data
  const aggregated = {
    totalRequests: data.reduce((sum, d) => sum + d.requests, 0),
    avgResponseTime: data.reduce((sum, d) => sum + d.responseTime, 0) / data.length,
  };

  return { data: aggregated, isLoading };
}
```

## Best Practices

### 1. Type Safety
Always define TypeScript interfaces for your data:

```tsx
// lib/types/analytics.ts
export interface ServiceMetrics {
  serviceId: string;
  totalRequests: number;
  successRate: number;
  avgResponseTime: number;
  timestamp: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}
```

### 2. Error Handling
Implement comprehensive error handling:

```tsx
try {
  const data = await fetchData();
  setData(data);
} catch (error) {
  console.error('Error fetching data:', error);
  // Show user-friendly error message
  toast.error('Failed to load data. Please try again.');
}
```

### 3. Data Caching Strategy
Use React Query's caching effectively:

```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});
```

### 4. Optimistic Updates
For better UX, update UI before API confirmation:

```tsx
const mutation = useMutation({
  mutationFn: updateService,
  onMutate: async (newData) => {
    // Cancel queries
    await queryClient.cancelQueries({ queryKey: ['services'] });

    // Snapshot previous value
    const previous = queryClient.getQueryData(['services']);

    // Optimistically update
    queryClient.setQueryData(['services'], newData);

    return { previous };
  },
  onError: (err, newData, context) => {
    // Rollback on error
    queryClient.setQueryData(['services'], context.previous);
  },
});
```

### 5. Performance Optimization
- Use React.memo for expensive components
- Implement virtual scrolling for large lists
- Lazy load components and routes
- Optimize images with Next.js Image component

```tsx
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <LoadingState />,
  ssr: false, // Disable server-side rendering if needed
});
```

### 6. Security Considerations
- Never expose API keys in client-side code
- Use environment variables for sensitive data
- Implement CSRF protection
- Validate and sanitize user inputs
- Use HTTPS in production

```tsx
// lib/api/client.ts
const headers = {
  'Content-Type': 'application/json',
  'X-CSRF-Token': getCsrfToken(),
  'Authorization': `Bearer ${token}`,
};
```

## Troubleshooting

### Issue: Authentication persists after logout
**Solution**: Clear localStorage and session storage

```tsx
const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
  // Redirect to login
};
```

### Issue: Stale data showing after updates
**Solution**: Invalidate queries after mutations

```tsx
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ['services'] });
}
```

### Issue: CORS errors in development
**Solution**: Configure Next.js API routes or update backend CORS settings

```tsx
// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*',
      },
    ];
  },
};
```

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Guide](https://tanstack.com/query/latest/docs/react/overview)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Contributing

When adding new features:
1. Follow the existing code structure
2. Add TypeScript types for all data
3. Include error handling
4. Add loading states
5. Update this README with integration steps
6. Test thoroughly before deployment
