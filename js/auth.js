/* =========================
   AUTHENTICATION
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const registerForm = document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim().toLowerCase();
            const password = document.getElementById("password").value;
            const confirmPassword =
                document.getElementById("confirmPassword").value;

            const message = document.getElementById("registerMessage");


            /* Empty fields */

            if (!name || !email || !password || !confirmPassword) {

                message.innerHTML = `
                    <div class="status status-error">
                        Please fill all fields.
                    </div>
                `;

                return;
            }


            /* Password length */

            if (password.length < 6) {

                message.innerHTML = `
                    <div class="status status-error">
                        Password must contain at least 6 characters.
                    </div>
                `;

                return;
            }


            /* Password match */

            if (password !== confirmPassword) {

                message.innerHTML = `
                    <div class="status status-error">
                        Passwords do not match.
                    </div>
                `;

                return;
            }


            /* Get existing users */

            const users =
                JSON.parse(localStorage.getItem("myLockerUsers")) || [];


            /* Duplicate email */

            const existingUser = users.find(
                user => user.email === email
            );

            if (existingUser) {

                message.innerHTML = `
                    <div class="status status-error">
                        An account with this email already exists.
                    </div>
                `;

                return;
            }


            /* Create user */

            const newUser = {
                id: Date.now(),
                name: name,
                email: email,
                password: password
            };


            users.push(newUser);

            localStorage.setItem(
                "myLockerUsers",
                JSON.stringify(users)
            );


            /* Success */

            message.innerHTML = `
                <div class="status status-success">
                    Account created successfully! Redirecting...
                </div>
            `;


            setTimeout(() => {
                window.location.href = "login.html";
            }, 1200);

        });

    }

});
