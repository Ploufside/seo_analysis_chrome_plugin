function analyzePage() {

  // Récupère l'URL de la page courante
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var currentTab = tabs[0];
    var currentUrl = currentTab.url;
    var currentHostname = new URL(currentUrl).hostname;
    console.log("URL actuelle : " + currentUrl);
    console.log("Hostname actuel : " + currentHostname);
    
    // Liste des URL à ouvrir
    var targetUrls = [
        "https://app.seobserver.com/sites/view/" + currentHostname,
        "https://web.archive.org/web/*/" + currentHostname,
        "https://www.whois.com/whois/" + currentHostname,
        "https://webpagetest.org/?url=" + currentUrl,
        "https://gtmetrix.com/?url=" + currentUrl,
        "https://validator.schema.org/#url=" + currentUrl,
        "https://www.google.com/search?q=site:" + currentUrl,
        "https://search.google.com/test/mobile-friendly?hl=fr&url=" + currentUrl,
        "https://validator.w3.org/nu/?doc=" + currentUrl,
        "https://similarweb.com/website/" + currentHostname,
        "https://insight.yooda.com/",
        "https://fr.semrush.com/analytics/overview/?q=" + currentUrl + "&searchType=domain"
    ];

    // Ouvre les URL dans des onglets
    var index = 0;
    var interval = setInterval(function() {
        if (index < targetUrls.length) {
            chrome.tabs.create({"active":false, url: targetUrls[index]});
            index++;
        } else {
            clearInterval(interval);
        }
    }, 200);
  });
  
}

// Lorsque l'utilisateur clique sur le bouton
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("seo-button").addEventListener("click", function() {
    analyzePage(true);
  });
});