# Check-In System

## Setup Instructions

### 1. Logo Integration
- Place your logo file as `logo.png` in the same directory as `checkin.html`
- The system will automatically detect and display the logo
- Supported formats: PNG, JPG, GIF

### 2. Excel Data Integration

#### Current Sample Data Format
The system currently uses sample data. Replace the `members` array in the JavaScript section with your actual data.

#### Expected Excel Columns
- **Member ID**: Unique identifier
- **First Name**: Member's first name
- **Last Name**: Member's last name  
- **Email**: Member's email address
- **Date**: Registration/membership date
- **Phone Number**: (Optional - for future Excel sheet)

#### Converting Excel to JavaScript Array
1. Export your Excel file as CSV
2. Convert CSV data to JavaScript array format:

```javascript
const members = [
    {
        memberId: "001",
        firstName: "John",
        lastName: "Smith", 
        email: "john.smith@email.com",
        phone: "555-0123", // Optional
        date: "2024-01-15"
    },
    // ... more members
];
```

### 3. Features
- **Autocomplete Search**: Type name or phone number to see matching results
- **Dropdown Selection**: Click on suggested names instead of typing full name
- **Member Information Display**: Shows Member ID, Name, Email, and Phone (if available)
- **Responsive Design**: Works on mobile and desktop
- **Auto-reset**: Form clears after 3 seconds for next user

### 4. Usage
1. Open `checkin.html` in a web browser
2. Type member name or phone number in the search box
3. Select from dropdown suggestions
4. Click "Check In" button
5. Member information will be displayed
6. System automatically resets for next user