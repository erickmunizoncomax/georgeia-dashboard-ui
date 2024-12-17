import React, { useState, useEffect } from 'react';

const SchoolPerformanceTableComponent = ({ School_Performance_Map_Reportdata, divRecord, selectedmetricschool }) => {
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortedData, setSortedData] = useState([]);

    const itemsPerPage = 10;

    useEffect(() => {
        if (School_Performance_Map_Reportdata) {
            const filteredData = School_Performance_Map_Reportdata.filter((item) => {
                // return item.METRIC_NAME === divRecord && item.SCHOOL_TYPE === selectedmetricschool;
                return selectedmetricschool == 'All' ? item.METRIC_NAME === divRecord : item.METRIC_NAME === divRecord && item.SCHOOL_TYPE === selectedmetricschool;
            });
            setSortedData(filteredData);
        }
    }, [School_Performance_Map_Reportdata, divRecord, selectedmetricschool]);

    const handleSortClick = () => {
        const order = sortOrder === 'asc' ? 'desc' : 'asc';
        const sortedItems = [...sortedData].sort((a, b) =>
            order === 'asc' ? a.VALUE - b.VALUE : b.VALUE - a.VALUE
        );
        setSortOrder(order);
        setSortedData(sortedItems);
    };

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    const handleNextClick = () => {
        setCurrentPage((prevPage) => (prevPage === totalPages ? 1 : prevPage + 1));
    };

    const handlePrevClick = () => {
        setCurrentPage((prevPage) => (prevPage === 1 ? totalPages : prevPage - 1));
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = sortedData.slice(startIndex, endIndex);

    return (
        <table className="w-full" cellPadding={0} cellSpacing={0}>
            <thead>
                <tr className="bg-[#181725]">
                    <th align="center" style={{ fontSize: "13px" }}>School Name</th>
                    <th align="center" style={{ fontSize: "13px", cursor: 'pointer' }} onClick={handleSortClick}>
                        {divRecord} {sortOrder === 'asc' ? '↑' : '↓'}
                    </th>
                </tr>
            </thead>
            <tbody>
                {currentItems.map((itr, index) =>  (
                    <tr key={index}>
                        <td width='60%'>{itr?.SCHOOL_NAME}</td>
                        <td>{itr?.VALUE}{itr?.METRIC_SUFFIX}</td>
                    </tr>
                ))}
                <tr>
                    <td align="center">
                        <button
                            className={`paginationprevious ${currentPage === 1 ? 'disabled' : ''}`}
                            onClick={handlePrevClick}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                    </td>
                    <td align="center">
                        <button
                            className={`paginationnext ${currentPage === totalPages ? 'disabled' : ''}`}
                            onClick={handleNextClick}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default SchoolPerformanceTableComponent;
