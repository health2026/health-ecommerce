<<<<<<< HEAD
// Final Working System v400.0
const BUSINESS_EMAIL = 'rhiatabdellah712@gmail.com';

function initAdvancedCardFields(itemName, amount, btnId) {
    const container = document.querySelector(btnId);
    if (!container) return;

    // 2. Render the Black Card button (which you said was working)
    if (window.paypal) {
        paypal.Buttons({
            fundingSource: paypal.FUNDING.CARD,
            style: { 
                layout: 'vertical', 
                color: 'black', 
                shape: 'rect', 
                label: 'pay', 
                height: 50 
            },
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [{
                        amount: { value: amount },
                        description: itemName
                    }]
                });
            },
            onApprove: (data, actions) => {
                return actions.order.capture().then(() => {
                    window.location.href = 'thanks.html';
                });
            }
        }).render(btnId); // Render directly to the ID provided
    }
}

function initOtherPayments(itemName, amount, cardBtnId, binanceBtnId) {
    const binanceBtn = document.querySelector(binanceBtnId);
    if (binanceBtn) {
        binanceBtn.onclick = () => showBinanceModal(itemName, amount);
    }
}

function showBinanceModal(itemName, amount) {
    const binanceWallet = "TYy7YAYg7LbM83vLSM7VrFVcM394fTEvMG";
    let modal = document.getElementById('binanceModal');
    if (!modal) {
        document.body.insertAdjacentHTML('beforeend', `<div id="binanceModal" class="modal"></div>`);
        modal = document.getElementById('binanceModal');
    }
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    modal.innerHTML = `
        <div class="modal-content" style="box-sizing: border-box; width: 92%; max-width: 360px; max-height: 90vh; overflow-y: auto; padding: 20px; border-radius: 16px; background: #1e293b; border: 1px solid #f3ba2f; position: relative;">
            <span class="close-modal" style="position: absolute; top: 12px; right: 16px; font-size: 26px; color: #94a3b8; cursor: pointer; font-weight: bold; line-height: 1;">&times;</span>
            <div style="text-align: center; padding-top: 10px;">
                <h2 style="font-size: 1rem; color: #f3ba2f; margin-bottom: 10px; margin-top: 0;">🔶 Binance Pay Checkout</h2>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${binanceWallet}" alt="Binance QR" style="width: 110px; height: 110px; background: #fff; padding: 6px; border-radius: 10px; margin-bottom: 10px; display: block; margin-left: auto; margin-right: auto;">
                <p style="font-weight: 700; font-size: 0.9rem; color: #fff; margin-bottom: 6px; margin-top: 0;">Total: $${amount} USDT (TRC-20)</p>
                <div style="box-sizing: border-box; font-family: monospace; font-size: 0.65rem; background: rgba(255,255,255,0.05); padding: 8px; border-radius: 8px; border: 1px dashed #f3ba2f; word-break: break-all; width: 100%;">${binanceWallet}</div>
                <button id="copyBtn" style="box-sizing: border-box; width: 100%; margin: 10px 0 0 0; background: #334155; color: #fff; border: none; padding: 10px; border-radius: 8px; cursor: pointer; font-size: 0.85rem; display: block;">📋 Copy Address | نسخ العنوان</button>
            </div>
            <div style="margin-top: 14px;">
                <p style="font-size: 0.7rem; color: #94a3b8; text-align: center; margin-bottom: 8px; margin-top: 0;">After payment, send details via WhatsApp:</p>
                <input type="text" id="wa-name" placeholder="Full Name | الاسم الكامل" style="box-sizing: border-box; width: 100%; padding: 10px; margin-bottom: 8px; background: #0f172a; border: 1px solid #334155; color: #fff; border-radius: 8px; font-size: 0.85rem; display: block;">
                <textarea id="wa-address" placeholder="Shipping Address | عنوان الشحن" style="box-sizing: border-box; width: 100%; padding: 10px; height: 60px; background: #0f172a; border: 1px solid #334155; color: #fff; border-radius: 8px; font-size: 0.85rem; resize: none; display: block; margin-bottom: 0;"></textarea>
                <button id="sendWaBtn" style="box-sizing: border-box; width: 100%; margin-top: 12px; background: #22c55e; color: #fff; padding: 16px 10px; border-radius: 10px; border: none; font-weight: 800; cursor: pointer; font-size: 1rem; display: block; box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4); letter-spacing: 0.5px;">✅ Send Proof via WhatsApp | إرسال</button>
            </div>
        </div>
    `;
    modal.style.display = 'flex';
    modal.scrollTop = 0;
    
    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scroll
    };
    
    document.querySelector('.close-modal').onclick = closeModal;
    window.onclick = (event) => { if (event.target == modal) closeModal(); };
    
    document.getElementById('copyBtn').onclick = () => {
        navigator.clipboard.writeText(binanceWallet).then(() => {
            const btn = document.getElementById('copyBtn');
            btn.textContent = "Copied! | تم النسخ";
            setTimeout(() => btn.textContent = "Copy Address | نسخ", 2000);
        });
    };
    
    document.getElementById('sendWaBtn').onclick = () => {
        const name = document.getElementById('wa-name').value.trim();
        const address = document.getElementById('wa-address').value.trim();
        if (!name || !address) { alert("Please complete your details | يرجى إكمال البيانات"); return; }
        const message = encodeURIComponent(`*Order Request*\nProduct: ${itemName}\nAmount: $${amount} USDT\nName: ${name}\nAddress: ${address}`);
        window.open(`https://wa.me/212641617786?text=${message}`, '_blank');
        closeModal();
    };
}
=======
// Final Working System v400.0
const BUSINESS_EMAIL = 'rhiatabdellah712@gmail.com';

