const puppeteer = require('puppeteer');
const path = require('path');
const { spawn } = require('child_process');

let httpServer;

async function startServer() {
    return new Promise((resolve, reject) => {
        console.log('Starting HTTP server...');
        httpServer = spawn('npx', ['http-server', '.', '-p', '8080', '-c-1'], {
            cwd: __dirname,
            stdio: ['ignore', 'pipe', 'pipe']
        });
        
        httpServer.stdout.on('data', (data) => {
            const output = data.toString();
            console.log('Server:', output.trim());
            if (output.includes('Available on:') || output.includes('Hit CTRL-C')) {
                setTimeout(resolve, 1000); // Give server time to fully start
            }
        });
        
        httpServer.stderr.on('data', (data) => {
            console.error('Server error:', data.toString());
        });
        
        httpServer.on('error', reject);
        
        // Timeout after 10 seconds
        setTimeout(() => resolve(), 10000);
    });
}

function stopServer() {
    if (httpServer) {
        httpServer.kill();
        console.log('HTTP server stopped');
    }
}

async function testCheckInPage() {
    console.log('Starting Puppeteer test for checkin.html...');
    
    // Start HTTP server
    await startServer();
    
    const browser = await puppeteer.launch({
        headless: false, // Set to false to see the browser in action
        defaultViewport: { width: 1200, height: 800 },
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        
        // Enable console logging from the page
        page.on('console', msg => {
            console.log('PAGE LOG:', msg.text());
        });
        
        // Listen for page errors
        page.on('pageerror', error => {
            console.error('PAGE ERROR:', error.message);
        });
        
        // Navigate to the HTTP served file
        const url = 'http://localhost:8080/checkin.html';
        console.log('Navigating to:', url);
        
        await page.goto(url, { waitUntil: 'networkidle0' });
        
        // Wait for the page to fully load and Excel data to be processed
        console.log('Waiting for page to load and Excel data to be processed...');
        await page.waitForFunction(() => {
            return window.members !== undefined;
        }, { timeout: 10000 });
        
        // Check if Excel data loaded successfully
        const membersCount = await page.evaluate(() => {
            return window.members ? window.members.length : 0;
        });
        
        console.log(`Excel data loaded: ${membersCount} members found`);
        
        if (membersCount === 0) {
            console.log('WARNING: No Excel data loaded. This could mean:');
            console.log('1. Excel file not found');
            console.log('2. CORS issues with local file access');
            console.log('3. Excel file format issues');
            return;
        }
        
        // Take initial screenshot
        await page.screenshot({ 
            path: '/Users/nahomnigatu/Downloads/registrationatlabo/screenshot-initial.png',
            fullPage: true 
        });
        console.log('Initial screenshot saved as screenshot-initial.png');
        
        // Type "israel" in the search input field
        console.log('Typing "israel" in the search input...');
        await page.focus('#nameSearch');
        await page.type('#nameSearch', 'israel', { delay: 100 });
        
        // Wait for suggestions to appear
        console.log('Waiting for suggestions to appear...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if suggestions container is visible
        const suggestionsVisible = await page.evaluate(() => {
            const suggestions = document.getElementById('suggestions');
            return suggestions && suggestions.style.display !== 'none';
        });
        
        console.log('Suggestions visible:', suggestionsVisible);
        
        // Get all suggestion items
        const suggestions = await page.evaluate(() => {
            const suggestionsContainer = document.getElementById('suggestions');
            if (!suggestionsContainer) return [];
            
            const items = suggestionsContainer.querySelectorAll('.suggestion-item');
            return Array.from(items).map(item => {
                const strong = item.querySelector('strong');
                const small = item.querySelector('small');
                return {
                    name: strong ? strong.textContent : '',
                    phone: small ? small.textContent : ''
                };
            });
        });
        
        console.log('Found suggestions:', suggestions);
        
        // Take screenshot after search
        await page.screenshot({ 
            path: '/Users/nahomnigatu/Downloads/registrationatlabo/screenshot-search-results.png',
            fullPage: true 
        });
        console.log('Search results screenshot saved as screenshot-search-results.png');
        
        // Check if "Israel Hora" appears in suggestions
        const israelHoraFound = suggestions.some(suggestion => 
            suggestion.name.toLowerCase().includes('israel') && 
            suggestion.name.toLowerCase().includes('hora')
        );
        
        console.log('Israel Hora found in suggestions:', israelHoraFound);
        
        if (israelHoraFound) {
            console.log('SUCCESS: Israel Hora appears in the search results!');
            
            // Try to click on Israel Hora
            const clicked = await page.evaluate(() => {
                const suggestionsContainer = document.getElementById('suggestions');
                if (!suggestionsContainer) return false;
                
                const items = suggestionsContainer.querySelectorAll('.suggestion-item');
                for (let item of items) {
                    const strong = item.querySelector('strong');
                    if (strong && strong.textContent.toLowerCase().includes('israel') && 
                        strong.textContent.toLowerCase().includes('hora')) {
                        item.click();
                        return true;
                    }
                }
                return false;
            });
            
            if (clicked) {
                console.log('Clicked on Israel Hora suggestion');
                
                // Wait for member info panel to appear
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Check if member info panel is visible
                const memberInfoVisible = await page.evaluate(() => {
                    const memberInfo = document.getElementById('memberInfo');
                    return memberInfo && memberInfo.style.display !== 'none';
                });
                
                console.log('Member info panel visible:', memberInfoVisible);
                
                if (memberInfoVisible) {
                    // Get member details
                    const memberDetails = await page.evaluate(() => {
                        const personDetails = document.getElementById('personDetails');
                        return personDetails ? personDetails.innerHTML : '';
                    });
                    
                    console.log('Member details:', memberDetails);
                    
                    // Take final screenshot
                    await page.screenshot({ 
                        path: '/Users/nahomnigatu/Downloads/registrationatlabo/screenshot-member-info.png',
                        fullPage: true 
                    });
                    console.log('Member info screenshot saved as screenshot-member-info.png');
                }
            }
        } else {
            console.log('Israel Hora NOT found in suggestions');
            
            // Let's also check what members are actually loaded
            const sampleMembers = await page.evaluate(() => {
                if (window.members && window.members.length > 0) {
                    return window.members.slice(0, 5).map(member => ({
                        firstName: member.firstName,
                        lastName: member.lastName,
                        memberId: member.memberId
                    }));
                }
                return [];
            });
            
            console.log('Sample members loaded:', sampleMembers);
            
            // Search for any member with "Israel" in the name
            const israelMembers = await page.evaluate(() => {
                if (window.members) {
                    return window.members.filter(member => 
                        member.firstName.toLowerCase().includes('israel') ||
                        member.lastName.toLowerCase().includes('israel')
                    ).map(member => ({
                        firstName: member.firstName,
                        lastName: member.lastName,
                        memberId: member.memberId
                    }));
                }
                return [];
            });
            
            console.log('Members with "Israel" in name:', israelMembers);
        }
        
        // Summary
        console.log('\n=== TEST SUMMARY ===');
        console.log(`Excel data loaded: ${membersCount > 0 ? 'YES' : 'NO'} (${membersCount} members)`);
        console.log(`Suggestions appeared: ${suggestionsVisible ? 'YES' : 'NO'}`);
        console.log(`Israel Hora found: ${israelHoraFound ? 'YES' : 'NO'}`);
        console.log('Screenshots saved for verification');
        
    } catch (error) {
        console.error('Test failed with error:', error);
    } finally {
        await browser.close();
        stopServer();
    }
}

// Run the test
testCheckInPage().then(() => {
    console.log('Test completed');
}).catch(error => {
    console.error('Test error:', error);
}).finally(() => {
    stopServer();
    process.exit(0);
});