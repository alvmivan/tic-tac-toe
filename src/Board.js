import React from 'react';
import Square from './Square';

class Board extends React.Component {
    

    render() {
        return (
            <div className={this.props.ends ? "boardEnd" : "board"}>
                {this.props.squares.map((square, i) =>
                    <Square
                        key={i}
                        index={i}
                        value={square}
                        onClick={() => this.props.onClick(i)}
                        winning={this.props.winning}
                    />
                )}
            </div>
        );
    }
}

export default Board;