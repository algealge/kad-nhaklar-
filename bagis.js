// Bağış formu gönderildiğinde
document.getElementById("donation-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Sayfanın yenilenmesini engeller

    // Formdan verileri alalım
    const name = document.getElementById("donation-name").value;
    const email = document.getElementById("donation-email").value;
    const amount = document.getElementById("donation-amount").value;

    // Burada formun verilerini kullanabiliriz (örneğin sunucuya gönderebiliriz)
    // Ama şu an sadece başarı mesajını göstereceğiz

    // Başarı mesajını göster
    const successMessage = document.getElementById("success-message");
    successMessage.style.display = "block";

    // Başarı mesajını 5 saniye sonra gizle
    setTimeout(function() {
        successMessage.style.display = "none";
    }, 5000); // 5 saniye sonra kaybolur
});
