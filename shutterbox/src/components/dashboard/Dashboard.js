import { useState } from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Pagination from '../layout/Pagination';
import Post from '../post/Post';

function Dashboard() {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const [totalPosts, setTotalPosts] = useState(0);

    const totalPages = Math.ceil(totalPosts / itemsPerPage);

    return (
        <>
            <Header />
            <Post currentPage={currentPage} itemsPerPage={itemsPerPage} setTotalPosts={setTotalPosts} />
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />)}
            <Footer />
        </>
    );
}

export default Dashboard;