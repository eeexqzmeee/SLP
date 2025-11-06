// Modal management
function openModal(modalType) {
    const modal = document.getElementById(modalType + 'Modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = '';
}

// Tariff selection
function selectTariff(tariffCard) {
    // Remove selection from all cards
    document.querySelectorAll('.tariff-row').forEach(card => {
        card.style.borderColor = '';
    });
    
    // Select clicked card
    tariffCard.style.borderColor = 'var(--primary)';
    
    // Update pay button
    const price = tariffCard.querySelector('.tariff-price').textContent;
    document.querySelector('.pay-button').textContent = `Оплатить ${price}`;
}

// Payment processing
function processPayment() {
    alert('Оплата будет выполнена через Telegram');
    closeModal();
}

// Config download
function downloadConfig() {
    const config = `[Interface]
PrivateKey = user_private_key
Address = 10.0.0.2/32
DNS = 1.1.1.1

[Peer]
PublicKey = server_public_key
Endpoint = proxy.silence-vpn.com:51820
AllowedIPs = 0.0.0.0/0`;
    
    const blob = new Blob([config], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'silence-proxy.conf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Конфигурационный файл скачан');
}

// Close modal when clicking on backdrop
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
});

// Initialize Telegram Web App
if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.ready();
    Telegram.WebApp.expand();
}