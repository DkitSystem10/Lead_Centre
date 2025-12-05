# Vercel Deployment Guide

## Environment Variables Setup

To deploy this application to Vercel, you need to configure the following environment variables in your Vercel project settings:

### Required Environment Variables

1. **VITE_SUPABASE_URL**
   - Your Supabase project URL
   - Format: `https://your-project-id.supabase.co`
   - You can find this in your Supabase project settings under "API" → "Project URL"

2. **VITE_SUPABASE_ANON_KEY**
   - Your Supabase anonymous/public key
   - You can find this in your Supabase project settings under "API" → "Project API keys" → "anon public"

### How to Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:
   - `VITE_SUPABASE_URL` = `https://your-project-id.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `your-anon-key-here`
4. Make sure to select the appropriate **Environment** (Production, Preview, Development)
5. Click **Save**
6. Redeploy your application for the changes to take effect

### Local Development Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Supabase credentials in the `.env` file:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. Restart your development server:
   ```bash
   npm run dev
   ```

### Important Notes

- Never commit your `.env` file to Git (it's already in `.gitignore`)
- The `.env.example` file is safe to commit as it doesn't contain actual credentials
- Environment variables prefixed with `VITE_` are exposed to the client-side code
- Make sure your Supabase Row Level Security (RLS) policies are properly configured

### Troubleshooting

If you see the error: "Missing Supabase environment variables"
- Check that environment variables are set in Vercel
- Verify the variable names are exactly: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Make sure you've redeployed after adding the variables
- Check Vercel deployment logs for any environment variable issues

