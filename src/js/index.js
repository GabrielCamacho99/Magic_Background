document.addEventListener("DOMContentLoaded", function() {
    
    //1st step: get submit form event to avoid page reload
    const form = document.querySelector(".form-group");
    const descriptionInput = document.getElementById("description");
    const htmlCode = document.getElementById("html-code");
    const cssCode = document.getElementById("css-code");
    const previewSection = document.getElementById("preview-section"); 
    
    form.addEventListener("submit", async function(event) {
        event.preventDefault(); // avoid reload

        //2nd step: obtain user textarea input
        const description = descriptionInput.value.trim();
        
        if(!description) {
            return;
        }
        //3rd step Show a loading indicator while requisition is being processed
        showLoading(true);

        //POST request to n8n API
        try{
            const answer = await fetch("https://gabriel31299.app.n8n.cloud/webhook/magic-background",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({description})
            });

            const data = await answer.json();
            htmlCode.textContent = data.html || "";
            cssCode.textContent = data.css || "";

            previewSection.style.display = "block";
            previewSection.innerHTML = data.html || "";

            //Apply CSS to our preview-section
            let tagStyle = document.getElementById("dynamic-style");
            // if this tag already exists , remove before creating new
            if(tagStyle) {
                tagStyle.remove();
            }

            if(data.css) {
                tagStyle = document.createElement("style");
                tagStyle.id = "dynamic-style";
                tagStyle.textContent = data.css;
                document.head.appendChild(tagStyle);
            }
            

        }catch(error){
            console.error("Error while sending request: ", error);
            htmlCode.textContent = "Couldn't generate HTML , try again please.";
            cssCode.textContent = "Couldn't generate CSS , try again please.";
            previewSection.innerHTML = "";
        }finally{
            showLoading(false);
        }
    });

    function showLoading (isLoading) {
        const buttonSend = document.getElementById("gen-btn");
        if(isLoading) {
            buttonSend.textContent = "Generating your Magic Background..."
        }else {
            buttonSend.textContent = "Generate your Magic Background..."
        }
    }

});


    
