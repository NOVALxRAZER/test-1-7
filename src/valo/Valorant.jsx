import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';
import { Button, Flex, Spin } from 'antd';
import './valoui.scss';

const App = () => {
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [selectedItem, setSelectedItem] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await axios.get('https://staging.ina17.com/data.json')
            setData(response.data)
            setFilteredData(response.data)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    };

    const handleCategoryClick = (category) => {
        setFilteredData(data.filter(item => item.role === category))
    };

    const resetButton = () => {
        fetchData()
    }

    const handleSearch = (searchTerm) => {
        setFilteredData(data.filter(item => item.displayName.toLowerCase().includes(searchTerm.toLowerCase())))
    };

    const handleItemClick = (item) => {
        setSelectedItem(item)
    };

    const handleCloseModal = () => {
        setSelectedItem(null)
    };

    console.log("ini dataaaaa : ", data)

    return (
        <div className="app">
            <Spin spinning={loading} />
            <header>
                <h1>VALORANT CHARACTER</h1>
            </header>
            <div className="categories">
                <h2>Categories</h2>
                <ul>
                    {Array.from(new Set(data.map(item => item.role))).map((category, index) => (
                        <Flex key={index} style={{ display: "inline-block", padding: "5px" }} wrap="wrap">
                            <Button onClick={() => handleCategoryClick(category)}>{category}</Button>
                        </Flex>
                    ))}
                    <Flex style={{ display: "inline-block", padding: "5px" }} wrap="wrap">
                        <Button style={{ backgroundColor: "white" }} type="text" onClick={() => resetButton()}>Reset</Button>
                    </Flex>
                </ul>
            </div>
            <div className="search">
                <input type="text" placeholder="Search by Display Name" onChange={(e) => handleSearch(e.target.value)} />
            </div>
            <div className="items">
                {filteredData.map((item, index) => (
                    <div key={index} className="item" onClick={() => handleItemClick(item)}>
                        <img src={item.displayIcon} alt={item.displayName} onError={(e) => e.target.style.display = 'none'} />
                        <h3>{item.displayName}</h3>
                    </div>
                ))}
            </div>
            {selectedItem && (
                <div className="modal">
                    <div className="modal-content">
                        <div className='modal-side'>
                            <img style={{ height: '40%', width: '40%' }} src={selectedItem.fullPortrait} alt={selectedItem.displayName} />
                            <div className='modal-center'>
                                <span className="close" onClick={handleCloseModal}>&times;</span>
                                <h2>{selectedItem.displayName}</h2>
                                <p>Role: {selectedItem.role}</p>
                                <p>Description: {selectedItem.description}</p>
                            </div>
                        </div>
                        {selectedItem.video && (
                            <YouTube
                                videoId={selectedItem.video.replace('https://youtu.be/', '')}
                                opts={{ width: '100%', height: '500px' }}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
