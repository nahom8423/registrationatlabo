# GitHub Pages Setup Guide

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** button → **"New repository"**
3. Repository name: `atlabo-checkin` (or any name you prefer)
4. Make it **Public** (required for free GitHub Pages)
5. Check **"Add a README file"**
6. Click **"Create repository"**

## Step 2: Upload Your Files

### Method A: Web Interface (Easiest)
1. In your new repository, click **"uploading an existing file"**
2. Drag and drop these files:
   - `checkin.html`
   - `atlabologo.png`
   - `members.xlsx` (your Excel file)
   - Any other files you need
3. Write commit message: "Add check-in system files"
4. Click **"Commit changes"**

### Method B: Git Commands (If you have Git installed)
```bash
git clone https://github.com/YOUR_USERNAME/atlabo-checkin.git
cd atlabo-checkin
# Copy your files into this folder
git add .
git commit -m "Add check-in system files"
git push origin main
```

## Step 3: Enable GitHub Pages

1. In your repository, go to **Settings** tab
2. Scroll down to **"Pages"** in the left sidebar
3. Under **"Source"**, select **"Deploy from a branch"**
4. Branch: **"main"** 
5. Folder: **"/ (root)"**
6. Click **"Save"**

## Step 4: Access Your Website

After a few minutes, your site will be available at:
```
https://YOUR_USERNAME.github.io/atlabo-checkin/checkin.html
```

## Step 5: Custom Domain (Optional)

If you have a custom domain:
1. In Pages settings, add your domain under **"Custom domain"**
2. Enable **"Enforce HTTPS"**
3. Update your domain's DNS settings to point to GitHub Pages

## Important Notes

### File Naming
- Rename `checkin.html` to `index.html` if you want the URL to be just:
  ```
  https://YOUR_USERNAME.github.io/atlabo-checkin/
  ```

### Excel File Limitations
- GitHub Pages is static hosting - Excel files work but with limitations
- For better performance, consider converting Excel to JSON format
- Firebase (next step) will handle the real-time data syncing

### Updates
- Any changes you make to files in the repository will automatically update the live site
- Changes may take a few minutes to appear

## Troubleshooting

### Site not loading:
- Wait 5-10 minutes after enabling Pages
- Check that all files uploaded correctly
- Ensure `checkin.html` exists in the root directory

### Excel file not loading:
- GitHub Pages doesn't support server-side file reading
- Use Firebase (next guide) for dynamic data
- Or convert Excel to JSON format

## Next Steps
- Set up Firebase for real-time check-in syncing
- This will allow multiple devices to see check-ins in real-time