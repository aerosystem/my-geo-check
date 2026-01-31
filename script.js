document.addEventListener("DOMContentLoaded", function() {
    
    // API URL eka (Free, No key needed)
    const apiURL = "https://ipwho.is/";
    
    // Verification Time eka (Milliseconds walin) - 3 Seconds
    const delayTime = 3000;

    // Elements allagamu
    const loadingScreen = document.getElementById('loading-screen');
    const rejectScreen = document.getElementById('reject-screen');

    // API Call eka saha 3 Seconds delay eka ekata run karamu
    Promise.all([
        fetch(apiURL).then(response => response.json()), // API request
        new Promise(resolve => setTimeout(resolve, delayTime)) // 3 Sec wait
    ])
    .then(([data]) => {
        // Data awa, den check karamu
        checkUser(data);
    })
    .catch(error => {
        console.error("API Error:", error);
        // Error ekak awoth reject screen eka pennamu (Security purpose)
        showRejectScreen();
    });

    function checkUser(data) {
        // 1. Country eka USA da? (US)
        // 2. VPN ekak use karanawada? (data.security.vpn)
        // 3. Proxy ekak use karanawada? (data.security.proxy)
        // 4. Tor use karanawada? (data.security.tor)

        const isUSA = data.country_code === 'US';
        const isVPN = data.security.vpn === true;
        const isProxy = data.security.proxy === true;
        const isTor = data.security.tor === true;

        console.log("Country:", data.country_code);
        console.log("VPN:", isVPN, "Proxy:", isProxy);

        // Logic: USA nam SAHA VPN/Proxy nethnam witharak yanna denna
        if (isUSA && !isVPN && !isProxy && !isTor) {
            // Qualified! Google ekata redirect wenawa
            window.location.href = "https://lnksforyou.com/unlock/pUIhu4lg";
        } else {
            // Not Qualified! Message eka pennanna
            showRejectScreen();
        }
    }

    function showRejectScreen() {
        // Loading eka hangala, reject eka pennanawa smooth vidihata
        loadingScreen.style.opacity = '0';
        
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            rejectScreen.classList.remove('hidden');
        }, 500); // Animation eka iwara wenakan poddak innawa
    }

});