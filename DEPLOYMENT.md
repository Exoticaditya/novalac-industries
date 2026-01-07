# 🚀 Deployment Guide - Novalac Industries Website

## Quick Deploy to GitHub Pages

### Step 1: Push to GitHub (Already Done ✓)
```bash
git add .
git commit -m "Initial commit: Novalac Industries website"
git branch -M main
git remote add origin https://github.com/Exoticaditya/novalac-industries.git
git push -u origin main
```

### Step 2: Enable GitHub Pages
1. Go to: https://github.com/Exoticaditya/novalac-industries
2. Click **Settings** tab
3. Scroll to **Pages** section (left sidebar)
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait 2-3 minutes for deployment

### Step 3: Access Your Website
Your website will be live at:
```
https://exoticaditya.github.io/novalac-industries/
```

## 📸 Adding Real Product Images

### Download from IndiaMArt:
1. Visit: https://www.indiamart.com/novalacindustries/
2. Right-click each product image → Save As
3. Save with exact filenames (see IMAGE_GUIDE.md)
4. Place in respective folders:
   - `images/products/` - 12 product images
   - `images/about/` - 1 factory image
   - `images/gallery/` - 6 project images

### Push Images to GitHub:
```bash
git add images/
git commit -m "Add product images from IndiaMArt"
git push
```

Website will auto-update in 1-2 minutes!

## 🌐 Custom Domain (Optional)

### To use www.novalacindustries.com:
1. Buy domain from domain registrar
2. Add CNAME record pointing to: `exoticaditya.github.io`
3. In GitHub repo: Settings → Pages → Custom Domain
4. Enter your domain and save

## 📊 Analytics (Optional)

### Add Google Analytics:
1. Create GA4 property
2. Get tracking ID
3. Add to `index.html` before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🔧 Future Updates

### To update website:
```bash
# Make changes to files
git add .
git commit -m "Description of changes"
git push
```

Changes go live automatically in 1-2 minutes!

## ✅ Checklist

- [x] Push code to GitHub
- [ ] Enable GitHub Pages
- [ ] Add product images from IndiaMArt
- [ ] Test website on mobile devices
- [ ] Update contact information
- [ ] Add social media links
- [ ] Optional: Add custom domain
- [ ] Optional: Set up analytics

## 🐛 Troubleshooting

### Website not loading?
- Wait 2-3 minutes after enabling GitHub Pages
- Check Settings → Pages shows green checkmark
- Clear browser cache (Ctrl+Shift+R)

### Images not showing?
- Verify filenames match exactly (case-sensitive)
- Check images are pushed to GitHub
- Images must be in correct folders

### Changes not appearing?
- Wait 1-2 minutes for GitHub Pages to rebuild
- Hard refresh browser (Ctrl+Shift+R)
- Check commit was pushed: `git log`

## 📞 Support

Issues? Create a GitHub issue or contact the developer.

---

**Happy Deploying! 🎉**
