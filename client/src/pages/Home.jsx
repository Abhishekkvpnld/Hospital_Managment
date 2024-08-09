
import Biography from '../components/Biography';
import Departments from '../components/Departments';
import MessageForm from '../components/MessageForm';
import Institute from '../components/Institute';

const Home = () => {
    return (
        <div>
            <Institute title={"Welcome to GlobalCare Medical Institute || Excellence in Healthcare Education and Innovation"} imageUrl={"./man.gif"} />
            <Biography title={"Biography"} imgUrl={"/hospital.jpg"}/>
            <Departments />
            <MessageForm />
        </div>
    )
}

export default Home;