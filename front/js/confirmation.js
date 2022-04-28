const orderId = getOrderId()
displayOrderId(orderId)
endOrder()


function getOrderId(){
    const orderNumber = window.location.search;
    const urlParams = new URLSearchParams(orderNumber) 
    return urlParams.get("orderId")
}


function displayOrderId(orderId){
    const orderIdElement = document.querySelector("#orderId")
    orderIdElement.textContent = orderId
}

function endOrder(){
    const localStorage = window.localStorage
    localStorage.clear()
}