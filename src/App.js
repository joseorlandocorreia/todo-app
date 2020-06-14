import React from "react";
import "./App.css";
import ListItems from "./ListItems.jsx";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            currentItem: {
                text: "",
                key: "",
            },
        };
        this.handleInput = this.handleInput.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.setUpdate = this.setUpdate.bind(this);
    }

    handleInput(event) {
        this.setState({
            currentItem: {
                text: event.target.value,
                key: Date.now(),
            },
        });
    }

    addItem(event) {
        event.preventDefault();
        const newItem = this.state.currentItem;
        if (newItem.text !== "") {
            const newItems = [...this.state.items, newItem];
            this.setState({
                items: newItems,
                currentItem: {
                    text: "",
                    key: "",
                },
            });
        }
    }

    deleteItem(key) {
        const filteredItems = this.state.items.filter(
            (item) => item.key !== key
        );
        this.setState({
            items: filteredItems,
        });
    }
    setUpdate(text, key) {
        const items = this.state.items;
        items.map((item) => {
            if (item.key === key) {
                item.text = text;
            }
        });
        this.setState({
            items: items,
        });
    }

    render() {
        return (
            <div id="app">
                <header>
                    <form id="todo-form" onSubmit={this.addItem}>
                        <input
                            type="text"
                            placeholder="Enter Task"
                            value={this.state.currentItem.text}
                            onChange={this.handleInput}
                        />
                        <button type="submit">Add Task</button>
                        <button
                            onClick={() => {
                                if (
                                    // eslint-disable-next-line no-restricted-globals
                                    confirm(
                                        "Delete all items?"
                                    )
                                ) {
                                    this.setState({
                                        currentItem: {
                                            text: "",
                                            key: "",
                                        },
                                        items: [],
                                    });
                                }
                            }}
                        >
                            Delete All
                        </button>
                    </form>
                </header>
                <ListItems
                    items={this.state.items}
                    deleteItem={this.deleteItem}
                    setUpdate={this.setUpdate}
                />
            </div>
        );
    }
}

export default App;
