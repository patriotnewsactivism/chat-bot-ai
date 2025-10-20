# fix-and-build.ps1
Write-Host "=== Fixing and Rebuilding Vite Project ===" -ForegroundColor Cyan

# Step 1. Move to project directory
Set-Location -Path "C:\react\BuildMyBot"

# Step 2. Remove old node_modules and lock file to clear corruption
Write-Host "Cleaning old dependencies..."
if (Test-Path "node_modules") { Remove-Item -Recurse -Force "node_modules" }
if (Test-Path "package-lock.json") { Remove-Item -Force "package-lock.json" }

# Step 3. Reinstall dependencies fresh
Write-Host "Reinstalling dependencies..."
npm install

# Step 4. Fix potential Vite or path resolution issues
Write-Host "Fixing path and Vite configuration issues..."
$viteConfig = Get-Content ".\vite.config.js" -Raw

# Add missing alias resolution if not already there
if ($viteConfig -notmatch "@:") {
    $viteConfig = $viteConfig -replace "resolve:\s*{", "resolve: { alias: { '@': '/src' },"
    Set-Content ".\vite.config.js" $viteConfig
    Write-Host "Added '@' alias to vite.config.js"
}

# Step 5. Check for missing Supabase integration
if (-not (Test-Path ".\src\integrations\supabase.ts")) {
    Write-Host "Supabase integration file missing. Creating placeholder..."
    New-Item -Path ".\src\integrations" -ItemType Directory -Force | Out-Null
    @"
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
"@ | Set-Content ".\src\integrations\supabase.ts"
}

# Step 6. Build project
Write-Host "Starting Vite build..." -ForegroundColor Yellow
npm run build

# Step 7. Report completion
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build completed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed. Check error output above." -ForegroundColor Red
}