<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechWare Login</title>
    <style>
        body {
            font-family: Georgia, 'Times New Roman', Times, serif;
            background-color: rgb(29, 24, 54);
        }
        .mybox {
            position: relative; /* Added */
            justify-content: center;
            margin: 50px auto;
            background-color: rgb(25, 20, 38);
            text-align: center;
            padding: 15px;
            height: 450px;
            width: 600px;
            box-shadow: 0 3px 6px rgba(5, 5, 5, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
            color: #ECF0F5;
        }
        .login-text {
            color: rgb(247, 248, 249);
            padding: 4px;
            font-size: larger;
        }
        .tab {
            padding: 5px;
            margin: 20px;
        }
        .tab input {
            width: 400px;
            height: 40px;
            padding: 8px;
            background-color: #bc9dd832;
            border-bottom: #ECF0F5;
            font-size: 18px;
        }
        .tab td {
            font-size: large;
            color:#ECF0F5
        }
        .logos {
            max-width: fit-content;
            max-height: 60px;
        }
        .bt {
            padding: 8px;
            width: 80px;
            height: 40px;
            font-size: large;
            background-color: rgba(110, 74, 134, 0.482);
            color: #ECF0F5;
            border: 1px inset black;
        }
        .bt:hover {
            padding: 9px;
            width: 85px;
            height: 45px;
        }
        .logo-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('TechWare-logo.jpg');
            background-repeat: repeat;
            filter: blur(3px);
            opacity: 0.3;
            background-size: 200px;
            z-index: -1; 
        }
        .create-account {
            text-align: center;
            margin-top: 20px;
        }
        .create-account p {
            color: #ccc;
            font-size: 16px;
        }
        .create-account a {
            color: #3498db;
            text-decoration: none;
        }
        .create-account a:hover {
            text-decoration: underline;
        }
        .logout {
            position: absolute; /* Added */
            top: 10px; /* Added */
            right: 10px; /* Added */
        }
    </style>
</head>
<body>
    <div class="logo-container"></div>
    <div class="mybox">
        <div class="login-text">
            <h1>Login</h1>
        </div>
        <div class="logout"> <!-- Moved logout button inside mybox -->
            <form action="logout.php" method="post">
                <button type="submit" class="bt">Logout</button>
            </form>
        </div>
        <hr>

        <div class="box1">
            <form name="loginForm" action="" method="post" onsubmit="return validateForm()">
                <div class="tab">
                    <table>
                        <tr>
                            <td><img src="./icons8-username-48.png" alt="" class="logos"></td>
                            <td>Username:</td>
                            <td><input type="text" name="username" required></td>
                        </tr>
                        <tr>
                            <td><br></td>
                        </tr>
                        <tr>
                            <td><img src="./icons8-lock-50.png" alt="" class="logos"></td>
                            <td>Password:</td>
                            <td><input type="password" name="password" required></td>
                        </tr>
                    </table>
                </div>
                <br>
                <br>
                <div class="submit">
                    <input type="submit" class="bt" name="login" value="Login">
                </div>
                <div class="create-account">
                    <p>Don't have an account? <a href="register.php">Create one</a></p>
                </div>
            </form>
        </div>
    </div>
</body>
</html>
<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['register'])) {
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $email = $_POST['email'];

    $servername = '127.0.0.1';
    $dbusername = 'root';
    $dbpassword = ''; // No password
    $dbname = 'user_auth';
    $port = 3306; // New port number

    // Create connection
    $conn = new mysqli($servername, $dbusername, $dbpassword, $dbname, $port);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    if ($stmt) {
        $stmt->bind_param('sss', $username, $email, $password);

        // Execute the statement
        if ($stmt->execute()) {
            echo "Registration successful. You can now <a href='login.php'>login</a>.";
        } else {
            echo "Error: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Prepare failed: " . $conn->error;
    }

    $conn->close();
} elseif ($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['login'])) {
    // Handle login logic here
    // Assuming you have a login form with inputs named 'username' and 'password'
    $username = $_GET['username'];
    $password = $_GET['password'];

    // Validate login credentials, check against database
    // Your login logic here

    // Example validation, replace this with your actual logic
    if ($username === 'demo' && $password === 'password') {
        echo "Login successful. Welcome, $username!";
    } else {
        echo "Invalid username or password.";
    }
}
?>
