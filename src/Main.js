import React from 'react';

const Main = (props) => {

  // then we map over that array recursively to display a grid of turned-off bulb objects
  return (
    <main>
      <div className="wrapper">
        <div className="silver-border">
          <div className="light-board">
            { props.gridArray }
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;