function initAdvancedCardFields(itemName, amount, btnId) {
    const container = document.querySelector(btnId);
    if (!container) return;

    // 2. Render the Black Card button (which you said was working)
    if (window.paypal) {
        paypal.Buttons({
            fundingSource: paypal.FUNDING.CARD,
            style: { 
                layout: 'vertical', 
                color: 'black', 
                shape: 'rect', 
                label: 'pay', 
                height: 50 
            },
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [{
                        amount: { value: amount },
                        description: itemName
                    }]
                });
            },
            onApprove: (data, actions) => {
                return actions.order.capture().then(() => {
                    window.location.href = 'thanks.html';
                });
            }
        }).render(btnId); // Render directly to the ID provided
    }
}

function initOtherPayments(itemName, amount, cardBtnId, binanceBtnId) {
    const binanceBtn = document.querySelector(binanceBtnId);
    if (binanceBtn) {
        binanceBtn.onclick = () => showBinanceModal(itemName, amount);
    }
}

function showBinanceModal(itemName, amount) {
    const binanceWallet = "TYy7YAYg7LbM83vLSM7VrFVcM394fTEvMG";
    let modal = document.getElementById('binanceModal');
    if (!modal) {
        document.body.insertAdjacentHTML('beforeend', `<div id="binanceModal" class="modal"></div>`);
        modal = document.getElementById('binanceModal');
    }
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    modal.innerHTML = `
        <div class="modal-content" style="box-sizing: border-box; width: 92%; max-width: 360px; max-height: 90vh; overflow-y: auto; padding: 20px; border-radius: 16px; background: #1e293b; border: 1px solid #f3ba2f; position: relative;">
            <span class="close-modal" style="position: absolute; top: 12px; right: 16px; font-size: 26px; color: #94a3b8; cursor: pointer; font-weight: bold; line-height: 1;">&times;</span>
            <div style="text-align: center; padding-top: 10px;">
                <h2 style="font-size: 1rem; color: #f3ba2f; margin-bottom: 10px; margin-top: 0;">🔶 Binance Pay Checkout</h2>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${binanceWallet}" alt="Binance QR" style="width: 110px; height: 110px; background: #fff; padding: 6px; border-radius: 10px; margin-bottom: 10px; display: block; margin-left: auto; margin-right: auto;">
                <p style="font-weight: 700; font-size: 0.9rem; color: #fff; margin-bottom: 6px; margin-top: 0;">Total: $${amount} USDT (TRC-20)</p>
                <div style="box-sizing: border-box; font-family: monospace; font-size: 0.65rem; background: rgba(255,255,255,0.05); padding: 8px; border-radius: 8px; border: 1px dashed #f3ba2f; word-break: break-all; width: 100%;">${binanceWallet}</div>
                <button id="copyBtn" style="box-sizing: border-box; width: 100%; margin: 10px 0 0 0; background: #334155; color: #fff; border: none; padding: 10px; border-radius: 8px; cursor: pointer; font-size: 0.85rem; display: block;">📋 Copy Address | نسخ العنوان</button>
            </div>
            <div style="margin-top: 14px;">
                <p style="font-size: 0.7rem; color: #94a3b8; text-align: center; margin-bottom: 8px; margin-top: 0;">After payment, send details via WhatsApp:</p>
                <input type="text" id="wa-name" placeholder="Full Name | الاسم الكامل" style="box-sizing: border-box; width: 100%; padding: 10px; margin-bottom: 8px; background: #0f172a; border: 1px solid #334155; color: #fff; border-radius: 8px; font-size: 0.85rem; display: block;">
                <textarea id="wa-address" placeholder="Shipping Address | عنوان الشحن" style="box-sizing: border-box; width: 100%; padding: 10px; height: 60px; background: #0f172a; border: 1px solid #334155; color: #fff; border-radius: 8px; font-size: 0.85rem; resize: none; display: block; margin-bottom: 0;"></textarea>
                <button id="sendWaBtn" style="box-sizing: border-box; width: 100%; margin-top: 12px; background: #22c55e; color: #fff; padding: 16px 10px; border-radius: 10px; border: none; font-weight: 800; cursor: pointer; font-size: 1rem; display: block; box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4); letter-spacing: 0.5px;">✅ Send Proof via WhatsApp | إرسال</button>
            </div>
        </div>
    `;
    modal.style.display = 'flex';
    modal.scrollTop = 0;
    
    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scroll
    };
    
    document.querySelector('.close-modal').onclick = closeModal;
    window.onclick = (event) => { if (event.target == modal) closeModal(); };
    
    document.getElementById('copyBtn').onclick = () => {
        navigator.clipboard.writeText(binanceWallet).then(() => {
            const btn = document.getElementById('copyBtn');
            btn.textContent = "Copied! | تم النسخ";
            setTimeout(() => btn.textContent = "Copy Address | نسخ", 2000);
        });
    };
    
    document.getElementById('sendWaBtn').onclick = () => {
        const name = document.getElementById('wa-name').value.trim();
        const address = document.getElementById('wa-address').value.trim();
        if (!name || !address) { alert("Please complete your details | يرجى إكمال البيانات"); return; }
        const message = encodeURIComponent(`*Order Request*\nProduct: ${itemName}\nAmount: $${amount} USDT\nName: ${name}\nAddress: ${address}`);
        window.open(`https://wa.me/212641617786?text=${message}`, '_blank');
        closeModal();
    };
}
>>>>>>> 7c6b2b5 (Fix mobile UI and visibility)
