const toggleVisible = (event) => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    }
    else {
        passwordInput.type = 'password';
    }
}

const passwordInput = document.getElementById('password');
const toggleButton = document.getElementById('toggleButton');
const rememberMe = document.getElementById('remember');
toggleButton.addEventListener('click', toggleVisible);



window.onload = function() {
    const savedPassword = localStorage.getItem('password');
    if(savedPassword){
        document.getElementById('password').value = savedPassword;
        document.getElementById('remember').checked = true;
    }
}


document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Get the values from the input fields
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Clear previous error messages
    document.getElementById('missing-info-error').style.display = 'none';
    document.getElementById('username-error').style.display = 'none';
    document.getElementById('password-error').style.display = 'none';
    //errorMessage.textContent = '';


    // Check input for empty fields
    if (username === '' || password === '') {
        
        usernameInput.style.border = '2px solid red';
        passwordInput.style.border = '2px solid red';
        document.getElementById('missing-info-error').style.display = 'block';
        return;
    } 


    // Check password regex (8 characters, one upper, one lower, one special)
    /* if (password != "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$") {
        usernameInput.style.border = '2px solid red';
        passwordInput.style.border = '2px solid red';
        console.log('password must contain one uppercase, one lowercase, one special character, etc...');
        return;
    } */

    try {
        // If username and password exist, POST to server API
        const response = await fetch('/login/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const data = await response.json();
           // errorMessage.textContent = data.message; // Display error message

           // If *either* the username or password are invalid, BOTH input borders go red
            if (data.message.includes('invalid-credentials')) {
                usernameInput.style.border = '2px solid red';
                document.getElementById('username-error').style.display = 'block';
                passwordInput.style.border = '2px solid red';
                document.getElementById('password-error').style.display = 'block';
            }   

            return; // Stop further execution
        }
        
        // If the user has checked the "Remember Password" box, store the password in the browser Local Storage. 
        if(document.getElementById('remember').checked) {
            localStorage.setItem('password', password)
        } else {
            localStorage.removeItem('password') // Remove the password from Local Storage if the form is submitted without the box checked
        }
        
        console.log('Login successful:');
        window.location.href = '/dashboard'; // Adjust the URL as necessary
        
        
    } catch (error) {
        console.error('Error:', error.message);
        //errorMessage.textContent = 'An unexpected error occurred.';
    }
});