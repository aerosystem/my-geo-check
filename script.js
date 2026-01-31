document.addEventListener("DOMContentLoaded", function() {

    // Elements
    const loadingScreen = document.getElementById('loading-screen');
    const rejectScreen = document.getElementById('reject-screen');
    
    // Verification Time - 3 Seconds
    const delayTime = 3000;
    
    // API Call Start
    Promise.all([
        checkIP(), 
        new Promise(resolve => setTimeout(resolve, delayTime))
    ])
    .then(([result]) => {
        handleUser(result);
    })
    .catch(error => {
        console.error("Checking failed:", error);
        showRejectScreen();
    });

    // Main Function to check IP
    async function checkIP() {
        try {
            // Mulimna 'ipapi.co' eken try karanawa (Meka godak accurate)
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            
            return {
                country: data.country_code, // US
                // ipapi.co free eke vpn kiyala enne na, eth hosting/datacenter IPs allanawa
                isSuspicious: (data.asn && data.org && (data.org.includes("VPN") || data.org.includes("Hosting") || data.org.includes("Cloud"))),
                source: 'ipapi'
            };
        } catch (error) {
            console.warn("ipapi.co failed, trying backup...", error);
            
            // ipapi.co wada nethnam 'ipwho.is' eken try karanawa (Backup)
            try {
                const response2 = await fetch('https://ipwho.is/');
                const data2 = await response2.json();
                return {
                    country: data2.country_code,
                    isSuspicious: (data2.security.vpn || data2.security.proxy || data2.security.tor),
                    source: 'ipwhois'
                };
            } catch (err2) {
                throw new Error("All APIs failed");
            }
        }
    }

    function handleUser(data) {
        console.log("User Data:", data);

        const isUSA = data.country === 'US';
        const isSafe = !data.isSuspicious;

        // USA nam SAHA Suspicious nethnam (VPN nemei nam)
        if (isUSA && isSafe) {
            // Qualified! - Google ekata yanawa
            window.location.href = "https://lnksforyou.com/unlock/pUIhu4lg";
        } else {
            // Not Qualified
            console.log("Rejected: Not US or VPN Detected");
            showRejectScreen();
        }
    }

    function showRejectScreen() {
        if(loadingScreen) loadingScreen.style.opacity = '0';
        
        setTimeout(() => {
            if(loadingScreen) {
                loadingScreen.classList.add('hidden');
                loadingScreen.style.display = 'none';
            }
            if(rejectScreen) {
                rejectScreen.classList.remove('hidden');
                rejectScreen.style.display = 'flex'; // Pennanawa
            }
        }, 500); 
    }

});
