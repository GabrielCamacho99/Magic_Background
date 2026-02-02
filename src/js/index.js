document.addEventListener("DOMContentLoaded", function() {
    
    //1st step: get submit form event to avoid page reload
    const form = document.querySelector(".form-group");
    const descriptionInput = document.getElementById("description");
    
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // avoid reload

        //2nd step: obtain user textarea input
        const description = descriptionInput.value;
        console.log(description);
    })
});


    
