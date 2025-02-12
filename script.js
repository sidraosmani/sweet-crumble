// Initialize EmailJS with your user ID
emailjs.init("vDTjbx2GcULtYRlUP"); // Public key

document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.getElementById("btn");
    const form = document.getElementById("cakeOrderForm");

    const deliveryDropdown = document.getElementById("delivery");
    const addressField = document.getElementById("address");

    // Listen for changes in the delivery dropdown to show/hide the address field
    deliveryDropdown.addEventListener("change", function () {
        if (deliveryDropdown.value === "delivery") {
            addressField.style.display = "block"; // Show address field for delivery
        } else {
            addressField.style.display = "none"; // Hide address field for pickup
        }
    });

    // Trigger the event to handle initial visibility of the address field
    deliveryDropdown.dispatchEvent(new Event("change"));

    submitButton.addEventListener("click", function () {
        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const orderDate = document.getElementById("orderDate").value;
        const delivery = document.getElementById("delivery").value;
        const address = document.getElementById("address").value.trim();
        const customOrder = document.getElementById("customOrder").value.trim();
        const instructions = document.getElementById("instructions").value.trim();

        // Basic validation to ensure all required fields are filled
        if (!name || !phone || !orderDate || !delivery) {
            alert("Please fill in all required fields.");
            return;
        }

        const orderData = {
            name: name,
            phone: phone,
            email: email, // Send the customer's email as part of the data
            orderDate: orderDate,
            delivery: delivery,
            address: address,
            customOrder: customOrder,
            instructions: instructions,
        };

        // Send the order data via EmailJS
        emailjs.send("service_atnr21r", "template_rkbutuh", {
            to_email: "officialsweetcrumble@gmail.com",  // Recipient's email address
            from_email: email,  // Customer's email address
            reply_to: email,  // Reply-To will be the customer's email address
            name: name,
            phone: phone,
            orderDate: orderDate,
            delivery: delivery,
            address: address,
            customOrder: customOrder,
            instructions: instructions,
        })
        .then((response) => {
            console.log("SUCCESS", response);
            document.getElementById("statusMessage").textContent = "Order submitted successfully! Thank you for ordering.";
            document.getElementById("statusMessage").style.color = "green";
            form.reset(); // Reset the form after submission
        })
        .catch((error) => {
            console.error("FAILED", error);
            document.getElementById("statusMessage").textContent = "Error submitting order. Please try again.";
            document.getElementById("statusMessage").style.color = "red";
        });
    });
});
