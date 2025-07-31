# Firebase Setup Guide for Real-Time Syncing

## Why Firebase?
Firebase enables real-time syncing across all devices. When someone checks in on one device, it instantly appears on all other devices viewing the check-in system.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Project name: `atlabo-checkin` (or any name)
4. Disable Google Analytics (not needed)
5. Click **"Create project"**

## Step 2: Set Up Realtime Database

1. In your Firebase project, go to **"Realtime Database"**
2. Click **"Create Database"**
3. Choose **"Start in test mode"** (we'll secure it later)
4. Select your preferred location
5. Click **"Done"**

## Step 3: Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll to **"Your apps"** section
3. Click **"Add app"** → Web app icon `</>`
4. App nickname: `Check-in System`
5. Click **"Register app"**
6. Copy the **firebaseConfig** object

## Step 4: Update HTML File

In `checkin.html`, find this section (around line 237) and replace with your config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",           // ← Replace with your values
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### Example (with fake values):
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyB1234567890abcdefghijklmnop",
    authDomain: "atlabo-checkin.firebaseapp.com",
    databaseURL: "https://atlabo-checkin-default-rtdb.firebaseio.com",
    projectId: "atlabo-checkin",
    storageBucket: "atlabo-checkin.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456789"
};
```

## Step 5: Deploy to GitHub Pages

1. Commit and push your updated HTML file to GitHub
2. GitHub Pages will automatically update your live site
3. Test the check-in system - it should now sync across devices!

## Step 6: Secure Your Database (Important!)

### Current Rules (Test Mode - Insecure):
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

### Recommended Rules (More Secure):
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

To update rules:
1. Go to **Realtime Database** → **Rules** tab
2. Replace the rules with the secure version above
3. Click **"Publish"**

## Features You Get:

### Real-Time Syncing
- Check-ins appear instantly on all devices
- No need to refresh pages
- Works on phones, tablets, computers simultaneously

### Duplicate Prevention
- System prevents double check-ins
- Shows "Already Checked In" status
- Syncs across all devices

### Offline Fallback
- If Firebase fails, falls back to local storage
- Still works on single device
- Shows warning in console

## Monitoring Check-Ins

### View Live Data:
1. Go to Firebase Console → Realtime Database
2. See all check-ins in real-time
3. Data structure:
   ```
   checkIns/
     ├── -abc123/
     │   ├── memberId: "001"
     │   ├── name: "John Smith"
     │   ├── email: "john@email.com"
     │   ├── timestamp: 1234567890
     │   └── date: "1/15/2024"
     └── -def456/
         └── ...
   ```

### Export Data:
- Click **"Export JSON"** to download all check-ins
- Use for attendance reports or backup

## Troubleshooting

### Firebase not loading:
- Check console (F12) for error messages
- Verify all config values are correct
- Ensure Realtime Database is created

### Check-ins not syncing:
- Verify database rules allow read/write
- Check network connection
- Look for errors in browser console

### CORS errors on GitHub Pages:
- Should work automatically with GitHub Pages
- If issues persist, try different browsers

## Cost Information
- Firebase Realtime Database has a generous free tier
- Free tier includes:
  - 1GB stored data
  - 10GB bandwidth per month
- For typical check-in events, this is more than enough

## Next Steps
- Test with multiple devices/browsers
- Consider adding admin dashboard
- Set up email notifications (advanced)