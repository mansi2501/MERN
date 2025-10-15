import Footer from '../footer/Footer';
import Header from '../header/Header';
import Pagination from '../layout/Pagination';
import Post from '../post/Post';

function Dashboard() {

    return (
        <>
            <Header />
            <Post />
            <Pagination />
            <Footer />
        </>
    );
}

export default Dashboard;