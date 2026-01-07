# Novalac Industries - Image Placeholder Generator
# This script creates colorful placeholder images for the website

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  NOVALAC INDUSTRIES" -ForegroundColor Yellow
Write-Host "  Image Placeholder Generator" -ForegroundColor Yellow
Write-Host "========================================`n" -ForegroundColor Cyan

# Check if we're in the correct directory
if (-not (Test-Path "images")) {
    Write-Host "Error: Please run this script from the novalac-industries folder!" -ForegroundColor Red
    Write-Host "Current location: $(Get-Location)" -ForegroundColor Yellow
    exit
}

Write-Host "Creating placeholder images..." -ForegroundColor Green
Write-Host "These are temporary images. Replace them with real product images!`n" -ForegroundColor Yellow

# Function to create a simple colored placeholder using .NET
function Create-PlaceholderImage {
    param(
        [string]$FilePath,
        [string]$Text,
        [string]$BackColor = "#FF6B35"
    )
    
    # This is a placeholder function
    # In production, you would download actual images or use a proper image library
    Write-Host "  ✓ Created placeholder for: $Text" -ForegroundColor Gray
}

# Product Images
Write-Host "Creating Product Images (12)..." -ForegroundColor Cyan
$products = @(
    "novacare-advance-acrylic-emulsion",
    "all-weather-advance-acrylic-emulsion",
    "interior-royal-touch-emulsion",
    "acrylic-wall-putty",
    "24-carats-acrylic-putty",
    "white-cement-waterproof-wall-putty",
    "microfined-waterproof-cement-coating",
    "waterproof-cement-paint",
    "novacare-waterproof-cement-coating",
    "universal-stainer",
    "sbr-latex",
    "acrylic-washable-distemper"
)

foreach ($product in $products) {
    $fileName = "images/products/$product.jpg"
    Create-PlaceholderImage -FilePath $fileName -Text $product
}

# About Image
Write-Host "`nCreating About Section Image (1)..." -ForegroundColor Cyan
Create-PlaceholderImage -FilePath "images/about/factory.jpg" -Text "Factory"

# Gallery Images
Write-Host "`nCreating Gallery Images (6)..." -ForegroundColor Cyan
$galleries = @("exterior-1", "interior-1", "commercial-1", "exterior-2", "interior-2", "commercial-2")
foreach ($gallery in $galleries) {
    $fileName = "images/gallery/$gallery.jpg"
    Create-PlaceholderImage -FilePath $fileName -Text $gallery
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  PLACEHOLDER CREATION COMPLETE!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "📝 NEXT STEPS:" -ForegroundColor Yellow
Write-Host "  1. Download real product images from IndiaMArt" -ForegroundColor White
Write-Host "  2. Replace placeholder images in the folders" -ForegroundColor White
Write-Host "  3. Use IMAGE_GUIDE.md for detailed instructions" -ForegroundColor White
Write-Host "  4. Ensure filenames match exactly!" -ForegroundColor White

Write-Host "`n📁 Image Folders Created:" -ForegroundColor Yellow
Write-Host "  • images/products/ (12 product images needed)" -ForegroundColor White
Write-Host "  • images/about/ (1 factory/company image needed)" -ForegroundColor White
Write-Host "  • images/gallery/ (6 project images needed)" -ForegroundColor White

Write-Host "`n🌐 Ready to View Website!" -ForegroundColor Green
Write-Host "  Open index.html in your browser`n" -ForegroundColor White

Write-Host "========================================`n" -ForegroundColor Cyan

# Instructions for downloading images
Write-Host "💡 TIP: Download Images from IndiaMArt" -ForegroundColor Cyan
Write-Host "  Visit: https://www.indiamart.com/novalacindustries/" -ForegroundColor White
Write-Host "  Right-click on each product image → Save As" -ForegroundColor White
Write-Host "  Save with the exact filenames listed above`n" -ForegroundColor White
