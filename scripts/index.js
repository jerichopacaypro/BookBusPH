(()=>{

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyDLtt-DGO8AAlvFoIjHRNJrPNzOzK5CbF4",
        authDomain: "bookbusphdev.firebaseapp.com",
        databaseURL: "https://bookbusphdev.firebaseio.com",
        projectId: "bookbusphdev",
        storageBucket: "bookbusphdev.appspot.com",
        messagingSenderId: "283485482380",
        appId: "1:283485482380:web:3dd826e2a17e604d0d7aa9"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    $(document).ready(function(){
        $('select').formSelect();
        $('.parallax').parallax();
        $('.sidenav').sidenav();
        $('.modal').modal({
            dismissible: false
        });
        $('.datepicker').datepicker({
            yearRange: [1950,2021],
            container: 'body'
        });
    });

    var uid;
    var db              = firebase.firestore();
    var login           = document.getElementById('loginBtn');
    var emailaddress    = document.getElementById('email');
    var password        = document.getElementById('password');
    var eError          = document.getElementById('emailError');
    var pError          = document.getElementById('passError');
    var loginErr        = document.getElementById('loginError');
    var register        = document.getElementById('registerBtn');
    var regEmail        = document.getElementById('registerEmail');
    var regPass         = document.getElementById('registerPassword');
    var conPass         = document.getElementById('confirmPassword');
    var regEmailErr     = document.getElementById('regEmailError');
    var regPassErr      = document.getElementById('regPassError');
    var regConPassErr   = document.getElementById('regConPassError');
    var regErr          = document.getElementById('registerError');
    var host1           = document.getElementById('hostbtn1');
    var host2           = document.getElementById('hostbtn2');
    var account1        = document.getElementById('accountbtn1');
    var account2        = document.getElementById('accountbtn2');
    var login1          = document.getElementById('loginbtn1');
    var login2          = document.getElementById('loginbtn2');
    
    login.addEventListener('click', e=>{
        if(emailaddress.value == "" && password.value != ""){
            eError.classList.remove('hide');
            pError.classList.add('hide');
        }else if(emailaddress.value != "" && password.value == ""){
            eError.classList.add('hide');
            pError.classList.remove('hide');
        }else if(emailaddress.value == "" && password.value == ""){
            eError.classList.remove('hide');
            pError.classList.remove('hide');
        }else{
            eError.classList.add('hide');
            pError.classList.add('hide');

            var email = emailaddress.value;
            var pass = password.value;
            
            firebase.auth().signInWithEmailAndPassword(email, pass).then(function(){
                $(document).ready(function(){
                    $('#loginModal').modal('close');
                    $('#loadModal').modal('open');
                });
                loginErr.classList.add('hide');
            }).catch(function(error) {
                emailaddress.value = "";
                password.value = "";
                loginErr.classList.remove('hide');
                loginErr.textContent = error.message;
            });
        }
    });
    
    conPass.addEventListener('keyup', e=>{
        if(regPass.value != conPass.value){
            conPass1.classList.remove('hide');
            conPass2.classList.remove('hide');
            register.disabled = true;
        }else{
            conPass1.classList.add('hide');
            conPass2.classList.add('hide');
            register.disabled = false;
        }
    });

    register.addEventListener('click', e=>{
        if(regEmail.value == "" && regPass.value != "" && conPass.value != ""){
            regEmailErr.classList.remove('hide');
            regPassErr.classList.add('hide');
            regConPassErr.classList.add('hide');
        }else if(regEmail.value == "" && regPass.value == "" && conPass.value != ""){
            regEmailErr.classList.remove('hide');
            regPassErr.classList.remove('hide');
            regConPassErr.classList.add('hide');
        }else if(regEmail.value == "" && regPass.value != "" && conPass.value == ""){
            regEmailErr.classList.remove('hide');
            regPassErr.classList.add('hide');
            regConPassErr.classList.remove('hide');
        }else if(regEmail.value != "" && regPass.value != "" && conPass.value == ""){
            regEmailErr.classList.add('hide');
            regPassErr.classList.add('hide');
            regConPassErr.classList.remove('hide');
        }else if(regEmail.value != "" && regPass.value == "" && conPass.value != ""){
            regEmailErr.classList.add('hide');
            regPassErr.classList.remove('hide');
            regConPassErr.classList.add('hide');
        }else if(regEmail.value != "" && regPass.value == "" && conPass.value == ""){
            regEmailErr.classList.add('hide');
            regPassErr.classList.remove('hide');
            regConPassErr.classList.remove('hide');
        }else if(regEmail.value == "" && regPass.value == "" && conPass.value == ""){
            regEmailErr.classList.remove('hide');
            regPassErr.classList.remove('hide');
            regConPassErr.classList.remove('hide');
        }else{
            regEmailErr.classList.add('hide');
            regPassErr.classList.add('hide');
            regConPassErr.classList.add('hide');

            var email = regEmail.value;
            var pass = regPass.value;

            firebase.auth().createUserWithEmailAndPassword(email, pass).then(function(){
                $(document).ready(function(){
                    $('#registerModal').modal('close');
                    $('#loadModal').modal('open');
                });
                regErr.classList.add('hide');
            }).catch(function(error) {
                regEmail.value = "";
                regPass.value = "";
                conPass.value = "";
                regErr.classList.remove('hide');
                regErr.textContent = error.message;
            });
        }
    });

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            uid = user.uid;
            db.collection('buscompany').doc(uid).get().then(function(doc){
                if(doc.exists){
                    window.location = 'host/index.html';
                }else{
                    if(user.emailVerified == false){
                        window.location = 'users/index.html';
                    }else{
                        host1.classList.add('hide');
                        host2.classList.add('hide');
                        account1.classList.remove('hide');
                        account2.classList.remove('hide');
                        login1.classList.add('hide');
                        login2.classList.add('hide');
                        $(document).ready(function(){
                            $('#loadModal').modal('close');
                        });
                    }
                }
            });
        } else {
            //nothing to do
            console.log('no user logged in');
            host1.classList.remove('hide');
            host2.classList.remove('hide');
            account1.classList.add('hide');
            account2.classList.add('hide');
            login1.classList.remove('hide');
            login2.classList.remove('hide');
        }
    });
})();