import './App.css'
import UserDashboard from "./components/user/UserDashboard.jsx";

function App() {

    return (
        <>

            <UserDashboard userId="95ce96b7-64f6-3c12-b330-50b081d72c11"
                           userName="User"
                           userAvatar="https://cdn-icons-png.flaticon.com/128/456/456212.png">
            </UserDashboard>
        </>
    )
}

export default App
