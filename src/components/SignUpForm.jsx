import { useState } from "react";

export default function SignUpForm({ setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const APISignUp ='https://fsa-jwt-practice.herokuapp.com/signup';

    async function handleSubmit(e) {
        e.preventDefault();
        //console.log("hello");
        try {
            const response = await fetch(APISignUp,
            {
                method: "POST",
                body: JSON.stringify({username, password})
            }
            );
            const result = await response.json();
            setToken(result.token);
            setSuccessMessage(result.message);
        }
        catch (error) {
            // store a server error in application state and display it
            setError(error.message);
        }
    }

    function validateForm() {
        if (username.length < 8) {
            alert('Invalid Form, username must be 8 characters long')
            return
        }
        if (password.length < 8) {
            alert('Invalid Form, Password must contain greater than or equal to 8 characters.')
            return
        }
        if (username == password) {
            alert('Invalid Form, Password cant be the same as username.')
            return
        }
    }

    return (
        <div className="signUpBlock">
            <h2>Sign Up</h2>
            {error && <p>{error}</p>}
            {successMessage && <p>{successMessage}</p>}
        <form onSubmit={handleSubmit}>
            <label className="username">
                Username: {" "}
                    <input
                        placeholder="Username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                />
            </label>
            <label className="password">
                Password: {" "}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                />
            </label>
                <button type="submit"
                    onClick={() => {
                        validateForm()
                    }}
                >Submit</button>
            </form>
        </div>
    )
}