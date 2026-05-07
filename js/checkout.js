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
    modal.innerHTML = `
        <div class="modal-content" style="box-sizing: border-box; width: 92%; max-width: 380px; padding: 25px 20px 40px; border-radius: 24px; background: #1e293b; border: 1px solid #f3ba2f; position: relative; color: white; margin: 40px auto 100px auto; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
            <span class="close-modal" style="position: absolute; top: 15px; right: 20px; font-size: 30px; color: #94a3b8; cursor: pointer; font-weight: bold; line-height: 1; z-index: 10;">&times;</span>
            <div style="text-align: center; padding-top: 10px;">
                <h2 style="font-size: 1.2rem; color: #f3ba2f; margin: 0 0 15px 0;">🔶 Binance Pay Checkout</h2>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${binanceWallet}" alt="Binance QR" style="width: 130px; height: 130px; background: #fff; padding: 8px; border-radius: 12px; margin-bottom: 15px; display: block; margin-left: auto; margin-right: auto; border: 2px solid #f3ba2f;">
                <p style="font-weight: 700; font-size: 1rem; color: #fff; margin: 0 0 10px 0;">Total: $${amount} USDT (TRC-20)</p>
                <div style="box-sizing: border-box; font-family: monospace; font-size: 0.75rem; background: rgba(0,0,0,0.3); padding: 12px; border-radius: 10px; border: 1px dashed #f3ba2f; word-break: break-all; width: 100%; color: #f3ba2f;">${binanceWallet}</div>
                <button id="copyBtn" style="box-sizing: border-box; width: 100%; margin: 12px 0 0 0; background: #334155; color: #fff; border: none; padding: 12px; border-radius: 10px; cursor: pointer; font-size: 0.9rem; font-weight: 600; display: block; transition: background 0.3s;">📋 Copy Address | نسخ</button>
            </div>
            <div style="margin-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;">
                <p style="font-size: 0.8rem; color: #94a3b8; text-align: center; margin: 0 0 12px 0;">After payment, send details via WhatsApp:</p>
                <input type="text" id="wa-name" placeholder="Full Name | الاسم الكامل" style="box-sizing: border-box; width: 100%; padding: 14px; margin-bottom: 10px; background: #0f172a; border: 1px solid #334155; color: #fff; border-radius: 10px; font-size: 0.9rem; display: block;">
                <textarea id="wa-address" placeholder="Shipping Address | عنوان الشحن" style="box-sizing: border-box; width: 100%; padding: 14px; height: 80px; background: #0f172a; border: 1px solid #334155; color: #fff; border-radius: 10px; font-size: 0.9rem; resize: none; display: block; margin-bottom: 15px;"></textarea>
                <button id="sendWaBtn" style="box-sizing: border-box; width: 100%; background: #22c55e; color: #fff; padding: 18px 10px; border-radius: 12px; border: none; font-weight: 800; cursor: pointer; font-size: 1.1rem; display: block; box-shadow: 0 10px 20px rgba(34,197,94,0.3); transition: transform 0.2s;">✅ Send Proof via WhatsApp | إرسال</button>
            </div>
        </div>
    `;
    
    // Instead of flex, use block or grid to ensure scrolling works reliably on all mobile browsers
    modal.style.display = 'block';
    modal.style.overflowY = 'auto';
    modal.style.padding = '20px 0 80px 0'; // Extra padding at bottom to prevent cutoff
    modal.scrollTop = 0;
    
    document.body.style.overflow = 'hidden';
    
    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    };
    document.querySelector('.close-modal').onclick = closeModal;
    window.onclick = (e) => { if (e.target === modal) closeModal(); };
    
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
        modal.style.display = 'none';
    };
}
