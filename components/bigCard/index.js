import React from 'react'

const Index = (props) => {
    return (
        <React.Fragment>
            <div className="big-card">
                {props.children}
            </div>
            <style jsx>{`
                .big-card{
                    background-color:white;
                    margin: 50px 160px;
                    padding: 20px;
                    box-shadow: rgba(0, 0, 0, 0.12) 0px 5px 10px 0px;
                }
            `}</style>
        </React.Fragment>
    )
}

export default Index
