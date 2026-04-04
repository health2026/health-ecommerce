const toggle = document.getElementById("themeToggle");

if (toggle) {
  toggle.onclick = () => {
    document.body.classList.toggle("light");
  }
}

const cards = document.querySelectorAll(".card");

function handleScroll() {
  cards.forEach(card => {
    let top = card.getBoundingClientRect().top;
    if (top < window.innerHeight - 50) {
      card.style.opacity = 1;
      card.style.transform = "translateY(0px)";
    }
  });
}

window.addEventListener("scroll", handleScroll);
handleScroll(); // Initial check

// Countdown Timer Logic
function startCountdown() {
    const timerElement = document.getElementById('countdown-timer');
    if (!timerElement) return;

    let totalSeconds = 12 * 60 * 60; // 12 hours start

    function update() {
        let hours = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor((totalSeconds % 3600) / 60);
        let seconds = totalSeconds % 60;

        timerElement.innerHTML = 
            (hours < 10 ? '0' : '') + hours + "h : " + 
            (minutes < 10 ? '0' : '') + minutes + "m : " + 
            (seconds < 10 ? '0' : '') + seconds + "s";

        totalSeconds--;
        if (totalSeconds < 0) totalSeconds = 12 * 60 * 60; // Reset
    }

    update();
    setInterval(update, 1000);
}

startCountdown();

// PayPal Modern Integration Logic
function initAdvancedCardFields(itemName, amount, btnId, numId, expId, cvvId, submitId) {
    if (!document.querySelector(btnId)) return;
    
    const divider = document.querySelector('.payment-divider');
    const nativeForm = document.querySelector('.native-card-form');
    const trustedBadges = document.querySelector('.trusted-badges');

    // 1. Render Modern Smart Buttons (Fallback and alternate payment options)
    paypal.Buttons({
        experience_context: {
            shipping_preference: 'NO_SHIPPING',
            user_action: 'PAY_NOW',
            landing_page: 'billing' 
        },
        style: { shape: 'rect', color: 'blue', layout: 'vertical' },
        createOrder: (data, actions) => actions.order.create({ purchase_units: [{ description: itemName, amount: { value: amount } }] }),
        onApprove: (data, actions) => actions.order.capture().then(details => { 
            window.location.href = 'shipping.html'; 
        })
    }).render(btnId);

    // 2. Initialize Native Advanced Card Fields (if eligible)
    if (paypal.CardFields && paypal.CardFields().isEligible()) {
        const cardField = paypal.CardFields({
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{ description: itemName, amount: { value: amount } }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    window.location.href = 'shipping.html';
                });
            },
            onError: function(err) {
                console.error("Card Payment Error:", err);
                alert("حدث خطأ في عملية الدفع، يرجى المحاولة باستخدام زر PayPal.");
            }
        });

        // Ensure fields are rendered
        if(document.querySelector(numId) && document.querySelector(expId) && document.querySelector(cvvId)) {
            cardField.NumberField({ style: { input: { 'font-size': '16px', 'color': '#333' } } }).render(numId);
            cardField.ExpiryField({ style: { input: { 'font-size': '16px', 'color': '#333' } } }).render(expId);
            cardField.CVVField({ style: { input: { 'font-size': '16px', 'color': '#333' } } }).render(cvvId);

            document.querySelector(submitId).addEventListener('click', () => {
                const btn = document.querySelector(submitId);
                const originalText = btn.innerHTML;
                btn.innerHTML = 'جاري المعالجة... | Processing...';
                cardField.submit().catch(() => {
                    btn.innerHTML = originalText;
                });
            });
        }
    } else {
        // Hide native UI if Advanced Card Fields is not supported by Sandbox / Account
        if (divider) divider.style.display = 'none';
        if (nativeForm) nativeForm.style.display = 'none';
        if (trustedBadges) trustedBadges.style.display = 'none';
    }
}

// Simple PayPal Button for products.html
function initPayPalButton(itemName, amount, btnId) {
    if (!document.querySelector(btnId)) return;
    paypal.Buttons({
        experience_context: {
            shipping_preference: 'NO_SHIPPING',
            user_action: 'PAY_NOW',
            landing_page: 'billing' 
        },
        style: { shape: 'rect', color: 'blue', layout: 'vertical' },
        createOrder: (data, actions) => actions.order.create({ purchase_units: [{ description: itemName, amount: { value: amount } }] }),
        onApprove: (data, actions) => actions.order.capture().then(details => { 
            window.location.href = 'shipping.html'; 
        })
    }).render(btnId);
}
