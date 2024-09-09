function lightMode() {
    let element = document.body;
    element.className = "light-mode";
}
function darkMode() {
    let element = document.body;
    
    element.className = "dark-mode";
    
}
document.getElementById('hideButton').addEventListener('click', function() {
    var asideSection = document.getElementById('asideSection');
    if (asideSection.style.display === 'none') {
        asideSection.style.display = 'block';
    } else {
        asideSection.style.display = 'none';
    }
});
