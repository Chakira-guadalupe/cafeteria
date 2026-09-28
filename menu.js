document.addEventListener("DOMContentLoaded", () => {
    const orderModal = document.getElementById("order-modal");
    const successModal = document.getElementById("success-modal");
    const modalDishTitle = document.getElementById("modal-dish-title");
    const modalDishPrice = document.getElementById("modal-dish-price");
    const modalIngredientsList = document.getElementById("modal-ingredients-list");
    const btnCancel = document.getElementById("btn-cancel");
    const orderForm = document.getElementById("order-form");
    const ticketNumber = document.getElementById("ticket-number");

    let currentDish = null;

    // Escuchar clics en los botones "Pedir Ahora"
    document.querySelectorAll(".btn-order").forEach(button => {
        button.addEventListener("click", () => {
            const name = button.getAttribute("data-name");
            const price = button.getAttribute("data-price");
            const ingredients = button.getAttribute("data-ingredients").split(",");

            currentDish = { name, price };

            modalDishTitle.textContent = name;
            modalDishPrice.textContent = `$${parseFloat(price).toFixed(2)}`;

            // Limpiar e insertar ingredientes con checkbox
            modalIngredientsList.innerHTML = "";
            ingredients.forEach((ing) => {
                const label = document.createElement("label");
                label.className = "checkbox-item";
                label.innerHTML = `
                    <input type="checkbox" name="ingredient" value="${ing.trim()}" checked>
                    <span>${ing.trim()}</span>
                `;
                modalIngredientsList.appendChild(label);
            });

            orderModal.classList.remove("hidden");
        });
    });

    // Cancelar pedido en el modal
    if (btnCancel) {
        btnCancel.addEventListener("click", () => {
            orderModal.classList.add("hidden");
        });
    }

    // Confirmar Pedido
    if (orderForm) {
        orderForm.addEventListener("submit", (e) => {
            e.preventDefault();
            orderModal.classList.add("hidden");

            // Generar número de folio dinámico según la sección
            const prefix = window.location.pathname.includes("desayunos") ? "DES" :
                           window.location.pathname.includes("almuerzos") ? "ALM" : "POS";
            const randomNum = Math.floor(100 + Math.random() * 900);
            
            if (ticketNumber) {
                ticketNumber.textContent = `#${prefix}-${randomNum}`;
            }

            successModal.classList.remove("hidden");
        });
    }
});