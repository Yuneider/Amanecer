function generateSecurityCode() {
    fetch('/generateSecurityCode', {
        method: 'POST'
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.log(error))
}