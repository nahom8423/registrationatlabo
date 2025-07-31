# Quick Deployment Guide

## Your Setup:
- **GitHub Repo**: https://github.com/nahom8423/registrationatlabo
- **Firebase Project**: registrationatlabo
- **Firebase Database**: https://registrationatlabo-default-rtdb.firebaseio.com/

## Step 1: Upload Files to GitHub

You need to upload these files to your GitHub repository:

### Required Files:
1. `checkin.html` (updated with your Firebase config)
2. `atlabologo.png` (your logo)
3. `members.xlsx` (your Excel file with member data)

### How to Upload:
1. Go to: https://github.com/nahom8423/registrationatlabo
2. Click **"Add file"** → **"Upload files"**
3. Drag and drop the 3 files above
4. Commit message: "Add check-in system with Firebase integration"
5. Click **"Commit changes"**

## Step 2: Enable GitHub Pages

1. In your repo, go to **Settings** tab
2. Scroll to **"Pages"** in left sidebar
3. Source: **"Deploy from a branch"**
4. Branch: **"main"**
5. Folder: **"/ (root)"**
6. Click **"Save"**

## Step 3: Access Your Live Site

After 2-3 minutes, your site will be live at:
```
https://nahom8423.github.io/registrationatlabo/checkin.html
```

## Step 4: Configure Your Excel File

In the `checkin.html` file, update these settings if needed:

### Line 276 - Excel filename:
```javascript
const EXCEL_FILENAME = 'members.xlsx'; // Make sure this matches your uploaded file
```

### Lines 279-286 - Column names (if your Excel has different column names):
```javascript
const COLUMN_MAPPING = {
    memberId: 'Member ID',        // Change if your column name is different
    firstName: 'First Name',      // Change if your column name is different
    lastName: 'Last Name',        // Change if your column name is different
    email: 'Email',               // Change if your column name is different
    phone: 'Phone Number',        // Change if your column name is different
    date: 'Date'                  // Change if your column name is different
};
```

## Step 5: Set Firebase Database Rules

1. Go to: https://console.firebase.google.com/project/registrationatlabo/database
2. Click **"Rules"** tab
3. Replace the rules with:
```json
{
  "rules": {
    "checkIns": {
      ".read": true,
      ".write": true,
      "$checkInId": {
        ".validate": "newData.hasChildren(['memberId', 'name', 'timestamp'])"
      }
    }
  }
}
```
4. Click **"Publish"**

## Testing

### Test Real-Time Syncing:
1. Open your site on multiple devices/browsers
2. Check someone in on one device
3. You should see the check-in appear immediately on other devices
4. Try checking in the same person again - it should show "Already Checked In"

### Monitor Check-Ins:
- Go to: https://console.firebase.google.com/project/registrationatlabo/database
- See all check-ins in real-time under the `checkIns` node

## Your Complete URLs:
- **Live Site**: https://nahom8423.github.io/registrationatlabo/checkin.html
- **GitHub Repo**: https://github.com/nahom8423/registrationatlabo
- **Firebase Database**: https://registrationatlabo-default-rtdb.firebaseio.com/
- **Firebase Console**: https://console.firebase.google.com/project/registrationatlabo

## Next Steps:
1. Upload the files to your GitHub repo
2. Enable GitHub Pages
3. Test the system with real data
4. Share the live URL with your team

Everything is configured and ready to go! 🚀