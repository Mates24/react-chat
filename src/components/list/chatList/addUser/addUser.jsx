import "./addUser.css";

const addUser = () => {
    return(
        <div className="addUser">
            <form>
                <input type="text" placeholder="Meno" name="username"/>
                <button>Hľadať</button>
            </form>
            <div className="user">
                <div className="detail">
                    <img src="../../../public/avatar.png" alt=""/>
                    <span>Mathias</span>
                </div>
                <button>Pridať</button>
            </div>
        </div>
    )
}

export default addUser;