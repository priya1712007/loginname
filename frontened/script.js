const API_URL = "http://localhost:5000";

async function signup() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${API_URL}/signup`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    const data = await response.json();

    document.getElementById("msg").innerText = data.message;
}


async function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    const data = await response.json();

    document.getElementById("msg").innerText = data.message;
}