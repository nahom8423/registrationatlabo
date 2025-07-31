# Excel Setup Instructions

## Quick Setup (3 steps)

### Step 1: Upload Your Excel File
- Place your Excel file (`.xlsx` format) in the same directory as `checkin.html`
- Recommended filename: `members.xlsx`

### Step 2: Update Filename in Code
Open `checkin.html` and find this line (around line 231):
```javascript
const EXCEL_FILENAME = 'members.xlsx'; // <-- CHANGE THIS TO YOUR EXCEL FILE NAME
```
Change `'members.xlsx'` to your actual filename.

### Step 3: Configure Column Names
If your Excel columns have different names, update the `COLUMN_MAPPING` section (around line 235):

```javascript
const COLUMN_MAPPING = {
    memberId: 'Member ID',        // Your Excel column name for Member ID
    firstName: 'First Name',      // Your Excel column name for First Name  
    lastName: 'Last Name',        // Your Excel column name for Last Name
    email: 'Email',               // Your Excel column name for Email
    phone: 'Phone Number',        // Your Excel column name for Phone (optional)
    date: 'Date'                  // Your Excel column name for Date
};
```

## Expected Excel Format

Your Excel file should have these columns (names can be different, just update the mapping):
- **Member ID** - Unique identifier for each member
- **First Name** - Member's first name
- **Last Name** - Member's last name  
- **Email** - Member's email address
- **Phone Number** - Member's phone (optional)
- **Date** - Registration or membership date

## Example Excel Layout
| Member ID | First Name | Last Name | Email | Phone Number | Date |
|-----------|------------|-----------|-------|--------------|------|
| 001 | John | Smith | john@email.com | 555-0123 | 2024-01-15 |
| 002 | Jane | Johnson | jane@email.com | 555-0124 | 2024-01-16 |

## Troubleshooting

### If Excel file doesn't load:
1. Check the browser console (F12) for error messages
2. Ensure the Excel file is in the same directory as the HTML file
3. Verify the filename matches exactly (case-sensitive)
4. Make sure the file is `.xlsx` format (not `.xls`)

### If names don't appear in dropdown:
1. Check that column names in `COLUMN_MAPPING` match your Excel exactly
2. Ensure your Excel has data in the first worksheet
3. Verify there are no completely empty rows

### Browser CORS Issues:
If running locally, you may need to:
- Use a local web server (not just opening the HTML file directly)
- Or use the CSV backup method below

## CSV Backup Method

If Excel loading doesn't work:
1. Export your Excel file as CSV
2. Convert the CSV data to JavaScript array format
3. Replace the `sampleMembers` array in the code

## Testing
- Sample data will be used if Excel file can't be loaded
- Check browser console for loading status messages
- Test with a few sample names before your event